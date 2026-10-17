// Optional cloud sync: Google sign-in + one Firestore document per user (users/{uid}).
// Progress always lives in localStorage first; Firestore is a backup that merges across devices.
import { firebaseConfig } from './firebase-config.js';

const SDK = 'https://www.gstatic.com/firebasejs/10.12.2';

export function createSync({ get, set, merge, onStatus }) {
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
        addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
        addEventListener('online', () => api.user && flush());
      } catch (e) {
        setStatus('Cloud sync unavailable offline');
        console.warn('sync init failed', e);
      }
    },
    async signIn() {
      if (!fb) throw new Error('Cloud sync is still loading — try again in a moment');
      const provider = new fb.auth.GoogleAuthProvider();
      try { await fb.auth.signInWithPopup(fb.a, provider); }
      catch (e) {
        if (/popup|cancelled|operation-not-supported/i.test(e.code || '')) await fb.auth.signInWithRedirect(fb.a, provider);
        else throw e;
      }
    },
    async signOut() { await flush(); await fb?.auth.signOut(fb.a); },
    push() {
      if (!api.user || pulling) return;
      clearTimeout(timer);
      timer = setTimeout(flush, 3000);
    },
  };
  function setStatus(s) { api.status = s; onStatus?.(); }
  const ref = () => fb.fs.doc(fb.db, 'users', api.user.uid);
  async function pull() {
    pulling = true;
    try {
      const snap = await fb.fs.getDoc(ref());
      if (snap.exists()) {
        const remote = JSON.parse(snap.data().p || '{}');
        set(merge(get(), remote));
      }
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
      await fb.fs.setDoc(ref(), { p: JSON.stringify(p), xp: p.xp, updated: p.updated, name: api.user.displayName || '' });
      setStatus('Synced ' + new Date().toLocaleTimeString());
    } catch (e) {
      setStatus('Saved on device · cloud sync will retry (' + (e.code || e.message) + ')');
    }
  }
  return api;
}
