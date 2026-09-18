/* InterviewLoop web client · v1.0
   纯静态、BYOK、全部数据只在 localStorage。除用户主动触发的模型 / 语音请求外不发任何网络请求。 */
(() => {
'use strict';
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const LS = {
  get(k, d) { try { const v = localStorage.getItem('il.' + k); return v == null ? d : v; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('il.' + k, v); } catch {} },
  del(k) { try { localStorage.removeItem('il.' + k); } catch {} },
  json(k, d) { try { return JSON.parse(LS.get(k, 'null')) ?? d; } catch { return d; } },
};

/* ---------- i18n ---------- */
const T = {
  zh: {
    subtitle: '面试候选人自训练系统 · v1.0', install: '安装到桌面',
    privacy: '你的笔记、手册和 key 不经过任何服务器。所有内容只存在这个浏览器里；导出即备份。',
    'tab.hb': '手册', 'tab.a': 'A · 面前预演', 'tab.b': 'B · 面后复盘', 'tab.c': 'C · 结果回填', 'tab.t': '转录', 'tab.s': '设置',
    copy: '复制', download: '下载 .md', raw: '切换原文/渲染', stop: '停止', usehb: '附带个人手册',
    run: '运行模块 A', 'run.b': '运行模块 B', 'run.c': '运行模块 C',
    copied: '已复制', saved: '已保存', nokey: '先到"设置"填 API key', nojd: 'JD 与简历要点必填', nonotes: '面后笔记必填',
    nob: '没有模块 B 输出，先跑 B', noc: '先选一个结果', running: '运行中…', done: '完成', stopped: '已停止',
    taxmissing: '缺少分类库文件，无法运行', loadfail: '协议或分类库加载失败：', err: '错误：',
    refusal: '模型拒绝了本次请求（stop_reason: refusal）。可在设置里关闭服务端回退后重试，或换模型。',
    'hb.confirmreset': '用空模板覆盖当前手册？此操作不可撤销，建议先导出。', 'hb.imported': '已导入',
    wipeconfirm: '清除本浏览器里 InterviewLoop 的全部数据（手册、输入、输出、key）？', wiped: '已清除，页面将刷新',
    testing: '测试中…', testok: '连接正常：', 'a.hint2': 'A 输出已存，B 可引用。',
    'rec.start': '开始录音', 'rec.stop': '停止录音', recording: '录音中…', audioready: '音频就绪，可转录', noaudio: '先录音或导入音频',
    tload: '加载本地模型中（首次需下载，之后离线可用）…', trun: '转录中…', tdone: '转录完成', tfail: '转录失败：',
    tsent: '已填入模块 B 的转录框', micdenied: '无法访问麦克风：',
  },
  en: {
    subtitle: 'Self-Training System for Interview Candidates · v1.0', install: 'Install as app',
    privacy: 'Your notes, handbook and key never pass through a server. Everything lives only in this browser; export is your backup.',
    'tab.hb': 'Handbook', 'tab.a': 'A · Pre-interview Rehearsal', 'tab.b': 'B · Post-interview Review', 'tab.c': 'C · Outcome Backfill', 'tab.t': 'Transcribe', 'tab.s': 'Settings',
    copy: 'Copy', download: 'Download .md', raw: 'Toggle raw/rendered', stop: 'Stop', usehb: 'Attach personal handbook',
    run: 'Run Module A', 'run.b': 'Run Module B', 'run.c': 'Run Module C',
    copied: 'Copied', saved: 'Saved', nokey: 'Add an API key under Settings first', nojd: 'JD and résumé points are required', nonotes: 'Post-interview notes are required',
    nob: 'No Module B output yet; run B first', noc: 'Pick a result first', running: 'Running…', done: 'Done', stopped: 'Stopped',
    taxmissing: 'Taxonomy files missing; cannot run.', loadfail: 'Failed to load protocol or taxonomy: ', err: 'Error: ',
    refusal: 'The model declined this request (stop_reason: refusal). Try disabling server-side fallback in Settings, or switch model.',
    'hb.confirmreset': 'Overwrite the current handbook with the empty template? This cannot be undone; export first.', 'hb.imported': 'Imported',
    wipeconfirm: 'Erase all InterviewLoop data in this browser (handbook, inputs, outputs, key)?', wiped: 'Erased; the page will reload',
    testing: 'Testing…', testok: 'Connected: ', 'a.hint2': 'Module A output stored; Module B can reference it.',
    'rec.start': 'Start recording', 'rec.stop': 'Stop recording', recording: 'Recording…', audioready: 'Audio ready', noaudio: 'Record or import audio first',
    tload: 'Loading local model (downloads once, then works offline)…', trun: 'Transcribing…', tdone: 'Transcription done', tfail: 'Transcription failed: ',
    tsent: 'Sent to Module B transcript box', micdenied: 'Microphone unavailable: ',
    // static UI
    'gate.title': 'Three things before you start', 'gate.s1t': 'What this is.', 'gate.s1': 'AI that trains you, not AI that interviews you. It does not answer for you; it trains the structure of your answers and your understanding of the role and industry. Three modules: Pre-interview Rehearsal (A) → interview → Post-interview Review (B) → Outcome Backfill (C) → your handbook grows one row → next A. Every prediction is scored against the real outcome and the correction goes back into your handbook; even a failed round grows the sample.',
    'gate.s2t': 'Where your data is.', 'gate.s2': 'This is a static page. Handbook, notes, transcripts and API key live only in this browser\'s local storage; nothing passes through a server. When you run a module, the browser sends the protocol + taxonomy + your input directly to the model endpoint you configured, with no third party in between. Clearing browser data erases everything, so export your handbook regularly.',
    'gate.s3t': 'Precondition.', 'gate.s3': 'This is not a shortcut: the JD and your résumé are both required, the notes are yours to write, the blanks are yours to fill. It only works for people willing to be honest with themselves: the tool cannot stop you from writing notes that flatter you, and each judgement is only as good as your notes. Covers one candidate, experienced hire or campus; group interviews are not covered. The web page is the zero-setup trial; the Claude Code skill is the full version (local transcription, automatic handbook write-back).',
    'gate.ok': 'I have read this. I know the data stays local and I know the precondition.', 'gate.go': 'Enter',
    'hb.title': 'Personal handbook (this browser only)', 'hb.hint': 'Template from templates/handbook.md. After running B or C, merge the "pending handbook increment" below by hand. Autosaves.',
    'hb.export': 'Export handbook.md', 'hb.import': 'Import .md', 'hb.reset': 'Reset to empty template', 'hb.inc': 'Pending handbook increment (from the latest B / C output)', 'hb.incclear': 'Merged, clear',
    'a.title': 'Module A · Pre-interview Rehearsal', 'a.hint': 'Output: mismatch intercept and hard gates → JD ↔ evidence map → type forecast and skeletons → 5-minute checklist → QA plan (structure + reference sentence) → three-tag self-intro draft. No full answers, no pass-rate prediction.',
    'a.jd': 'JD full text (required)', 'a.resume': 'Résumé points (required; the résumé itself or 5–10 experiences with numbers. Remembered in this browser)',
    'a.round': 'Round', 'a.interviewer': 'Interviewer\'s position (title, no name)', 'a.planned': 'Planned duration (min)', 'a.intro': 'Self-intro length required (e.g. "3 minutes")',
    'a.salary': 'Expected salary (optional)', 'a.start': 'Available start date (optional)', 'a.jdsalary': 'Salary range stated in the JD (copy as-is, optional)',
    'b.title': 'Module B · Post-interview Review', 'b.hint': 'Fill in as much of the notes template as you can: if it is incomplete, the model asks only for the 3–5 missing items that matter. The three count fields at the bottom are the only basis for hard signals; unknown = cannot judge. Output has three fixed parts: verdict card / details / self-check.',
    'b.notes': 'Post-interview notes (required; template prefilled)', 'b.transcript': 'Transcript (optional; [VERBATIM] tags are only available with a transcript)',
    'b.usea': 'Attach the latest Module A output (to compare forecast and QA hits)',
    'c.title': 'Module C · Outcome Backfill', 'c.hint': 'One line. Writes back to the interview log; compares with B\'s prediction; adds a calibration record if they differ. No guessing reasons, no next-step advice.',
    'c.pass': 'pass', 'c.fail': 'fail', 'c.round': 'reached round N', 'c.unknown': 'unknown', 'c.feedback': 'One line of interviewer feedback (if any)', 'c.useb': 'Attach the latest Module B output (required)',
    't.title': 'Recording transcription (experimental entry)', 't.warn': 'Get consent and check local law before recording. Audio stays in this page\'s memory only; it is never uploaded or saved to a server and disappears when you close the page.',
    't.hint': 'Two ways, both triggered by you: ① an open-source speech model running in the browser (model files download once, then offline); ② your own speech API key (OpenAI-compatible /audio/transcriptions). No key is embedded in this page.',
    't.rec': 'Start recording', 't.file': 'Import audio file', 't.mode': 'Method', 't.mode.local': 'Local model (runs in browser)', 't.mode.byok': 'BYOK speech API', 't.model': 'Local model',
    't.url': 'Endpoint', 't.key': 'Speech API key (this browser only)', 't.amodel': 'Model name', 't.run': 'Transcribe', 't.out': 'Transcript (editable)', 't.toB': 'Send to Module B transcript box',
    's.title': 'Model and key (this browser only)', 's.provider': 'Endpoint', 's.model': 'Model', 's.url': 'Base URL', 's.omodel': 'Model name', 's.key': 'API key', 's.effort': 'Effort',
    's.fallback': 'Enable server-side fallback (beta; switches model automatically if the model declines. Turn off if you see errors)', 's.test': 'Test connection (sends one minimal request)',
    's.note': 'Protocol and taxonomy are cached offline with this page. Each run sends PROTOCOL + the five taxonomy files + your input to the endpoint above; on the Anthropic endpoint the protocol part uses prompt caching to reduce cost.',
    's.data': 'Local data', 's.exportall': 'Export everything (handbook + latest A/B/C outputs)', 's.wipe': 'Erase all data in this browser', 's.about': 'About',
    's.aboutp': 'The product is PROTOCOL.md, which any large language model can run; this page is just one client. The taxonomy is a seed, not a census; "Unclassified" is a valid output.',
  },
};
let lang = LS.get('lang', 'zh');
const t = (k) => (T[lang] && T[lang][k]) ?? T.zh[k] ?? k;
const zhStatic = {};
function applyLang() {
  $$('[data-i18n]').forEach((el) => {
    const k = el.dataset.i18n;
    if (!(k in zhStatic)) zhStatic[k] = el.textContent;
    el.textContent = lang === 'zh' ? zhStatic[k] : (T.en[k] ?? zhStatic[k]);
  });
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  $('#lang').value = lang;
}

/* ---------- 协议与分类库加载 ---------- */
const FILES = {
  zh: { protocol: '../PROTOCOL.md', tax: ['interviewer-types', 'skeletons', 'signals', 'pitfalls', 'stages'].map((f) => `../taxonomy/cn/${f}.md`), hb: '../templates/zh/handbook.md', notes: '../templates/zh/post-interview-notes.md' },
  en: { protocol: '../PROTOCOL.en.md', tax: ['interviewer-types', 'skeletons', 'signals', 'pitfalls', 'stages'].map((f) => `../taxonomy/en/${f}.md`), hb: '../templates/en/handbook.md', notes: '../templates/en/post-interview-notes.md' },
};
const fileCache = {};
async function loadText(p) {
  if (fileCache[p]) return fileCache[p];
  const r = await fetch(p, { cache: 'no-cache' });
  if (!r.ok) throw new Error(p + ' ' + r.status);
  return (fileCache[p] = await r.text());
}
async function buildSystem() {
  const f = FILES[lang];
  const protocol = await loadText(f.protocol);
  let tax;
  try { tax = await Promise.all(f.tax.map(loadText)); } catch { throw new Error('TAXONOMY_MISSING'); }
  const head = lang === 'zh'
    ? '你正在运行 InterviewLoop 协议。下面依次是 PROTOCOL.md 全文与 taxonomy/ 五个文件。严格按协议对应模块的输出顺序与结构输出，不增删段落。用户输入在下一条消息里。'
    : 'You are running the InterviewLoop protocol. Below are PROTOCOL.md in full and the five taxonomy files. Follow the output order and structure of the requested module exactly; do not add or drop sections. The user input follows in the next message.';
  return [head, '', '===== PROTOCOL.md =====', protocol, ...tax.map((x, i) => `\n===== ${f.tax[i].replace('../', '')} =====\n${x}`)].join('\n');
}

/* ---------- 模型调用（BYOK，用户主动触发） ---------- */
function settings() {
  return Object.assign({ provider: 'anthropic', key: '', model: 'claude-opus-5', url: 'https://api.openai.com/v1', omodel: '', effort: 'high', fallback: true }, LS.json('settings', {}));
}
function saveSettings(patch) { LS.set('settings', JSON.stringify(Object.assign(settings(), patch))); }

async function callModel({ system, user, onDelta, signal, maxTokens = 16000 }) {
  const s = settings();
  if (!s.key) throw new Error(t('nokey'));
  if (s.provider === 'anthropic') return callAnthropic(s, { system, user, onDelta, signal, maxTokens });
  return callOpenAI(s, { system, user, onDelta, signal, maxTokens });
}

async function callAnthropic(s, { system, user, onDelta, signal, maxTokens }) {
  const headers = {
    'content-type': 'application/json',
    'x-api-key': s.key,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  };
  const body = {
    model: s.model, max_tokens: maxTokens, stream: true,
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: user }],
  };
  if (!/haiku/.test(s.model)) { body.thinking = { type: 'adaptive' }; body.output_config = { effort: s.effort || 'high' }; }
  if (s.fallback && /opus-5|fable-5/.test(s.model)) { headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; body.fallbacks = 'default'; }
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body), signal });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 600)}`);
  let text = '', stop = null;
  await readSSE(r, (ev) => {
    if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') { text += ev.delta.text; onDelta(text); }
    else if (ev.type === 'message_delta' && ev.delta?.stop_reason) stop = ev.delta.stop_reason;
    else if (ev.type === 'error') throw new Error(ev.error?.message || 'stream error');
  });
  if (stop === 'refusal') text += '\n\n> ' + t('refusal');
  if (stop === 'max_tokens') text += '\n\n> [max_tokens]';
  return text;
}

async function callOpenAI(s, { system, user, onDelta, signal, maxTokens }) {
  const base = (s.url || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const r = await fetch(base + '/chat/completions', {
    method: 'POST', signal,
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + s.key },
    body: JSON.stringify({ model: s.omodel, stream: true, max_tokens: maxTokens, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 600)}`);
  let text = '';
  await readSSE(r, (ev) => { const d = ev.choices?.[0]?.delta?.content; if (d) { text += d; onDelta(text); } });
  return text;
}

async function readSSE(r, onEvent) {
  const reader = r.body.getReader(); const dec = new TextDecoder(); let buf = '';
  for (;;) {
    const { value, done } = await reader.read(); if (done) break;
    buf += dec.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf('\n\n')) >= 0) {
      const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim(); if (!data || data === '[DONE]') continue;
        try { onEvent(JSON.parse(data)); } catch (e) { if (e instanceof SyntaxError) continue; throw e; }
      }
    }
  }
}

/* ---------- Markdown 最小渲染 ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  s = s.replace(/(【空位·思考漏洞】|【Blank · Thinking Gap】)/g, '<span class="gap">$1</span>');
  return s;
}
function md2html(md) {
  const L = md.replace(/\r/g, '').split('\n'); const out = []; let i = 0;
  const isTableSep = (l) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l);
  while (i < L.length) {
    let l = L[i];
    if (/^```/.test(l)) { const b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; out.push('<pre>' + esc(b.join('\n')) + '</pre>'); continue; }
    const h = /^(#{1,6})\s+(.*)$/.exec(l);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(l)) { out.push('<hr>'); i++; continue; }
    if (/^\s*\|/.test(l) && i + 1 < L.length && isTableSep(L[i + 1])) {
      const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim()));
      const head = cells(l); i += 2; const rows = [];
      while (i < L.length && /^\s*\|/.test(L[i])) rows.push(cells(L[i++]));
      out.push('<table><thead><tr>' + head.map((c) => `<th>${c}</th>`).join('') + '</tr></thead><tbody>' + rows.map((r) => '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table>');
      continue;
    }
    if (/^\s*>/.test(l)) { const b = []; while (i < L.length && /^\s*>/.test(L[i])) b.push(L[i++].replace(/^\s*>\s?/, '')); out.push('<blockquote>' + inline(b.join(' ')) + '</blockquote>'); continue; }
    const li = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(l);
    if (li) { const ol = /\d/.test(li[2]); const items = []; while (i < L.length) { const m = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(L[i]); if (!m) break; items.push(`<li>${inline(m[3])}</li>`); i++; } out.push(`<${ol ? 'ol' : 'ul'}>${items.join('')}</${ol ? 'ol' : 'ul'}>`); continue; }
    if (!l.trim()) { i++; continue; }
    const p = []; while (i < L.length && L[i].trim() && !/^(#{1,6}\s|```|\s*\||\s*>|\s*([-*+]|\d+[.)])\s)/.test(L[i])) p.push(L[i++]);
    if (!p.length) { p.push(l); i++; }
    out.push('<p>' + inline(p.join('\n')).replace(/\n/g, '<br>') + '</p>');
  }
  return out.join('\n');
}
function extractIncrements(md) {
  const L = md.replace(/\r/g, '').split('\n'); const parts = []; let cur = null;
  for (const l of L) {
    if (/^#{1,3}\s*(手册增量|Handbook increment)/i.test(l)) { if (cur) parts.push(cur.join('\n')); cur = [l]; continue; }
    if (cur) { if (/^#{1,3}\s/.test(l) && !/手册增量|Handbook increment/i.test(l)) { parts.push(cur.join('\n')); cur = null; } else cur.push(l); }
  }
  if (cur) parts.push(cur.join('\n'));
  return parts.join('\n\n');
}

/* ---------- 通用输出面板 ---------- */
const outputs = { A: LS.json('out.A', null), B: LS.json('out.B', null), C: LS.json('out.C', null) };
const rawMode = { A: false, B: false, C: false };
function renderOut(m, md) {
  const el = $(`#${m.toLowerCase()}-out`);
  if (!md) { el.innerHTML = ''; return; }
  el.innerHTML = rawMode[m] ? '<pre>' + esc(md) + '</pre>' : md2html(md);
}
function setOut(m, md) { outputs[m] = { ts: Date.now(), md }; LS.set('out.' + m, JSON.stringify(outputs[m])); renderOut(m, md); if (m !== 'A') showIncrements(); }
function showIncrements() {
  const src = [outputs.C, outputs.B].filter(Boolean).sort((a, b) => b.ts - a.ts)[0];
  const inc = src ? extractIncrements(src.md) : '';
  $('#hb-inc-card').hidden = !inc; if (inc) { $('#hb-inc').innerHTML = md2html(inc); $('#hb-inc').dataset.md = inc; }
}
function download(name, text) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
async function copyText(text, statusEl) { try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); } if (statusEl) flash(statusEl, t('copied')); }
function flash(el, msg) { el.textContent = msg; setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 2500); }
const stamp = () => new Date().toISOString().slice(0, 10);

/* ---------- 模块运行 ---------- */
const aborters = {};
async function runModule(m, buildUser) {
  const st = $(`#${m.toLowerCase()}-status`), btn = $(`#${m.toLowerCase()}-run`), stop = $(`#${m.toLowerCase()}-stop`);
  let user; try { user = buildUser(); } catch (e) { flash(st, e.message); return; }
  if (!settings().key) { flash(st, t('nokey')); switchTab('settings'); return; }
  let system; try { system = await buildSystem(); } catch (e) { st.textContent = e.message === 'TAXONOMY_MISSING' ? t('taxmissing') : t('loadfail') + e.message; return; }
  btn.disabled = true; stop.disabled = false; st.textContent = t('running'); rawMode[m] = false;
  const ac = (aborters[m] = new AbortController());
  let last = '';
  try {
    const text = await callModel({ system, user, signal: ac.signal, onDelta: (s) => { last = s; renderOut(m, s); } });
    setOut(m, text); st.textContent = t('done') + (m === 'A' ? ' · ' + t('a.hint2') : '');
  } catch (e) {
    if (e.name === 'AbortError') { st.textContent = t('stopped'); if (last) setOut(m, last + '\n\n> [stopped]'); }
    else st.textContent = t('err') + e.message;
  } finally { btn.disabled = false; stop.disabled = true; }
}
const H = (title, body) => body && body.trim() ? `\n### ${title}\n${body.trim()}\n` : '';
function hbBlock(use) { const hb = $('#hb').value; return use && hb.trim() ? H(lang === 'zh' ? '个人手册' : 'Personal handbook', hb) : (lang === 'zh' ? '\n### 个人手册\n（未提供）\n' : '\n### Personal handbook\n(not provided)\n'); }

function userA() {
  const jd = $('#a-jd').value, re = $('#a-resume').value;
  if (!jd.trim() || !re.trim()) throw new Error(t('nojd'));
  const meta = [['轮次', $('#a-round').value], ['面试官身份', $('#a-interviewer').value], ['原定时长', $('#a-planned').value && $('#a-planned').value + ' 分钟'], ['自介时长要求', $('#a-intro').value], ['期望薪资', $('#a-salary').value], ['可到岗时间', $('#a-start').value], ['JD 标注的薪资区间', $('#a-jdsalary').value]]
    .filter(([, v]) => v && String(v).trim()).map(([k, v]) => `- ${k}：${v}`).join('\n');
  return (lang === 'zh' ? '运行模块 A（面前预演）。\n\n## 输入' : 'Run Module A (Pre-interview Rehearsal).\n\n## Input') + H(lang === 'zh' ? 'JD 全文' : 'JD full text', jd) + H(lang === 'zh' ? '简历要点' : 'Résumé points', re) + hbBlock($('#a-usehb').checked) + H(lang === 'zh' ? '其他输入' : 'Other inputs', meta || (lang === 'zh' ? '（未提供）' : '(not provided)'));
}
function userB() {
  const notes = $('#b-notes').value; if (!notes.trim()) throw new Error(t('nonotes'));
  const tr = $('#b-transcript').value; const a = $('#b-usea').checked && outputs.A ? outputs.A.md : '';
  return (lang === 'zh' ? '运行模块 B（面后复盘）。\n\n## 输入' : 'Run Module B (Post-interview Review).\n\n## Input') + H(lang === 'zh' ? '面后笔记' : 'Post-interview notes', notes) + (tr.trim() ? H(lang === 'zh' ? '转录' : 'Transcript', tr) : (lang === 'zh' ? '\n### 转录\n（无）\n' : '\n### Transcript\n(none)\n')) + hbBlock($('#b-usehb').checked) + (a ? H(lang === 'zh' ? '模块 A 输出' : 'Module A output', a) : (lang === 'zh' ? '\n### 模块 A 输出\n（无）\n' : '\n### Module A output\n(none)\n'));
}
function userC() {
  const r = $$('input[name=c-result]:checked')[0]; if (!r) throw new Error(t('noc'));
  if (!outputs.B) throw new Error(t('nob'));
  let v = r.value; if (v.includes('N')) v = `走到第 ${$('#c-n').value || 'N'} 轮`;
  const fb = $('#c-feedback').value.trim();
  return (lang === 'zh' ? '运行模块 C（结果回填）。\n\n## 输入' : 'Run Module C (Outcome Backfill).\n\n## Input') + H(lang === 'zh' ? '结果' : 'Result', v + (fb ? `\n面试官反馈：${fb}` : '')) + H(lang === 'zh' ? '模块 B 输出' : 'Module B output', outputs.B.md) + hbBlock($('#c-usehb').checked);
}

/* ---------- 转录 ---------- */
let audioBlob = null, mediaRec = null, recChunks = [];
async function toggleRecord() {
  const btn = $('#t-rec'), st = $('#t-audio-status');
  if (mediaRec && mediaRec.state === 'recording') { mediaRec.stop(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recChunks = []; mediaRec = new MediaRecorder(stream);
    mediaRec.ondataavailable = (e) => { if (e.data.size) recChunks.push(e.data); };
    mediaRec.onstop = () => { stream.getTracks().forEach((x) => x.stop()); setAudio(new Blob(recChunks, { type: mediaRec.mimeType || 'audio/webm' })); btn.textContent = t('rec.start'); };
    mediaRec.start(1000); btn.textContent = t('rec.stop'); st.textContent = t('recording');
  } catch (e) { st.textContent = t('micdenied') + e.message; }
}
function setAudio(blob) { audioBlob = blob; const a = $('#t-audio'); a.src = URL.createObjectURL(blob); a.hidden = false; $('#t-audio-status').textContent = t('audioready') + ` (${Math.round(blob.size / 1024)} KB)`; $('#t-run').disabled = false; }
async function transcribe() {
  const st = $('#t-status'), btn = $('#t-run'); if (!audioBlob) { st.textContent = t('noaudio'); return; }
  btn.disabled = true;
  try {
    let text;
    if ($('#t-mode').value === 'local') {
      st.textContent = t('tload');
      const mod = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3/dist/transformers.min.js');
      const asr = await mod.pipeline('automatic-speech-recognition', $('#t-model').value, { progress_callback: (p) => { if (p.status === 'progress' && p.file) st.textContent = `${t('tload')} ${p.file} ${Math.round(p.progress || 0)}%`; } });
      const ctx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const buf = await ctx.decodeAudioData(await audioBlob.arrayBuffer());
      let pcm = buf.getChannelData(0);
      if (buf.numberOfChannels > 1) { const c1 = buf.getChannelData(1); pcm = pcm.map((v, i) => (v + c1[i]) / 2); }
      st.textContent = t('trun');
      const res = await asr(pcm, { language: lang === 'zh' ? 'chinese' : 'english', task: 'transcribe', chunk_length_s: 30, stride_length_s: 5 });
      text = (res.text || '').trim();
    } else {
      st.textContent = t('trun');
      const url = ($('#t-url').value || 'https://api.openai.com/v1').replace(/\/+$/, ''); const key = $('#t-key').value; const model = $('#t-amodel').value || 'whisper-1';
      LS.set('t.cfg', JSON.stringify({ url, key, model }));
      const fd = new FormData(); fd.append('file', audioBlob, 'audio.webm'); fd.append('model', model); fd.append('language', lang === 'zh' ? 'zh' : 'en');
      const r = await fetch(url + '/audio/transcriptions', { method: 'POST', headers: { authorization: 'Bearer ' + key }, body: fd });
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
      text = ((await r.json()).text || '').trim();
    }
    $('#t-out').value = text; LS.set('t.text', text); st.textContent = t('tdone');
  } catch (e) { st.textContent = t('tfail') + e.message; }
  finally { btn.disabled = false; }
}

/* ---------- Tabs / gate / 事件 ---------- */
function switchTab(name) {
  $$('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === name));
  $$('section.panel').forEach((p) => p.classList.toggle('on', p.id === 'p-' + name));
  LS.set('tab', name);
}
async function ensureTemplates() {
  const f = FILES[lang];
  const strip = (s) => s.replace(/^\s*<!--[\s\S]*?-->\s*/, '');
  if (!$('#hb').value.trim()) { try { $('#hb').value = strip(await loadText(f.hb)); } catch {} }
  if (!$('#b-notes').value.trim()) { try { $('#b-notes').value = strip(await loadText(f.notes)); } catch {} }
}
function usage() { let n = 0; try { for (const k in localStorage) if (k.startsWith('il.')) n += (localStorage.getItem(k) || '').length; } catch {} $('#s-usage').textContent = (lang === 'zh' ? '本地存储占用约 ' : 'Local storage used ≈ ') + Math.round(n / 1024) + ' KB'; }

function init() {
  applyLang();
  // gate
  const gated = LS.get('gate', '') !== '1';
  $('#gate').hidden = !gated; $('#app').hidden = gated;
  $('#gate-ok').onchange = (e) => { $('#gate-go').disabled = !e.target.checked; };
  $('#gate-go').onclick = () => { LS.set('gate', '1'); $('#gate').hidden = true; $('#app').hidden = false; ensureTemplates(); };
  $('#lang').onchange = (e) => { lang = e.target.value; LS.set('lang', lang); applyLang(); usage(); };
  // tabs
  $$('#tabs button').forEach((b) => (b.onclick = () => switchTab(b.dataset.tab)));
  switchTab(LS.get('tab', 'handbook'));
  // handbook
  $('#hb').value = LS.get('hb', '');
  $('#hb').oninput = () => { LS.set('hb', $('#hb').value); flash($('#hb-status'), t('saved')); };
  $('#hb-export').onclick = () => download(`handbook-${stamp()}.md`, $('#hb').value);
  $('#hb-import-btn').onclick = () => $('#hb-file').click();
  $('#hb-file').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; $('#hb').value = await f.text(); LS.set('hb', $('#hb').value); flash($('#hb-status'), t('hb.imported')); e.target.value = ''; };
  $('#hb-reset').onclick = async () => { if (!confirm(t('hb.confirmreset'))) return; $('#hb').value = ''; LS.del('hb'); await ensureTemplates(); LS.set('hb', $('#hb').value); };
  $('#hb-inc-copy').onclick = () => copyText($('#hb-inc').dataset.md || '', $('#hb-status'));
  $('#hb-inc-clear').onclick = () => { $('#hb-inc-card').hidden = true; };
  if (!gated) ensureTemplates();
  // A inputs persistence
  const aFields = ['a-jd', 'a-resume', 'a-round', 'a-interviewer', 'a-planned', 'a-intro', 'a-salary', 'a-start', 'a-jdsalary'];
  const aSaved = LS.json('a.inputs', {}); aFields.forEach((id) => { if (aSaved[id] != null) $('#' + id).value = aSaved[id]; $('#' + id).oninput = () => { const o = {}; aFields.forEach((k) => (o[k] = $('#' + k).value)); LS.set('a.inputs', JSON.stringify(o)); }; });
  $('#b-notes').value = LS.get('b.notes', ''); $('#b-notes').oninput = () => LS.set('b.notes', $('#b-notes').value);
  $('#b-transcript').value = LS.get('b.transcript', ''); $('#b-transcript').oninput = () => LS.set('b.transcript', $('#b-transcript').value);
  // run / stop / copy / download / raw
  $('#a-run').onclick = () => runModule('A', userA); $('#b-run').onclick = () => runModule('B', userB); $('#c-run').onclick = () => runModule('C', userC);
  for (const m of ['A', 'B', 'C']) {
    const id = m.toLowerCase();
    $(`#${id}-stop`).onclick = () => aborters[m]?.abort();
    $(`#${id}-copy`).onclick = () => outputs[m] && copyText(outputs[m].md, $(`#${id}-status`));
    $(`#${id}-download`).onclick = () => outputs[m] && download(`module-${m}-${stamp()}.md`, outputs[m].md);
    $(`#${id}-raw`).onclick = () => { rawMode[m] = !rawMode[m]; renderOut(m, outputs[m]?.md); };
    renderOut(m, outputs[m]?.md);
  }
  showIncrements();
  // transcribe
  $('#t-rec').onclick = toggleRecord;
  $('#t-file-btn').onclick = () => $('#t-file').click();
  $('#t-file').onchange = (e) => { const f = e.target.files[0]; if (f) setAudio(f); };
  $('#t-mode').onchange = (e) => { $('#t-local-opts').hidden = e.target.value !== 'local'; $('#t-byok-opts').hidden = e.target.value !== 'byok'; };
  $('#t-run').onclick = transcribe;
  $('#t-out').value = LS.get('t.text', ''); $('#t-out').oninput = () => LS.set('t.text', $('#t-out').value);
  $('#t-toB').onclick = () => { $('#b-transcript').value = $('#t-out').value; LS.set('b.transcript', $('#t-out').value); flash($('#t-status'), t('tsent')); };
  $('#t-download').onclick = () => download(`transcript-${stamp()}.md`, $('#t-out').value);
  const tc = LS.json('t.cfg', {}); if (tc.url) $('#t-url').value = tc.url; if (tc.key) $('#t-key').value = tc.key; if (tc.model) $('#t-amodel').value = tc.model;
  // settings
  const s = settings();
  $('#s-provider').value = s.provider; $('#s-model').value = s.model; $('#s-url').value = s.url; $('#s-omodel').value = s.omodel; $('#s-key').value = s.key; $('#s-effort').value = s.effort; $('#s-fallback').checked = !!s.fallback;
  const syncProv = () => { const p = $('#s-provider').value; $('#s-anthropic-opts').hidden = p !== 'anthropic'; $('#s-anthropic-more').hidden = p !== 'anthropic'; $('#s-openai-opts').hidden = p !== 'openai'; };
  syncProv();
  const persist = () => { saveSettings({ provider: $('#s-provider').value, model: $('#s-model').value, url: $('#s-url').value, omodel: $('#s-omodel').value, key: $('#s-key').value.trim(), effort: $('#s-effort').value, fallback: $('#s-fallback').checked }); syncProv(); flash($('#s-status'), t('saved')); usage(); };
  ['s-provider', 's-model', 's-url', 's-omodel', 's-key', 's-effort', 's-fallback'].forEach((id) => { $('#' + id).onchange = persist; $('#' + id).oninput = persist; });
  $('#s-test').onclick = async () => { const st = $('#s-status'); st.textContent = t('testing'); try { const r = await callModel({ system: 'Reply with the single word OK.', user: 'ping', onDelta: () => {}, maxTokens: 64 }); st.textContent = t('testok') + r.trim().slice(0, 40); } catch (e) { st.textContent = t('err') + e.message; } };
  $('#s-export-all').onclick = () => download(`interviewloop-export-${stamp()}.md`, ['# InterviewLoop export ' + stamp(), '', '## handbook.md', '', $('#hb').value, ...['A', 'B', 'C'].flatMap((m) => outputs[m] ? ['', `## Module ${m} · ${new Date(outputs[m].ts).toISOString()}`, '', outputs[m].md] : [])].join('\n'));
  $('#s-wipe').onclick = () => { if (!confirm(t('wipeconfirm'))) return; try { Object.keys(localStorage).filter((k) => k.startsWith('il.')).forEach((k) => localStorage.removeItem(k)); } catch {} alert(t('wiped')); location.reload(); };
  usage();
  // PWA
  let deferred = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; $('#btn-install').hidden = false; });
  $('#btn-install').onclick = async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $('#btn-install').hidden = true; };
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
document.addEventListener('DOMContentLoaded', init);
})();
