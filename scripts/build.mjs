// Compiles content/*.md (question DSL) into data/*.json for the app.
//
// DSL
//   @subject id | Name | emoji        subject header (once per file)
//   @order N                          position on the home screen
//   @desc text                        one-line description
//   # topicId | Topic name            starts a topic
//   N: note                           revision note for the current topic
//   Q: question text                  starts a question (more lines may follow; ``` fences keep code)
//   * option ~~ why                   correct option
//   - option ~~ why                   wrong option
//   H: hook                           one-line memory hook
//   P: label                          source tag, e.g. "PYQ" for question-bank questions
//   F: note                           answer-key note (e.g. bank key disagreement)
//   K: fixed                          keep option order (no shuffling)
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content');
const dataDir = join(root, 'data');
mkdirSync(dataDir, { recursive: true });

const hash = (s) => {
  let h = 5381;
  for (const ch of s) h = ((h * 33) ^ ch.codePointAt(0)) >>> 0;
  return h.toString(36);
};
const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const NO_SHUFFLE = /\b(all|none|both|neither)\b.*\b(above|these|of|options|a|b|c|d)\b|^(a|b|c|d) and (a|b|c|d)$|^only [a-d]/i;

let errors = 0;
const fail = (file, line, msg) => { errors++; console.error(`✗ ${file}:${line} ${msg}`); };

const index = [];
const seenGlobal = new Map();
let total = 0, pyqTotal = 0;

for (const file of readdirSync(contentDir).filter((f) => f.endsWith('.md')).sort()) {
  const lines = readFileSync(join(contentDir, file), 'utf8').split('\n');
  const subject = { id: '', name: '', icon: '📘', desc: '', order: 99, topics: [], questions: [] };
  let topic = null, q = null, inFence = false;

  const finishQ = (ln) => {
    if (!q) return;
    q.q = q.q.trimEnd();
    const correct = q.o.filter((o) => o.c).length;
    if (correct !== 1) fail(file, q.ln, `question needs exactly one correct option (has ${correct}): ${q.q.slice(0, 60)}`);
    if (q.o.length < 2) fail(file, q.ln, `too few options: ${q.q.slice(0, 60)}`);
    if (q.o.some((o) => !o.w)) fail(file, q.ln, `option missing "~~ why": ${q.q.slice(0, 60)}`);
    const key = norm(q.q) + '|' + q.o.map((o) => norm(o.t)).sort().join('|');
    q.id = subject.id + '-' + hash(key);
    if (seenGlobal.has(q.id)) fail(file, q.ln, `duplicate question (also at ${seenGlobal.get(q.id)}): ${q.q.slice(0, 60)}`);
    seenGlobal.set(q.id, `${file}:${q.ln}`);
    const out = { id: q.id, t: topic.id, q: q.q, o: q.o.map((o) => o.t), a: q.o.findIndex((o) => o.c), w: q.o.map((o) => o.w) };
    if (q.h) out.h = q.h;
    if (q.p) out.p = q.p;
    if (q.f) out.f = q.f;
    if (q.fixed || q.o.some((o) => NO_SHUFFLE.test(o.t))) out.k = 1;
    subject.questions.push(out);
    q = null;
  };

  lines.forEach((raw, i) => {
    const ln = i + 1;
    const line = raw.replace(/\s+$/, '');
    if (q && q.o.length === 0 && (inFence || line.startsWith('```'))) {
      if (line.startsWith('```')) inFence = !inFence;
      q.q += '\n' + line;
      return;
    }
    if (!line.trim() || line.startsWith('//')) return;
    let m;
    if ((m = line.match(/^@subject\s+(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)$/))) { [, subject.id, subject.name, subject.icon] = m; return; }
    if ((m = line.match(/^@order\s+(\d+)/))) { subject.order = +m[1]; return; }
    if ((m = line.match(/^@desc\s+(.+)/))) { subject.desc = m[1]; return; }
    if ((m = line.match(/^#\s+([\w-]+)\s*\|\s*(.+)$/))) {
      finishQ(ln);
      if (subject.topics.some((t) => t.id === m[1])) fail(file, ln, `duplicate topic id ${m[1]}`);
      topic = { id: m[1], name: m[2], notes: [] };
      subject.topics.push(topic);
      return;
    }
    if (!topic) return fail(file, ln, 'content before first topic');
    if ((m = line.match(/^N:\s*(.+)/))) { finishQ(ln); topic.notes.push(m[1]); return; }
    if ((m = line.match(/^Q:\s*(.*)/))) { finishQ(ln); q = { ln, q: m[1], o: [] }; return; }
    if (!q) return fail(file, ln, `unexpected line: ${line.slice(0, 60)}`);
    if ((m = line.match(/^([*-])\s+(.+?)\s+~~\s+(.+)$/))) { q.o.push({ c: m[1] === '*', t: m[2], w: m[3] }); return; }
    if ((m = line.match(/^([*-])\s+(.+)$/))) { q.o.push({ c: m[1] === '*', t: m[2], w: '' }); return; }
    if ((m = line.match(/^H:\s*(.+)/))) { q.h = m[1]; return; }
    if ((m = line.match(/^P:\s*(.+)/))) { q.p = m[1]; return; }
    if ((m = line.match(/^F:\s*(.+)/))) { q.f = m[1]; return; }
    if (/^K:\s*fixed/.test(line)) { q.fixed = true; return; }
    if (q.o.length === 0) { q.q += '\n' + line; return; }
    fail(file, ln, `unrecognised line: ${line.slice(0, 60)}`);
  });
  finishQ(lines.length);

  if (!subject.id) { fail(file, 1, 'missing @subject'); continue; }
  const counts = {};
  for (const x of subject.questions) counts[x.t] = (counts[x.t] || 0) + 1;
  for (const t of subject.topics) if (!counts[t.id]) console.warn(`! ${file}: topic "${t.id}" has no questions`);
  writeFileSync(join(dataDir, subject.id + '.json'), JSON.stringify(subject));
  const pyq = subject.questions.filter((x) => x.p).length;
  total += subject.questions.length; pyqTotal += pyq;
  index.push({
    id: subject.id, name: subject.name, icon: subject.icon, desc: subject.desc, order: subject.order,
    count: subject.questions.length, pyq,
    topics: subject.topics.map((t) => ({
      id: t.id, name: t.name, notes: t.notes.length,
      ids: subject.questions.filter((x) => x.t === t.id).map((x) => x.id),
      pyq: subject.questions.filter((x) => x.t === t.id && x.p).map((x) => x.id),
    })),
  });
  console.log(`✓ ${subject.id.padEnd(6)} ${String(subject.questions.length).padStart(4)} questions (${pyq} PYQ) · ${subject.topics.length} topics`);
}

index.sort((a, b) => a.order - b.order);
const version = hash(JSON.stringify(index) + total);
writeFileSync(join(dataDir, 'index.json'), JSON.stringify({ version, built: new Date().toISOString(), total, subjects: index }));
console.log(`\nTotal: ${total} questions (${pyqTotal} from question bank) · version ${version}`);
if (errors) { console.error(`\n${errors} error(s)`); process.exit(1); }
