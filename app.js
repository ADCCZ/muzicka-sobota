/* Múzička – prezentace písní
 *  index.html                 → pohled pro notebook (s akordy, náhled dalšího slajdu, program)
 *  index.html?view=projektor  → čistý pohled pro projektor (bez akordů)
 * Obě okna se synchronizují přes BroadcastChannel (musí běžet ve stejném prohlížeči).
 */
(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const HASH_PROJ = /^#projektor$/i.test(location.hash);
  const VIEW = HASH_PROJ || /^(projektor|projector|beamer)$/i.test(params.get("view") || "") ? "projector" : "presenter";
  const CHANNEL = "muzicka-sobota-v1";
  const STORE = "muzicka-sobota-state";

  /* ---------- Slajdy z PROGRAMu ---------- */
  const slides = [{ kind: "title" }];
  const setlist = [{ label: "Titulní strana", start: 0, kind: "title" }];
  let songNo = 0;
  for (const item of PROGRAM) {
    if (item.type === "section") {
      setlist.push({ label: item.title, start: slides.length, kind: "section" });
      slides.push({ kind: "section", title: item.title });
    } else {
      songNo++;
      setlist.push({ label: item.title, sub: item.author, start: slides.length, kind: "song", song: item });
      const songStart = slides.length;
      slides.push({ kind: "song", song: item, songStart });
      item.order.forEach((key, i) => {
        const part = item.parts[key];
        if (!part) throw new Error(`Píseň „${item.title}“: chybí část ${key}`);
        const chunks = splitChunks(part.lines);
        const reps = part.repeat || 1;
        for (let r = 0; r < reps; r++) chunks.forEach((lines, ci) => {
          let label = part.label;
          if (chunks.length > 1) label += ` (${ci + 1}/${chunks.length})`;
          if (reps > 1) label += ` · ${r + 1}×`;
          slides.push({ kind: "lyrics", song: item, key, part, lines, label, step: i, songStart });
        });
      });
    }
  }
  slides.push({ kind: "end" });
  setlist.push({ label: "Konec", start: slides.length - 1, kind: "end" });

  /* Rozdělení části na slajdy: "---" = ruční zlom, jinak max. 4 řádky (rovnoměrně). */
  function splitChunks(lines) {
    const groups = [[]];
    for (const l of lines) { if (l.trim() === "---") groups.push([]); else groups[groups.length - 1].push(l); }
    const out = [];
    for (const g of groups.filter(g => g.length)) {
      const n = Math.ceil(g.length / 4), size = Math.ceil(g.length / n);
      for (let i = 0; i < g.length; i += size) out.push(g.slice(i, i + size));
    }
    return out;
  }

  /* ---------- Parsování řádku s akordy ---------- */
  function parseLine(raw) {
    let s = raw.trim(), repStart = false, repEnd = false;
    if (s.startsWith("|:")) { repStart = true; s = s.slice(2).trim(); }
    if (s.endsWith(":|")) { repEnd = true; s = s.slice(0, -2).trim(); }
    const segs = []; const re = /\[([^\]]+)\]/g;
    let last = 0, chord = "", m;
    while ((m = re.exec(s))) { segs.push({ ch: chord, tx: s.slice(last, m.index) }); chord = m[1]; last = re.lastIndex; }
    segs.push({ ch: chord, tx: s.slice(last) });
    const clean = segs.filter((g, i) => !(i === 0 && !g.ch && !g.tx));
    const plain = clean.map(g => g.tx).join("").replace(/\s+/g, " ").trim();
    return { segs: clean, plain, repStart, repEnd };
  }

  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const img = (src, cls) => { const i = el("img", cls); i.src = src; i.alt = ""; i.draggable = false; i.decoding = "async"; return i; };

  function lyricsBlock(lines, withChords) {
    const box = el("div", "lyrics" + (withChords ? " chords" : ""));
    for (const raw of lines) {
      const L = parseLine(raw);
      const line = el("div", "line");
      if (!withChords) {
        line.append(L.plain);
        if (L.repEnd) line.append(el("span", "rep", "2×"));
      } else {
        if (L.repStart) line.append(segNode("", "|: ", true));
        for (const g of L.segs) line.append(segNode(g.ch, g.tx));
        if (L.repEnd) line.append(segNode("", " :|", true));
      }
      box.append(line);
    }
    return box;
  }
  function segNode(ch, tx, mark) {
    const s = el("span", "seg");
    s.append(el("span", "ch", ch || " "));
    const t = el("span", "tx" + (mark ? " mark" : ""), tx || " ");
    s.append(t);
    return s;
  }

  /* ---------- Vykreslení jednoho slajdu ---------- */
  function renderSlide(stage, slide, opt) {
    const c = el("div", "content");
    stage.className = "stage s-" + slide.kind;
    const figura = () => img("assets/figura.webp", "figura");
    const logo = (cls = "logo") => img("assets/muzicka-logo.png", cls);

    if (slide.kind === "title") {
      const w = el("div", "wrap");
      w.append(logo(), el("div", "sub blk", "sobotní večerní program"));
      c.append(figura(), w);
    } else if (slide.kind === "section") {
      const w = el("div", "wrap");
      w.append(logo(), el("div", "big blk", slide.title));
      c.append(figura(), w);
    } else if (slide.kind === "song") {
      const w = el("div", "wrap");
      w.append(el("div", "big blk", slide.song.title), el("div", "author", slide.song.author));
      c.append(figura(), w);
    } else if (slide.kind === "end") {
      const w = el("div", "wrap"); w.append(logo()); c.append(figura(), w);
    } else if (slide.kind === "lyrics") {
      const head = el("div", "head");
      head.append(el("span", "blk", slide.song.title), el("span", "lab" + (opt.chords ? "" : " hide"), slide.label));
      const box = el("div", "box");
      box.append(lyricsBlock(slide.lines, opt.chords));
      c.append(head, box, logo("mini-logo"));
    }
    c.append(el("div", "blackout"));
    stage.replaceChildren(c);
    fit(stage);
  }

  /* Text písně se automaticky zvětší/zmenší, aby se vešel bez zalamování. */
  function fit(stage) {
    const box = stage.querySelector(".box"), ly = stage.querySelector(".lyrics");
    if (!box || !ly) return;
    const H = stage.clientHeight, W = stage.clientWidth;
    if (!H || !W) return;
    const maxPx = Math.min(H * 0.11, W * 0.07);
    const fits = () => ly.scrollWidth <= box.clientWidth + 0.5 && ly.offsetHeight <= box.clientHeight + 0.5;
    let lo = 6, hi = maxPx;
    ly.style.fontSize = hi + "px";
    if (fits()) return;
    for (let i = 0; i < 14; i++) {
      const mid = (lo + hi) / 2;
      ly.style.fontSize = mid + "px";
      if (fits()) lo = mid; else hi = mid;
    }
    ly.style.fontSize = lo + "px";
  }

  /* ---------- Stav + synchronizace oken ---------- */
  let state = { index: 0, black: false };
  try { const s = JSON.parse(localStorage.getItem(STORE) || "null"); if (s && Number.isInteger(s.index)) state = s; } catch (_) {}
  const hashIdx = parseInt(location.hash.slice(1), 10);
  if (Number.isInteger(hashIdx) && hashIdx >= 1) state.index = hashIdx - 1;
  state.index = Math.max(0, Math.min(slides.length - 1, state.index));

  let bc = null;
  try { bc = new BroadcastChannel(CHANNEL); } catch (_) {}
  const send = msg => { try { bc && bc.postMessage(msg); } catch (_) {} };
  const persist = () => {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (_) {}
    if (!HASH_PROJ) try { history.replaceState(null, "", location.pathname + location.search + "#" + (state.index + 1)); } catch (_) {}
  };

  function setState(patch, broadcast = true) {
    const next = { ...state, ...patch };
    next.index = Math.max(0, Math.min(slides.length - 1, next.index));
    const changed = next.index !== state.index || next.black !== state.black;
    state = next;
    if (broadcast) send({ t: "state", state });
    persist();
    if (changed || !broadcast) update();
  }
  if (bc) bc.onmessage = e => {
    const m = e.data || {};
    if (m.t === "state") setState(m.state, false);
    else if (m.t === "hello" && VIEW === "presenter") send({ t: "state", state });
  };

  const go = d => setState({ index: state.index + d, black: false });

  /* ---------- Klávesy (fungují i prezentační klikátka) ---------- */
  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter", "n", "N"].includes(k)) { e.preventDefault(); go(1); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); go(-1); }
    else if (k === "Home") setState({ index: 0 });
    else if (k === "End") setState({ index: slides.length - 1 });
    else if (k === "b" || k === "B" || k === "." || k === "w" || k === "W") setState({ black: !state.black });
    else if (k === "f" || k === "F" || k === "F5") { e.preventDefault(); toggleFullscreen(); }
    else if ((k === "c" || k === "C") && VIEW === "presenter") toggleChords();
    else if ((k === "p" || k === "P") && VIEW === "presenter") openProjector();
  });
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }

  const app = document.getElementById("app");
  let update = () => {};

  /* ================= PROJEKTOR ================= */
  if (VIEW === "projector") {
    document.body.className = "projector";
    document.title = "Múzička – projektor";
    const stage = el("div", "stage");
    const hint = el("div", "hint", "F nebo dvojklik = celá obrazovka · ← → listování · B = černá obrazovka");
    app.append(stage, hint);
    setTimeout(() => hint.classList.add("off"), 5000);
    stage.addEventListener("dblclick", toggleFullscreen);
    let idleT; const wake = () => { document.body.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add("idle"), 2000); };
    document.addEventListener("mousemove", wake); wake();

    let shown = -1;
    update = () => {
      if (shown !== state.index) { renderSlide(stage, slides[state.index], { chords: false }); shown = state.index; }
      stage.classList.toggle("is-black", !!state.black);
    };
    new ResizeObserver(() => fit(stage)).observe(stage);
    send({ t: "hello" });
  }

  /* ================= PREZENTÉR (notebook) ================= */
  let chordsOn = true;
  let toggleChords = () => {}, openProjector = () => {};

  if (VIEW === "presenter") {
    document.body.className = "presenter";
    try { chordsOn = localStorage.getItem(STORE + "-chords") !== "0"; } catch (_) {}

    const grid = el("div", "p-grid");
    const top = el("div", "p-top");
    const brand = el("span", "brand", "múzička");
    const count = el("span", "count");
    const bPrev = el("button", "btn", "◀ Zpět");
    const bNext = el("button", "btn", "Další ▶");
    const bChords = el("button", "btn"); bChords.innerHTML = "Akordy<kbd>C</kbd>";
    const bBlack = el("button", "btn"); bBlack.innerHTML = "Černá<kbd>B</kbd>";
    const bProj = el("button", "btn"); bProj.innerHTML = "Otevřít projektor ↗<kbd>P</kbd>";
    const bFull = el("button", "btn"); bFull.innerHTML = "Celá obr.<kbd>F</kbd>";
    const clock = el("span", "clock");
    const note = el("span", "count"); note.hidden = true; note.style.cssText = "color:var(--pink);flex-basis:100%;order:9";
    top.append(brand, count, bPrev, bNext, bChords, bBlack, bProj, bFull, clock, note);

    const main = el("div", "p-main"); const stage = el("div", "stage"); main.append(stage);
    const parts = el("div", "p-parts");
    const side = el("div", "p-side");
    const nextWrap = el("div", "p-next"); const nextStage = el("div", "stage");
    nextWrap.append(el("h3", null, "Další slajd (projektor)"), nextStage);
    const listWrap = el("div"); listWrap.style.cssText = "display:flex;flex-direction:column;min-height:0;flex:1";
    const list = el("div", "p-list");
    listWrap.append(el("h3", null, "Program"), list);
    side.append(nextWrap, listWrap);
    grid.append(top, main, side, parts);
    app.append(grid);

    const listBtns = setlist.map(s => {
      const b = el("button", s.kind === "section" ? "sec" : "");
      b.append(s.label); if (s.sub) b.append(el("small", null, s.sub));
      b.onclick = () => setState({ index: s.start, black: false });
      list.append(b); return b;
    });

    bPrev.onclick = () => go(-1);
    bNext.onclick = () => go(1);
    bBlack.onclick = () => setState({ black: !state.black });
    bFull.onclick = toggleFullscreen;
    toggleChords = () => {
      chordsOn = !chordsOn;
      try { localStorage.setItem(STORE + "-chords", chordsOn ? "1" : "0"); } catch (_) {}
      shown = -1; update();
    };
    bChords.onclick = toggleChords;
    openProjector = () => {
      const url = location.pathname + "?view=projektor#" + (state.index + 1);
      let w = null;
      try { w = window.open(url, "muzicka-projektor", "popup,width=1280,height=720"); } catch (_) {}
      if (!w) {
        note.textContent = "Nové okno se nepodařilo otevřít – otevři ručně: " + location.origin + url;
        note.hidden = false; setTimeout(() => (note.hidden = true), 12000);
      }
    };
    bProj.onclick = openProjector;

    const tick = () => { const d = new Date(); clock.textContent = d.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }); };
    tick(); setInterval(tick, 10000);

    let shown = -1;
    update = () => {
      const s = slides[state.index];
      if (shown !== state.index) {
        renderSlide(stage, s, { chords: chordsOn });
        const n = slides[state.index + 1];
        if (n) renderSlide(nextStage, n, { chords: false });
        else { nextStage.className = "stage"; nextStage.replaceChildren(); }
        shown = state.index;

        // program
        let cur = 0; setlist.forEach((it, i) => { if (it.start <= state.index) cur = i; });
        listBtns.forEach((b, i) => b.classList.toggle("cur", i === cur));
        listBtns[cur].scrollIntoView({ block: "nearest" });

        // struktura aktuální písně
        parts.replaceChildren();
        if (s.kind === "song" || s.kind === "lyrics") {
          const song = s.song;
          parts.append(el("span", "lbl", "Struktura:"));
          const titleB = el("button", "btn" + (s.kind === "song" ? " on" : ""), "Název");
          titleB.onclick = () => setState({ index: s.songStart, black: false });
          parts.append(titleB);
          song.order.forEach((key, i) => {
            const b = el("button", "btn" + (s.kind === "lyrics" && s.step === i ? " on" : ""), song.parts[key].label);
            const st = slides.findIndex(x => x.kind === "lyrics" && x.song === song && x.step === i);
            b.onclick = () => setState({ index: st, black: false });
            parts.append(b);
          });
          parts.append(el("span", "src", song.source));
        }
      }
      count.textContent = `${state.index + 1} / ${slides.length}`;
      bChords.classList.toggle("on", chordsOn);
      bBlack.classList.toggle("on", !!state.black);
      stage.classList.toggle("is-black", !!state.black);
    };
    new ResizeObserver(() => fit(stage)).observe(stage);
    new ResizeObserver(() => fit(nextStage)).observe(nextStage);
  }

  /* Vykreslit až po načtení písem, ať sedí velikosti textu. */
  const start = () => { update(); persist(); };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => {
    // písma se načítají líně – vynutit všechny řezy, které používáme
    const loads = ["400 1em Blaka", "500 1em Grenze", "700 1em Grenze"].map(f => document.fonts.load(f, "ěščřžýáíéůú"));
    return Promise.all(loads).catch(() => {});
  }).then(start);
})();
