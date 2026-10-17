// Optional cloud sync: Google sign-in, one private Firestore document per user (users/{uid})
// plus a public leaderboard entry (leaderboard/{uid}).
// Progress always lives in localStorage first; Firestore is a backup that merges across devices.
// Local progress is tagged with its owner's uid so different people can share one device safely.
import { firebaseConfig } from './firebase-config.js';

const SDK = 'https://www.gstatic.com/firebasejs/10.12.2';

export function createSync({ get, set, merge, summary, onStatus }) {
  let fb = null, timer = null, pulling = false;
  const api = {
    enabled: !!(firebaseConfig && firebaseConfig.apiKey),
    user: null,
    status: '',
    async init() {
      if (!api.enabled) return;
      try {
        const [{ initializeApp }, auth, fs] = await Promise.all([
          import(`${SDK}/firebase-app.js`), import(`${SDK}/firebase-auth.js`), import(`${SDK}/firebase-firestore.js`),
        ]);
        const app = initializeApp(firebaseConfig);
        fb = { auth, fs, a: auth.getAuth(app), db: fs.getFirestore(app) };
        auth.getRedirectResult(fb.a).catch(() => {});
        auth.onAuthStateChanged(fb.a, async (u) => {
          api.user = u;
          setStatus(u ? 'Syncing…' : 'Not signed in');
          if (u) await pull();
        });
        let lastPull = Date.now();
        addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') flush();
          else if (api.user && Date.now() - lastPull > 15000) { lastPull = Date.now(); pull(); }
        });
        addEventListener('online', () => api.user && flush());
      } catch (e) {
        setStatus('Cloud sync unavailable offline');
        console.warn('sync init failed', e);
      }
    },
    async signIn() {
      if (!fb) throw new Error('Cloud sync is still loading — try again in a moment');
      const provider = new fb.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      try { await fb.auth.signInWithPopup(fb.a, provider); }
      catch (e) {
        if (/popup|cancelled|operation-not-supported/i.test(e.code || '')) await fb.auth.signInWithRedirect(fb.a, provider);
        else throw e;
      }
    },
    async signOut() {
      await flush();
      await fb?.auth.signOut(fb.a);
      set(null); // start the next person on this device from a clean slate
    },
    push() {
      if (!api.user || pulling) return;
      clearTimeout(timer);
      timer = setTimeout(flush, 3000);
    },
    async leaderboard(n = 50) {
      if (!fb || !api.user) return [];
      const { collection, query, orderBy, limit, getDocs } = fb.fs;
      const snap = await getDocs(query(collection(fb.db, 'leaderboard'), orderBy('xp', 'desc'), limit(n)));
      return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
    },
  };
  function setStatus(s) { api.status = s; onStatus?.(); }
  async function pull() {
    pulling = true;
    try {
      const uid = api.user.uid;
      const snap = await fb.fs.getDoc(fb.fs.doc(fb.db, 'users', uid));
      const remote = snap.exists() ? JSON.parse(snap.data().p || '{}') : null;
      const local = get();
      // Guest progress (no owner yet) is claimed by the first account that signs in.
      // Progress owned by someone else is never mixed into this account.
      const base = !local.owner || local.owner === uid ? local : null;
      const next = remote ? (base ? merge(base, remote) : remote) : base || {};
      set({ ...next, owner: uid });
      pulling = false;
      await flush();
    } catch (e) {
      pulling = false;
      setStatus('Sync error: ' + (e.code || e.message));
    }
  }
  async function flush() {
    clearTimeout(timer);
    if (!api.user || !fb) return;
    try {
      const p = get();
      if (p.owner !== api.user.uid) return;
      const name = api.user.displayName || (api.user.email || 'Player').split('@')[0];
      await Promise.all([
        fb.fs.setDoc(fb.fs.doc(fb.db, 'users', api.user.uid), { p: JSON.stringify(p), xp: p.xp, updated: p.updated, name }),
        fb.fs.setDoc(fb.fs.doc(fb.db, 'leaderboard', api.user.uid), { name, photo: api.user.photoURL || '', ...summary(), updated: Date.now() }),
      ]);
      setStatus('Synced ' + new Date().toLocaleTimeString());
    } catch (e) {
      setStatus('Saved on device · cloud sync will retry (' + (e.code || e.message) + ')');
    }
  }
  return api;
}
