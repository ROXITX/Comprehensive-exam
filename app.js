import { createSync } from './sync.js';

const EXAM_DATE = new Date('2026-10-21T09:00:00+05:30');
const MOCK_SIZE = 100;
const $ = (s, el = document) => el.querySelector(s);
const app = $('#app');

/* ---------------- progress storage ---------------- */
const KEY = 'cq-progress-v1';
const MOCK_KEY = 'cq-mock-v1';
const blank = () => ({
  v: 1, xp: 0, streak: { n: 0, last: '' }, day: { d: '', xp: 0, ans: 0 },
  q: {}, stars: {}, badges: {}, mocks: [],
  stats: { ans: 0, ok: 0, bestCombo: 0, sessions: 0, fixed: 0, blitzBest: 0 },
  settings: { sound: true, vib: true, shuffle: true, goal: 300, mockMin: 100 },
  updated: 0,
});
function hydrate(raw) {
  const b = blank();
  if (!raw || typeof raw !== 'object') return b;
  return { ...b, ...raw, streak: { ...b.streak, ...raw.streak }, day: { ...b.day, ...raw.day },
    stats: { ...b.stats, ...raw.stats }, settings: { ...b.settings, ...raw.settings } };
}
let P = (() => { try { return hydrate(JSON.parse(localStorage.getItem(KEY))); } catch { return blank(); } })();
const sync = createSync({
  get: () => P,
  set: (next) => { P = hydrate(next); persist(false); refreshChrome(); route(); },
  merge: mergeProgress,
  onStatus: () => { refreshChrome(); if (location.hash === '#/me') route(); },
});
function persist(push = true) {
  P.updated = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(P)); } catch { /* storage full or blocked */ }
  if (push) sync.push();
}

// q record: [box, correctCount, wrongCount, lastSeen, nextDue]
function mergeProgress(a, b) {
  a = hydrate(a); b = hydrate(b);
  const m = hydrate(a.updated >= b.updated ? a : b);
  m.xp = Math.max(a.xp, b.xp);
  m.q = { ...a.q };
  for (const [k, r] of Object.entries(b.q)) if (!m.q[k] || r[3] > m.q[k][3]) m.q[k] = r;
  m.stars = { ...a.stars };
  for (const [k, s] of Object.entries(b.stars)) m.stars[k] = Math.max(s, m.stars[k] || 0);
  m.badges = { ...b.badges, ...a.badges };
  const mocks = new Map([...a.mocks, ...b.mocks].map((x) => [x.ts, x]));
  m.mocks = [...mocks.values()].sort((x, y) => x.ts - y.ts);
  for (const k of Object.keys(m.stats)) m.stats[k] = Math.max(a.stats[k] || 0, b.stats[k] || 0);
  m.streak = a.streak.last > b.streak.last ? a.streak : b.streak.last > a.streak.last ? b.streak : { last: a.streak.last, n: Math.max(a.streak.n, b.streak.n) };
  m.day = a.day.d > b.day.d ? a.day : b.day.d > a.day.d ? b.day : { d: a.day.d, xp: Math.max(a.day.xp, b.day.xp), ans: Math.max(a.day.ans, b.day.ans) };
  m.updated = Math.max(a.updated, b.updated);
  return m;
}

/* ---------------- data ---------------- */
let INDEX = null;
const SUBJ = {};
const subjectMeta = (sid) => INDEX.subjects.find((s) => s.id === sid);
const topicMeta = (sid, tid) => subjectMeta(sid)?.topics.find((t) => t.id === tid);
async function loadSubject(sid) {
  if (!SUBJ[sid]) {
    const res = await fetch(`data/${sid}.json`);
    if (!res.ok) throw new Error(`Could not load ${sid}`);
    SUBJ[sid] = await res.json();
    SUBJ[sid].questions.forEach((q) => { q.s = sid; });
  }
  return SUBJ[sid];
}
const loadAll = () => Promise.all(INDEX.subjects.map((s) => loadSubject(s.id)));
const allIds = (s) => s.topics.flatMap((t) => t.ids);

/* ---------------- spaced repetition & scoring ---------------- */
const DUE_HOURS = [0, 0.1, 8, 24, 48, 96];
const today = () => new Date().toLocaleDateString('en-CA');
function mastery(ids) {
  if (!ids.length) return 0;
  let s = 0;
  for (const id of ids) { const r = P.q[id]; if (r) s += Math.min(r[0], 4) / 4; }
  return s / ids.length;
}
const seen = (ids) => ids.reduce((n, id) => n + (P.q[id] ? 1 : 0), 0);
const isDue = (r, now = Date.now()) => r && r[0] < 5 && r[4] <= now;
function grade(q, ok) {
  const r = P.q[q.id] ? [...P.q[q.id]] : null;
  const now = Date.now();
  let fixed = false;
  let box;
  if (!r) box = ok ? 2 : 0;
  else if (ok) { fixed = r[0] === 0; box = Math.min(5, r[0] + 1); }
  else box = 0;
  const rec = r || [0, 0, 0, 0, 0];
  rec[0] = box; rec[ok ? 1 : 2]++; rec[3] = now; rec[4] = now + DUE_HOURS[box] * 36e5;
  P.q[q.id] = rec;
  P.stats.ans++; if (ok) P.stats.ok++; if (fixed) P.stats.fixed++;
  P.day.ans++;
}
function touchDay() {
  const d = today();
  if (P.day.d !== d) P.day = { d, xp: 0, ans: 0 };
  if (P.streak.last !== d) {
    const y = new Date(Date.now() - 864e5).toLocaleDateString('en-CA');
    P.streak.n = P.streak.last === y ? P.streak.n + 1 : 1;
    P.streak.last = d;
  }
}
function addXP(n) {
  touchDay();
  const before = level(P.xp);
  P.xp += n; P.day.xp += n;
  const after = level(P.xp);
  if (after > before) { setTimeout(() => { sfx.level(); confetti(); toast(`🎉 Level ${after}! You are now a ${title(after)}`); }, 300); }
}
const level = (xp) => Math.floor((1 + Math.sqrt(1 + xp / 12.5)) / 2);
const levelXP = (l) => 50 * l * (l - 1);
const TITLES = [[1, 'Fresher'], [3, 'Learner'], [5, 'Scholar'], [8, 'Analyst'], [12, 'Engineer'], [16, 'Architect'], [20, 'Master'], [25, 'Grandmaster'], [30, 'Legend']];
const title = (l) => TITLES.filter(([x]) => l >= x).pop()[1];

/* ---------------- badges ---------------- */
const BADGES = [
  ['first', '🎯', 'First Blood', 'Answer your first question', (p) => p.stats.ans >= 1],
  ['c10', '🔥', 'On Fire', '10 correct in a row', (p) => p.stats.bestCombo >= 10],
  ['c25', '☄️', 'Unstoppable', '25 correct in a row', (p) => p.stats.bestCombo >= 25],
  ['c50', '🌋', 'Volcanic', '50 correct in a row', (p) => p.stats.bestCombo >= 50],
  ['ok100', '💯', 'Centurion', '100 correct answers', (p) => p.stats.ok >= 100],
  ['ok500', '🏅', 'Grinder', '500 correct answers', (p) => p.stats.ok >= 500],
  ['ok1000', '🏆', 'Machine', '1000 correct answers', (p) => p.stats.ok >= 1000],
  ['ok2500', '👑', 'Question Slayer', '2500 correct answers', (p) => p.stats.ok >= 2500],
  ['boss', '🐉', 'Boss Slayer', '3★ on a boss round', (p) => Object.values(p.stars).some((s) => s >= 3)],
  ['boss10', '⚔️', 'Dragon Hunter', '3★ on 10 boss rounds', (p) => Object.values(p.stars).filter((s) => s >= 3).length >= 10],
  ['boss30', '🛡️', 'Dungeon Master', '3★ on 30 boss rounds', (p) => Object.values(p.stars).filter((s) => s >= 3).length >= 30],
  ['fix50', '🔁', 'Comeback Kid', 'Fix 50 past mistakes', (p) => p.stats.fixed >= 50],
  ['blitz20', '⚡', 'Lightning', '20+ correct in one Blitz', (p) => p.stats.blitzBest >= 20],
  ['streak3', '📅', 'Hat-trick', '3-day study streak', (p) => p.streak.n >= 3],
  ['mock', '📝', 'Exam Ready', 'Finish a mock exam', (p) => p.mocks.length >= 1],
  ['mock70', '🎓', 'Distinction', 'Score 70+ in a mock', (p) => p.mocks.some((m) => m.ok / m.n >= 0.7)],
  ['mock90', '🧠', 'Topper', 'Score 90+ in a mock', (p) => p.mocks.some((m) => m.ok / m.n >= 0.9)],
  ['explorer', '🌍', 'Explorer', 'Try every subject', (p) => INDEX && INDEX.subjects.every((s) => seen(allIds(s)) > 0)],
  ['master', '💎', 'Subject Master', '80% mastery in a subject', (p) => INDEX && INDEX.subjects.some((s) => mastery(allIds(s)) >= 0.8)],
  ['allmaster', '🌟', 'Comprehensive', '80% mastery in every subject', (p) => INDEX && INDEX.subjects.every((s) => mastery(allIds(s)) >= 0.8)],
];
function checkBadges() {
  for (const [id, icon, name, , test] of BADGES) {
    if (!P.badges[id] && test(P)) {
      P.badges[id] = Date.now();
      setTimeout(() => { sfx.level(); toast(`${icon} Badge unlocked: ${name}`); }, 600);
    }
  }
}

/* ---------------- effects ---------------- */
let audio;
function tone(freqs, dur = 0.09, type = 'sine', vol = 0.12) {
  if (!P.settings.sound) return;
  try {
    audio ||= new AudioContext();
    let t = audio.currentTime;
    for (const f of freqs) {
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g).connect(audio.destination); o.start(t); o.stop(t + dur);
      t += dur * 0.8;
    }
  } catch { /* audio unavailable */ }
}
const sfx = {
  ok: () => tone([660, 990]),
  bad: () => { tone([220, 150], 0.14, 'square', 0.06); if (P.settings.vib) navigator.vibrate?.(120); },
  level: () => tone([523, 659, 784, 1047], 0.12),
  tick: () => tone([880], 0.03, 'sine', 0.05),
};
function toast(msg, ms = 2600) {
  const t = $('#toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(t._h); t._h = setTimeout(() => { t.hidden = true; }, ms);
}
function floatXP(text) {
  const el = document.createElement('div');
  el.className = 'xpfloat'; el.textContent = text;
  document.body.append(el); setTimeout(() => el.remove(), 1000);
}
function confetti() {
  const c = $('#confetti'), x = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const ps = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 13 - 4,
    s: Math.random() * 7 + 4, c: `hsl(${Math.random() * 360},90%,60%)`, r: Math.random() * 6,
  }));
  let f = 0;
  (function step() {
    x.clearRect(0, 0, c.width, c.height);
    for (const p of ps) {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += 0.12;
      x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); x.restore();
    }
    if (++f < 130) requestAnimationFrame(step); else x.clearRect(0, 0, c.width, c.height);
  })();
}

/* ---------------- helpers ---------------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
function fmt(s) {
  return s.split(/```\w*\n?/).map((p, i) => (i % 2 ? `<pre>${esc(p.replace(/\n$/, ''))}</pre>` : inline(p.replace(/\n$/, '')))).join('');
}
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pct = (x) => Math.round(x * 100);
const bar = (x, cls = '') => `<div class="bar ${cls}"><i style="width:${pct(x)}%"></i></div>`;
const starStr = (n) => '★★★'.split('').map((s, i) => (i < n ? s : `<span class="off">${s}</span>`)).join('');
const L = 'ABCDEF';
function pickSmart(qs, n) {
  const now = Date.now();
  const score = (q) => {
    const r = P.q[q.id];
    if (!r) return 1 + Math.random();
    if (r[0] === 0) return Math.random();
    if (r[4] <= now) return 2 + r[0] + Math.random();
    return 10 + r[0] * 2 + Math.random() * 3;
  };
  return shuffle(qs.map((q) => [score(q), q]).sort((a, b) => a[0] - b[0]).slice(0, n).map((x) => x[1]));
}
function countdown() {
  const ms = EXAM_DATE - Date.now();
  if (ms <= 0) return 'Exam day — you got this! 💪';
  const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5);
  return d > 0 ? `${d} day${d > 1 ? 's' : ''} ${h} h` : `${h} h ${Math.floor((ms % 36e5) / 6e4)} min`;
}

/* ---------------- chrome ---------------- */
function refreshChrome() {
  const l = level(P.xp);
  $('#topbar').innerHTML = `<span class="brand">🎓 CompreQuest</span>
    <span class="pill" title="Day streak">🔥 ${streakNow()}</span>
    <span class="pill" title="Total XP">⭐ ${P.xp}</span>
    <span class="pill" title="Level">🏅 ${l}</span>${sync.user ? '<span class="pill" title="Synced">☁️</span>' : ''}`;
  const tab = (location.hash.match(/^#\/(\w+)/) || [, 'home'])[1];
  document.querySelectorAll('#tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.tab === tab || (tab === 's' || tab === 't' || tab === 'learn') && a.dataset.tab === 'home'));
}
const go = (h) => { if (location.hash === h) route(); else location.hash = h; };
const streakNow = () => (P.streak.last === today() || P.streak.last === new Date(Date.now() - 864e5).toLocaleDateString('en-CA') ? P.streak.n : 0);
function setFocus(on) { document.body.classList.toggle('focus', on); }

/* ---------------- pages ---------------- */
function home() {
  const l = level(P.xp), lo = levelXP(l), hi = levelXP(l + 1);
  const touched = P.day.d === today();
  const dayXP = touched ? P.day.xp : 0;
  const due = Object.values(P.q).filter((r) => isDue(r)).length;
  const subs = INDEX.subjects.map((s) => ({ s, ids: allIds(s) }));
  const weakest = subs.map(({ s }) => s.topics.map((t) => ({ s, t, m: mastery(t.ids), seen: seen(t.ids) })))
    .flat().filter((x) => x.t.ids.length).sort((a, b) => a.m - b.m || a.seen - b.seen)[0];
  const totalIds = subs.flatMap((x) => x.ids);
  app.innerHTML = `
  <div class="card hero stack">
    <div class="row between">
      <div><div class="small">⏳ Exam · Wed 21 Oct</div><div class="big">${countdown()}</div></div>
      <div class="ring" style="--p:${Math.min(100, pct(dayXP / P.settings.goal))}"><b>${dayXP}</b></div>
    </div>
    <div class="row between small"><span>Lv ${l} · ${title(l)}</span><span>${P.xp - lo} / ${hi - lo} XP</span></div>
    ${bar((P.xp - lo) / (hi - lo))}
    <div class="small">Daily goal: ${dayXP}/${P.settings.goal} XP ${dayXP >= P.settings.goal ? '✅' : ''} · Overall mastery ${pct(mastery(totalIds))}% · Seen ${seen(totalIds)}/${totalIds.length}</div>
  </div>
  <div class="grid2" style="margin-top:12px">
    ${weakest ? `<a class="card tap" href="#/quiz/topic/${weakest.s.id}/${weakest.t.id}"><div class="small muted">Next up</div><b>▶ ${esc(weakest.t.name)}</b><div class="small muted">${esc(weakest.s.name)}</div></a>` : ''}
    <a class="card tap" href="#/review"><div class="small muted">Review queue</div><b>🔁 ${due} due</b><div class="small muted">Fix mistakes for XP</div></a>
  </div>
  <div class="section-title">Subjects · ${INDEX.total} questions</div>
  <div class="stack">
    ${subs.map(({ s, ids }) => `
      <a class="card tap row" href="#/s/${s.id}">
        <div class="sub-icon">${s.icon}</div>
        <div class="grow">
          <div class="row between"><b>${esc(s.name)}</b><span class="small muted">${pct(mastery(ids))}%</span></div>
          <div class="small muted" style="margin:2px 0 6px">${s.topics.length} topics · ${seen(ids)}/${ids.length} seen</div>
          ${bar(mastery(ids))}
        </div>
      </a>`).join('')}
  </div>`;
}

function subjectPage(sid) {
  const s = subjectMeta(sid);
  if (!s) return notFound();
  const ids = allIds(s);
  app.innerHTML = `
  <a class="back" href="#/">‹ All subjects</a>
  <div class="row"><div class="sub-icon">${s.icon}</div><div><h1>${esc(s.name)}</h1><div class="small muted">${esc(s.desc)}</div></div></div>
  <div class="card stack" style="margin-top:14px">
    <div class="row between small"><span>Mastery ${pct(mastery(ids))}%</span><span>${seen(ids)}/${ids.length} seen · ${s.pyq} from question bank</span></div>
    ${bar(mastery(ids))}
    <div class="grid2">
      <a class="btn" href="#/quiz/subject/${sid}">🎲 Mixed 15</a>
      <a class="btn gold" href="#/quiz/pyq/${sid}">📜 Bank Qs</a>
    </div>
  </div>
  <div class="section-title">Topics</div>
  <div class="stack">
    ${s.topics.map((t) => `
      <a class="card tap" href="#/t/${sid}/${t.id}">
        <div class="row between"><b class="grow">${esc(t.name)}</b><span class="stars">${starStr(P.stars[sid + '/' + t.id] || 0)}</span></div>
        <div class="small muted" style="margin:3px 0 6px">${t.ids.length} questions · ${seen(t.ids)} seen · ${pct(mastery(t.ids))}% mastery</div>
        ${bar(mastery(t.ids))}
      </a>`).join('')}
  </div>`;
}

function topicPage(sid, tid) {
  const s = subjectMeta(sid), t = topicMeta(sid, tid);
  if (!t) return notFound();
  const wrong = t.ids.filter((id) => P.q[id] && P.q[id][0] === 0).length;
  app.innerHTML = `
  <a class="back" href="#/s/${sid}">‹ ${esc(s.name)}</a>
  <h1>${esc(t.name)}</h1>
  <div class="row small muted"><span class="stars">${starStr(P.stars[sid + '/' + tid] || 0)}</span><span>${t.ids.length} questions · ${t.pyq.length} from bank · ${pct(mastery(t.ids))}% mastery</span></div>
  <div style="margin:10px 0 16px">${bar(mastery(t.ids))}</div>
  <div class="stack">
    ${t.notes ? `<a class="btn alt" href="#/learn/${sid}/${tid}">📖 Quick revision · ${t.notes} cards</a>` : ''}
    <a class="btn" href="#/quiz/topic/${sid}/${tid}">▶ Practice 10</a>
    <a class="btn alt" href="#/quiz/drill/${sid}/${tid}">🧱 Drill all ${t.ids.length} in order</a>
    ${t.pyq.length ? `<a class="btn alt" href="#/quiz/tpyq/${sid}/${tid}">📜 Question-bank only · ${t.pyq.length}</a>` : ''}
    ${wrong ? `<a class="btn bad" href="#/quiz/twrong/${sid}/${tid}">🩹 Fix my ${wrong} mistake${wrong > 1 ? 's' : ''}</a>` : ''}
    <a class="btn gold" href="#/quiz/boss/${sid}/${tid}">🐉 Boss round · 15 Qs · 25s each</a>
  </div>
  <p class="small muted" style="margin-top:14px">Boss stars: 60% = ★ · 75% = ★★ · 90% = ★★★</p>`;
}

async function learn(sid, tid) {
  const s = await loadSubject(sid);
  const t = s.topics.find((x) => x.id === tid);
  if (!t) return notFound();
  let i = 0;
  const draw = () => {
    app.innerHTML = `
    <a class="back" href="#/t/${sid}/${tid}">‹ ${esc(t.name)}</a>
    <div class="card flash"><div class="n">Card ${i + 1} / ${t.notes.length}</div><div>${fmt(t.notes[i])}</div></div>
    <div style="margin:12px 0">${bar((i + 1) / t.notes.length)}</div>
    <div class="grid2">
      <button class="btn alt" id="prev" ${i ? '' : 'disabled'}>‹ Back</button>
      <button class="btn good" id="next">${i + 1 < t.notes.length ? 'Got it ›' : 'Done ✓'}</button>
    </div>
    <details style="margin-top:20px"><summary class="muted">See all ${t.notes.length} cards as a list</summary>
      <ul class="notes-list" style="margin-top:10px">${t.notes.map((n) => `<li>${fmt(n)}</li>`).join('')}</ul></details>`;
    $('#prev').onclick = () => { i--; draw(); };
    $('#next').onclick = () => {
      addXP(2);
      if (++i < t.notes.length) { draw(); persist(); refreshChrome(); return; }
      checkBadges(); persist(); refreshChrome();
      toast('📖 Revision done! Now practise it.');
      location.hash = `#/quiz/topic/${sid}/${tid}`;
    };
  };
  draw();
}

/* ---------------- quiz engine ---------------- */
let S = null;
async function startQuiz(mode, sid, tid) {
  let qs = [], titleText = '', back = '#/';
  const topicQs = async () => (await loadSubject(sid)).questions.filter((q) => q.t === tid);
  const tname = () => topicMeta(sid, tid)?.name || '';
  switch (mode) {
    case 'topic': qs = pickSmart(await topicQs(), 10); titleText = tname(); back = `#/t/${sid}/${tid}`; break;
    case 'drill': qs = await topicQs(); titleText = 'Drill · ' + tname(); back = `#/t/${sid}/${tid}`; break;
    case 'tpyq': qs = (await topicQs()).filter((q) => q.p); titleText = 'Bank Qs · ' + tname(); back = `#/t/${sid}/${tid}`; break;
    case 'twrong': qs = shuffle((await topicQs()).filter((q) => P.q[q.id]?.[0] === 0)); titleText = 'Fix mistakes'; back = `#/t/${sid}/${tid}`; break;
    case 'boss': qs = shuffle(await topicQs()).slice(0, 15); titleText = '🐉 Boss · ' + tname(); back = `#/t/${sid}/${tid}`; break;
    case 'subject': qs = pickSmart((await loadSubject(sid)).questions, 15); titleText = subjectMeta(sid).name; back = `#/s/${sid}`; break;
    case 'pyq': qs = pickSmart((await loadSubject(sid)).questions.filter((q) => q.p), 20); titleText = 'Bank Qs · ' + subjectMeta(sid).name; back = `#/s/${sid}`; break;
    case 'review': {
      await loadAll();
      const now = Date.now();
      const all = Object.values(SUBJ).flatMap((s) => s.questions);
      qs = all.filter((q) => isDue(P.q[q.id], now)).sort((a, b) => P.q[a.id][0] - P.q[b.id][0]).slice(0, 20);
      qs = shuffle(qs); titleText = 'Review'; back = '#/review'; break;
    }
    case 'mixed': case 'blitz': case 'allpyq': case 'weak': {
      await loadAll();
      let all = Object.values(SUBJ).flatMap((s) => s.questions);
      if (mode === 'allpyq') all = all.filter((q) => q.p);
      if (mode === 'weak') {
        const tm = (q) => mastery(topicMeta(q.s, q.t).ids);
        const weakTopics = new Set(INDEX.subjects.flatMap((s) => s.topics.filter((t) => t.ids.length).map((t) => [s.id + '/' + t.id, mastery(t.ids)])).sort((a, b) => a[1] - b[1]).slice(0, 5).map((x) => x[0]));
        all = all.filter((q) => weakTopics.has(q.s + '/' + q.t) || tm(q) < 0.25);
      }
      qs = mode === 'blitz' ? shuffle(all) : pickSmart(all, 20);
      titleText = { mixed: 'Random 20', blitz: '⚡ Blitz', allpyq: 'Question-bank mix', weak: 'Weak spots' }[mode];
      back = '#/play'; break;
    }
    default: return notFound();
  }
  if (!qs.length) { app.innerHTML = `<a class="back" href="${back}">‹ Back</a><div class="card center"><h2>Nothing here right now 🎉</h2><p class="muted">No questions match this mode yet.</p></div>`; return; }
  S = { mode, title: titleText, back, qs, i: 0, ok: 0, combo: 0, best: 0, xp: 0, log: [], orders: [], timer: null, sid, tid,
    left: 0, deadline: 0, blitz: mode === 'blitz', boss: mode === 'boss' };
  if (S.blitz) S.deadline = Date.now() + 60e3;
  setFocus(true);
  renderQ();
}

function stopTimer() { clearInterval(S?.timer); if (S) S.timer = null; }
function renderQ() {
  stopTimer();
  const q = S.qs[S.i];
  const order = S.orders[S.i] ||= (q.k || !P.settings.shuffle) ? q.o.map((_, j) => j) : shuffle(q.o.map((_, j) => j));
  const progress = S.blitz ? Math.max(0, (S.deadline - Date.now()) / 60e3) : S.i / S.qs.length;
  const meta = subjectMeta(q.s);
  app.innerHTML = `
  <div class="qhead">
    <button class="x" id="quit" aria-label="Quit">✕</button>
    ${bar(progress)}
    ${S.boss || S.blitz ? '<span class="timer" id="timer"></span>' : ''}
    <span class="combo" id="combo">${S.combo >= 2 ? '🔥' + S.combo : ''}</span>
  </div>
  <div class="row small muted" style="flex-wrap:wrap;gap:6px">
    <span>${S.blitz ? `✔ ${S.ok}` : `${S.i + 1}/${S.qs.length}`}</span>
    <span class="chip">${meta.icon} ${esc(topicMeta(q.s, q.t)?.name || '')}</span>
    ${q.p ? `<span class="chip pyq">📜 ${esc(q.p)}</span>` : ''}
  </div>
  <div class="qtext">${fmt(q.q)}</div>
  <div class="opts" id="opts">
    ${order.map((j, n) => `<button class="opt" data-j="${n}"><span class="k">${L[n]}</span><span class="grow">${inline(q.o[j])}<span class="why" hidden></span></span></button>`).join('')}
  </div>
  <div id="fb"></div>`;
  $('#quit').onclick = () => { if (S.i === 0 && !S.log.length || confirm('Quit this session? Progress so far is saved.')) endSession(true); };
  $('#opts').onclick = (e) => { const b = e.target.closest('.opt'); if (b) answer(+b.dataset.j); };
  if (S.boss) {
    S.left = 25;
    const tick = () => {
      const el = $('#timer'); if (!el) return stopTimer();
      el.textContent = S.left + 's'; el.classList.toggle('low', S.left <= 5);
      if (S.left <= 0) { stopTimer(); answer(-1); } else { if (S.left <= 5) sfx.tick(); S.left--; }
    };
    tick(); S.timer = setInterval(tick, 1000);
  }
  if (S.blitz) {
    const tick = () => {
      const el = $('#timer'); if (!el) return stopTimer();
      const left = Math.max(0, Math.ceil((S.deadline - Date.now()) / 1000));
      el.textContent = left + 's'; el.classList.toggle('low', left <= 10);
      if (left <= 0) { stopTimer(); endSession(); }
    };
    tick(); S.timer = setInterval(tick, 250);
  }
  window.scrollTo(0, 0);
}

function answer(n) {
  if (S.locked) return;
  S.locked = true;
  stopTimer();
  const q = S.qs[S.i], order = S.orders[S.i];
  const picked = n >= 0 ? order[n] : -1;
  const ok = picked === q.a;
  const opts = $('#opts');
  opts.classList.add('locked');
  [...opts.children].forEach((b, k) => {
    const j = order[k];
    if (j === q.a) b.classList.add('right');
    else if (k === n) b.classList.add('wrong');
    else b.classList.add('dim');
    if (!S.blitz) { const w = b.querySelector('.why'); w.innerHTML = (j === q.a ? '✅ ' : '❌ ') + inline(q.w[j]); w.hidden = false; }
  });
  const wasWrongBefore = P.q[q.id]?.[0] === 0;
  grade(q, ok);
  S.log.push({ q, picked, ok });
  if (ok) {
    S.ok++; S.combo++; S.best = Math.max(S.best, S.combo);
    P.stats.bestCombo = Math.max(P.stats.bestCombo, S.combo);
    const gain = 10 + Math.min(S.combo - 1, 10) + (S.boss ? 5 : 0) + (wasWrongBefore ? 5 : 0);
    S.xp += gain; addXP(gain); sfx.ok(); floatXP('+' + gain);
    const c = $('#combo'); c.textContent = S.combo >= 2 ? '🔥' + S.combo : ''; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
    if ([5, 10, 15, 20, 25, 30, 40, 50].includes(S.combo)) toast(`🔥 ${S.combo} in a row!`);
  } else { S.combo = 0; sfx.bad(); $('#combo').textContent = ''; }
  checkBadges(); persist(); refreshChrome();

  if (S.blitz) {
    setTimeout(() => { if (S) { S.locked = false; next(); } }, ok ? 350 : 900);
    return;
  }
  const fb = $('#fb');
  fb.innerHTML = `
  <div class="feedback ${ok ? 'ok' : 'no'}">
    <h3>${ok ? ['Nailed it! 🎯', 'Correct! ✨', 'Boom! 💥', 'Sharp! 🧠'][Math.random() * 4 | 0] : n < 0 ? "⏰ Time's up" : 'Not quite 💡'}</h3>
    ${!ok ? `<div class="small" style="margin-bottom:6px">Answer: <b>${inline(q.o[q.a])}</b></div>` : ''}
    ${q.h ? `<div class="hook">💡 ${inline(q.h)}</div>` : ''}
    ${q.f ? `<div class="note-fix">📌 ${inline(q.f)}</div>` : ''}
    <button class="btn ${ok ? 'good' : 'bad'}" id="next">${S.i + 1 < S.qs.length ? 'Continue' : 'Finish'}</button>
  </div>`;
  $('#next').onclick = () => { S.locked = false; next(); };
  fb.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function next() {
  S.i++;
  if (S.blitz && S.i >= S.qs.length) S.i = 0;
  if (S.blitz && Date.now() >= S.deadline) return endSession();
  if (S.i >= S.qs.length) return endSession();
  renderQ();
}

function endSession(quit = false) {
  stopTimer();
  const s = S;
  setFocus(false);
  if (!s) return;
  S = null;
  if (quit && !s.log.length) { go(s.back); return; }
  const n = s.log.length, acc = n ? s.ok / n : 0;
  P.stats.sessions++;
  let stars = 0;
  if (s.boss && !quit && n) {
    stars = acc >= 0.9 ? 3 : acc >= 0.75 ? 2 : acc >= 0.6 ? 1 : 0;
    const k = s.sid + '/' + s.tid;
    if (stars > (P.stars[k] || 0)) P.stars[k] = stars;
  }
  if (s.blitz) P.stats.blitzBest = Math.max(P.stats.blitzBest, s.ok);
  const bonus = !quit && n >= 5 && acc === 1 ? 25 : 0;
  if (bonus) { addXP(bonus); s.xp += bonus; }
  checkBadges(); persist(); refreshChrome();
  if (acc >= 0.8 && n >= 5) { confetti(); sfx.level(); }
  const emoji = acc === 1 ? '🏆' : acc >= 0.8 ? '🤩' : acc >= 0.6 ? '😎' : acc >= 0.4 ? '🙂' : '💪';
  const wrong = s.log.filter((x) => !x.ok);
  app.innerHTML = `
  <div class="result-hero">
    <div class="emoji">${emoji}</div>
    ${s.boss ? `<div class="stars">${starStr(stars)}</div>` : ''}
    <h1>${s.blitz ? `${s.ok} correct in 60s` : `${s.ok} / ${n} correct`}</h1>
    <p class="muted">${esc(s.title)}${bonus ? ' · Perfect bonus +25 XP' : ''}</p>
  </div>
  <div class="grid2">
    <div class="card stat"><b>+${s.xp}</b><span>XP earned</span></div>
    <div class="card stat"><b>${pct(acc)}%</b><span>Accuracy</span></div>
    <div class="card stat"><b>🔥 ${s.best}</b><span>Best combo</span></div>
    <div class="card stat"><b>${P.day.xp}/${P.settings.goal}</b><span>Daily goal</span></div>
  </div>
  <div class="grid2" style="margin-top:14px">
    <button class="btn" id="again">↻ Again</button>
    <button class="btn alt" id="done">Done</button>
  </div>
  ${wrong.length ? `<div class="section-title">Your mistakes · learn these</div><div class="stack">${wrong.map(reviewCard).join('')}</div>` : ''}`;
  $('#again').onclick = () => startQuiz(s.mode, s.sid, s.tid);
  $('#done').onclick = () => go(s.back);
}

function reviewCard({ q, picked }) {
  return `<div class="card">
    <div class="small muted">${subjectMeta(q.s).icon} ${esc(topicMeta(q.s, q.t)?.name || '')}${q.p ? ' · 📜 ' + esc(q.p) : ''}</div>
    <div style="margin:6px 0;font-weight:600;white-space:pre-wrap">${fmt(q.q)}</div>
    ${picked >= 0 && picked !== q.a ? `<div class="small" style="color:var(--bad)">✗ You: ${inline(q.o[picked])} — <span class="muted">${inline(q.w[picked])}</span></div>` : picked === -1 ? '<div class="small" style="color:var(--bad)">✗ Not answered</div>' : ''}
    <div class="small" style="color:var(--good);margin-top:4px">✓ ${inline(q.o[q.a])} — <span class="muted">${inline(q.w[q.a])}</span></div>
    ${q.h ? `<div class="hook" style="margin-bottom:0">💡 ${inline(q.h)}</div>` : ''}
    ${q.f ? `<div class="note-fix" style="margin-bottom:0">📌 ${inline(q.f)}</div>` : ''}
  </div>`;
}

/* ---------------- review / play pages ---------------- */
function reviewPage() {
  const now = Date.now();
  const recs = Object.entries(P.q);
  const due = recs.filter(([, r]) => isDue(r, now)).length;
  const wrong = recs.filter(([, r]) => r[0] === 0).length;
  const boxes = [0, 1, 2, 3, 4, 5].map((b) => recs.filter(([, r]) => r[0] === b).length);
  app.innerHTML = `
  <h1>🔁 Review</h1>
  <p class="muted">Spaced repetition: wrong answers come back fast, correct ones come back later. Clear the queue every few hours.</p>
  <div class="card stack">
    <div class="row between"><b>${due} due now</b><span class="small muted">${wrong} currently wrong</span></div>
    <a class="btn ${due ? 'good' : 'alt'}" href="#/quiz/review" ${due ? '' : 'style="pointer-events:none;opacity:.5"'}>Start review · up to 20</a>
  </div>
  <div class="section-title">Memory boxes</div>
  <div class="card stack small">
    ${['😵 Wrong', '🌱 Just learnt', '🌿 Learning', '🌳 Known', '💪 Strong', '💎 Mastered'].map((n, b) => `<div class="row"><span style="width:110px">${n}</span><div class="grow">${bar(recs.length ? boxes[b] / recs.length : 0)}</div><span style="width:40px;text-align:right">${boxes[b]}</span></div>`).join('')}
  </div>
  <a class="btn alt" style="margin-top:14px" href="#/mistakes">📕 Browse my mistake book</a>`;
}

async function mistakesPage() {
  app.innerHTML = '<div class="loading">Loading…</div>';
  await loadAll();
  const all = Object.values(SUBJ).flatMap((s) => s.questions).filter((q) => P.q[q.id] && P.q[q.id][2] > 0)
    .sort((a, b) => P.q[a.id][0] - P.q[b.id][0] || P.q[b.id][2] - P.q[a.id][2]);
  app.innerHTML = `<a class="back" href="#/review">‹ Review</a><h1>📕 Mistake book</h1>
  <p class="muted">${all.length} questions you have missed at least once. Weakest first.</p>
  <div class="stack">${all.slice(0, 150).map((q) => reviewCard({ q, picked: -2 })).join('') || '<div class="card muted">No mistakes yet!</div>'}</div>`;
}

function playPage() {
  app.innerHTML = `
  <h1>⚡ Play</h1>
  <div class="stack">
    <a class="card tap row" href="#/quiz/blitz"><div class="sub-icon">⚡</div><div class="grow"><b>Blitz · 60 seconds</b><div class="small muted">Answer as many as you can. Best: ${P.stats.blitzBest}</div></div></a>
    <a class="card tap row" href="#/quiz/allpyq"><div class="sub-icon">📜</div><div class="grow"><b>Question-bank mix</b><div class="small muted">20 past-paper Qs from all subjects</div></div></a>
    <a class="card tap row" href="#/quiz/weak"><div class="sub-icon">🎯</div><div class="grow"><b>Weak spots</b><div class="small muted">20 Qs from your weakest topics</div></div></a>
    <a class="card tap row" href="#/quiz/mixed"><div class="sub-icon">🎲</div><div class="grow"><b>Random 20</b><div class="small muted">Everything, smart-picked</div></div></a>
  </div>`;
}

/* ---------------- mock exam ---------------- */
let M = null;
function mockHome() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem(MOCK_KEY)); } catch { return null; } })();
  const hist = [...P.mocks].reverse();
  app.innerHTML = `
  <h1>📝 Mock exam</h1>
  <p class="muted">${MOCK_SIZE} MCQs across all ${INDEX.subjects.length} subjects, like the real paper. No hints until you submit.</p>
  <div class="card stack">
    <label class="row between"><span>Time limit</span><select id="mins">${[60, 90, 100, 120, 180].map((m) => `<option ${m === P.settings.mockMin ? 'selected' : ''} value="${m}">${m} min</option>`).join('')}</select></label>
    ${saved ? '<button class="btn gold" id="resume">▶ Resume unfinished mock</button>' : ''}
    <button class="btn" id="start">Start new mock</button>
  </div>
  ${hist.length ? `<div class="section-title">History</div><div class="card">${hist.map((m) => `<div class="list-item"><div class="grow"><b>${m.ok}/${m.n}</b> <span class="muted small">· ${new Date(m.ts).toLocaleString()}</span></div><span class="small muted">${Math.round(m.dur / 60)} min</span></div>`).join('')}</div>` : ''}`;
  $('#mins').onchange = (e) => { P.settings.mockMin = +e.target.value; persist(); };
  $('#start').onclick = async () => {
    if (saved && !confirm('Discard the unfinished mock?')) return;
    app.innerHTML = '<div class="loading">Building your paper…</div>';
    await loadAll();
    const subs = INDEX.subjects.map((s) => SUBJ[s.id]);
    const base = Math.floor(MOCK_SIZE / subs.length), extra = MOCK_SIZE % subs.length;
    const qs = subs.flatMap((s, i) => shuffle(s.questions).slice(0, base + (i < extra ? 1 : 0)));
    M = { ids: shuffle(qs).map((q) => q.id), ans: {}, flags: {}, i: 0, start: Date.now(), dur: P.settings.mockMin * 60e3, orders: {} };
    saveMock(); location.hash = '#/mock/run';
  };
  if (saved) $('#resume').onclick = () => { M = saved; location.hash = '#/mock/run'; };
}
const saveMock = () => { try { localStorage.setItem(MOCK_KEY, JSON.stringify(M)); } catch { /* ignore */ } };
let qById = null;
async function mockRun() {
  if (!M) { try { M = JSON.parse(localStorage.getItem(MOCK_KEY)); } catch { M = null; } }
  if (!M) { location.hash = '#/mock'; return; }
  await loadAll();
  qById = new Map(Object.values(SUBJ).flatMap((s) => s.questions).map((q) => [q.id, q]));
  M.ids = M.ids.filter((id) => qById.has(id));
  setFocus(true);
  drawMock();
}
let mockTimer = null;
function drawMock() {
  clearInterval(mockTimer);
  const q = qById.get(M.ids[M.i]);
  const order = M.orders[q.id] ||= q.k ? q.o.map((_, j) => j) : shuffle(q.o.map((_, j) => j));
  const answered = Object.keys(M.ans).length;
  app.innerHTML = `
  <div class="qhead"><button class="x" id="quit">✕</button>${bar(answered / M.ids.length)}<span class="timer" id="timer"></span></div>
  <div class="row between small muted"><span>Q ${M.i + 1} / ${M.ids.length} · ${answered} answered</span><button class="chip" id="flag">${M.flags[q.id] ? '🚩 Flagged' : '⚑ Flag'}</button></div>
  <div class="qtext">${fmt(q.q)}</div>
  <div class="opts" id="opts">${order.map((j, n) => `<button class="opt ${M.ans[q.id] === j ? 'sel' : ''}" data-j="${j}"><span class="k">${L[n]}</span><span class="grow">${inline(q.o[j])}</span></button>`).join('')}</div>
  <div class="grid2" style="margin-top:16px"><button class="btn alt" id="prev" ${M.i ? '' : 'disabled'}>‹ Prev</button><button class="btn" id="nextq">${M.i + 1 < M.ids.length ? 'Next ›' : 'Review'}</button></div>
  <details style="margin-top:16px"><summary class="muted">Question palette</summary>
    <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:10px">${M.ids.map((id, k) => `<button class="chip" data-go="${k}" style="padding:6px 0;${k === M.i ? 'outline:2px solid var(--accent);' : ''}${M.ans[id] !== undefined ? 'background:var(--accent);color:#fff;' : ''}${M.flags[id] ? 'background:var(--fire);color:#000;' : ''}">${k + 1}</button>`).join('')}</div>
  </details>
  <button class="btn gold" id="submit" style="margin-top:16px">Submit paper</button>`;
  $('#opts').onclick = (e) => {
    const b = e.target.closest('.opt'); if (!b) return;
    const j = +b.dataset.j;
    if (M.ans[q.id] === j) delete M.ans[q.id]; else M.ans[q.id] = j;
    saveMock(); drawMock();
  };
  $('#flag').onclick = () => { M.flags[q.id] = !M.flags[q.id]; saveMock(); drawMock(); };
  $('#prev').onclick = () => { M.i--; saveMock(); drawMock(); };
  $('#nextq').onclick = () => { if (M.i + 1 < M.ids.length) { M.i++; saveMock(); drawMock(); } else $('details').open = true; };
  app.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => { M.i = +b.dataset.go; saveMock(); drawMock(); }; });
  $('#submit').onclick = () => { const left = M.ids.length - Object.keys(M.ans).length; if (confirm(left ? `${left} unanswered. Submit anyway?` : 'Submit your paper?')) submitMock(); };
  $('#quit').onclick = () => { clearInterval(mockTimer); setFocus(false); location.hash = '#/mock'; };
  const tick = () => {
    const el = $('#timer'); if (!el) return clearInterval(mockTimer);
    const left = Math.max(0, M.start + M.dur - Date.now());
    el.textContent = `${Math.floor(left / 6e4)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`;
    el.classList.toggle('low', left < 5 * 6e4);
    if (left <= 0) { clearInterval(mockTimer); toast("⏰ Time's up! Paper submitted."); submitMock(); }
  };
  tick(); mockTimer = setInterval(tick, 1000);
  window.scrollTo(0, 0);
}
function submitMock() {
  clearInterval(mockTimer);
  setFocus(false);
  const log = M.ids.map((id) => { const q = qById.get(id); const picked = M.ans[id] ?? -1; return { q, picked, ok: picked === q.a }; });
  const by = {};
  for (const { q, ok, picked } of log) {
    by[q.s] ||= [0, 0]; by[q.s][1]++; if (ok) by[q.s][0]++;
    if (picked >= 0) grade(q, ok);
  }
  const ok = log.filter((x) => x.ok).length;
  const rec = { ts: Date.now(), n: log.length, ok, dur: Math.round((Date.now() - M.start) / 1000), by };
  P.mocks.push(rec);
  addXP(ok * 5);
  localStorage.removeItem(MOCK_KEY); M = null;
  checkBadges(); persist(); refreshChrome();
  if (ok / log.length >= 0.7) confetti();
  const wrong = log.filter((x) => !x.ok);
  app.innerHTML = `
  <div class="result-hero"><div class="emoji">${ok / log.length >= 0.9 ? '🏆' : ok / log.length >= 0.7 ? '🎓' : '📈'}</div>
    <h1>${ok} / ${log.length}</h1><p class="muted">${Math.round(rec.dur / 60)} min · +${ok * 5} XP</p></div>
  <div class="card stack">${Object.entries(by).map(([sid, [a, n]]) => `<div><div class="row between small"><span>${subjectMeta(sid).icon} ${esc(subjectMeta(sid).name)}</span><b>${a}/${n}</b></div>${bar(a / n, a / n >= 0.7 ? 'good' : '')}</div>`).join('')}</div>
  <a class="btn alt" style="margin-top:14px" href="#/mock">Done</a>
  ${wrong.length ? `<div class="section-title">Wrong or skipped · ${wrong.length}</div><div class="stack">${wrong.map(reviewCard).join('')}</div>` : ''}`;
  window.scrollTo(0, 0);
}

/* ---------------- profile ---------------- */
function mePage() {
  const l = level(P.xp);
  const accuracy = P.stats.ans ? pct(P.stats.ok / P.stats.ans) : 0;
  app.innerHTML = `
  <div class="card hero center stack">
    <div style="font-size:48px">🧑‍🎓</div>
    <h2>${sync.user ? esc(sync.user.displayName || 'You') : 'Level ' + l}</h2>
    <div>${title(l)} · Lv ${l} · ${P.xp} XP</div>
  </div>
  <div class="grid2" style="margin-top:12px">
    <div class="card stat"><b>${P.stats.ans}</b><span>Answered</span></div>
    <div class="card stat"><b>${accuracy}%</b><span>Accuracy</span></div>
    <div class="card stat"><b>🔥 ${streakNow()}</b><span>Day streak</span></div>
    <div class="card stat"><b>${P.stats.bestCombo}</b><span>Best combo</span></div>
  </div>
  <div class="section-title">Badges · ${Object.keys(P.badges).length}/${BADGES.length}</div>
  <div class="badges">${BADGES.map(([id, icon, name, desc]) => `<div class="badge ${P.badges[id] ? '' : 'locked'}" title="${esc(desc)}"><span class="i">${icon}</span><b>${name}</b><div class="muted">${desc}</div></div>`).join('')}</div>
  <div class="section-title">Cloud sync</div>
  <div class="card stack">${syncBlock()}</div>
  <div class="section-title">Settings</div>
  <div class="card">
    <label class="toggle"><span>🔊 Sound effects</span><input type="checkbox" id="snd" ${P.settings.sound ? 'checked' : ''}></label>
    <label class="toggle"><span>📳 Vibrate on wrong</span><input type="checkbox" id="vib" ${P.settings.vib ? 'checked' : ''}></label>
    <label class="toggle"><span>🔀 Shuffle options</span><input type="checkbox" id="shf" ${P.settings.shuffle ? 'checked' : ''}></label>
    <label class="toggle"><span>🎯 Daily XP goal</span><select id="goal">${[150, 300, 500, 800, 1200].map((g) => `<option ${g === P.settings.goal ? 'selected' : ''}>${g}</option>`).join('')}</select></label>
  </div>
  <div class="grid2" style="margin-top:12px">
    <button class="btn alt sm" id="exp">⬇ Export progress</button>
    <button class="btn alt sm" id="imp">⬆ Import progress</button>
  </div>
  <button class="btn bad sm" id="reset" style="margin-top:12px;width:100%">Reset all progress</button>
  <p class="small muted center" style="margin-top:16px">Content v${INDEX.version} · ${INDEX.total} questions</p>`;
  $('#snd').onchange = (e) => { P.settings.sound = e.target.checked; persist(); };
  $('#vib').onchange = (e) => { P.settings.vib = e.target.checked; persist(); };
  $('#shf').onchange = (e) => { P.settings.shuffle = e.target.checked; persist(); };
  $('#goal').onchange = (e) => { P.settings.goal = +e.target.value; persist(); };
  $('#exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(P)], { type: 'application/json' }));
    a.download = `comprequest-progress-${today()}.json`; a.click();
  };
  $('#imp').onclick = () => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = 'application/json';
    i.onchange = async () => {
      try { P = mergeProgress(P, JSON.parse(await i.files[0].text())); persist(); toast('✅ Progress imported'); route(); }
      catch { toast('❌ That file is not a progress export'); }
    };
    i.click();
  };
  $('#reset').onclick = () => { if (confirm('Erase ALL progress on this device (and cloud, if signed in)?')) { P = blank(); persist(); route(); refreshChrome(); } };
  $('#signin')?.addEventListener('click', () => sync.signIn().catch((e) => toast('Sign-in failed: ' + e.message)));
  $('#signout')?.addEventListener('click', () => sync.signOut());
}
function syncBlock() {
  if (!sync.enabled) return '<p class="small muted">Cloud sync is not configured yet. Progress is saved on this device.</p>';
  if (sync.user) return `<div class="row between"><span>☁️ Signed in as <b>${esc(sync.user.email || sync.user.displayName || '')}</b></span></div>
    <div class="small muted">${esc(sync.status)}</div><button class="btn alt sm" id="signout">Sign out</button>`;
  return `<p class="small muted">Sign in to back up progress and continue on any device.</p>
    <div class="small muted">${esc(sync.status)}</div><button class="btn" id="signin">Sign in with Google</button>`;
}

function notFound() { app.innerHTML = '<div class="card center"><h2>Page not found</h2><a class="btn" href="#/">Home</a></div>'; }

/* ---------------- router ---------------- */
const routes = [
  [/^#?\/?$/, home],
  [/^#\/s\/(\w+)$/, subjectPage],
  [/^#\/t\/(\w+)\/([\w-]+)$/, topicPage],
  [/^#\/learn\/(\w+)\/([\w-]+)$/, learn],
  [/^#\/quiz\/(\w+)(?:\/(\w+))?(?:\/([\w-]+))?$/, startQuiz],
  [/^#\/review$/, reviewPage],
  [/^#\/mistakes$/, mistakesPage],
  [/^#\/play$/, playPage],
  [/^#\/mock$/, mockHome],
  [/^#\/mock\/run$/, mockRun],
  [/^#\/me$/, mePage],
];
async function route() {
  if (S) { stopTimer(); S = null; }
  clearInterval(mockTimer);
  setFocus(false);
  refreshChrome();
  const h = location.hash || '#/';
  for (const [re, fn] of routes) {
    const m = h.match(re);
    if (m) {
      try { await fn(...m.slice(1)); } catch (e) { console.error(e); app.innerHTML = `<div class="card"><h2>Something went wrong</h2><p class="muted">${esc(e.message)}</p><a class="btn" href="#/">Home</a></div>`; }
      if (!/^#\/(quiz|mock\/run)/.test(h)) window.scrollTo(0, 0);
      return;
    }
  }
  notFound();
}

async function boot() {
  try {
    INDEX = await (await fetch('data/index.json', { cache: 'no-cache' })).json();
  } catch {
    app.innerHTML = '<div class="card center"><h2>Offline</h2><p class="muted">Open the app once while online to download the questions.</p></div>';
    return;
  }
  addEventListener('hashchange', route);
  route();
  sync.init();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
boot();
