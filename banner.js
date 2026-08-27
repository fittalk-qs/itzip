(function () {
  // 메인홈 아코디언 띠 배너 — 동작.
  //
  // 이 파일은 사람이 고치는 원본입니다. 큐샵에 직접 올리는 파일이 아닙니다.
  // 「핏톡의 마법도구 > 슬라이드 배너 메이커」가 이 파일과 banner.css 를 통째로 안에 넣고,
  // 현장 내용(ITZIP_BANNER_DATA)까지 얹어 완성본 한 장을 만들어 줍니다. 팀원은 그것을
  // 큐샵 코드 블록에 붙여넣습니다.
  //
  // 왜 통째로 넣나: 큐샵 코드 블록이 외부 <script src> 를 막습니다 (2026-08-26 확인).
  // 그래서 "코드는 깃허브, 내용만 붙여넣기" 는 못 합니다. 대신 사람이 손대는 자리를
  // 메이커 폼 하나로 좁히는 것으로 같은 목적을 이룹니다.
  //
  // 고치는 순서: 이 파일(또는 banner.css) 수정 → 깃허브에 올림 → 메이커에서 현장 내용을
  // 다시 불러와 코드를 새로 뽑아 큐샵에 붙여넣기.

  // 아래 JSON_URL 은 이 파일을 밖에서 <script src> 로 불러다 쓰는 경우에만 씁니다
  // (메이커 미리보기). 큐샵에 붙여넣은 완성본은 내용을 이미 품고 있어 여기까지 안 옵니다.
  var HERE = (function () {
    try {
      var s = document.currentScript && document.currentScript.src;
      if (s) return s.replace(/[?#].*$/, '').replace(/[^/]*$/, '');
    } catch (e) {}
    return 'https://fittalk-qs.github.io/itzip/';
  })();
  var JSON_URL = HERE + 'banner.json';
  var CACHE_KEY = 'itzipBanner';

  if (window.itzipBannerUp) return;   // 공통푸터처럼 두 벌 실행되는 자리를 대비
  window.itzipBannerUp = 1;

  // ── 아이콘 ──────────────────────────────────────────────────────────
  // 메이커의 아이콘 고르기 목록과 이 이름들이 짝입니다. 여기에 하나 더 넣으면 메이커에도
  // 같은 이름으로 넣어야 목록에 뜹니다. 없는 이름을 적으면 아이콘 없이 글자만 나옵니다.
  var ICONS = {
    sofa:  '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M6 18.5V20M18 18.5V20"/>',
    bulb:  '<path d="M12 3a6 6 0 0 0-3.9 10.6c.6.5.9 1.2.9 2V16h6v-.4c0-.8.3-1.5.9-2A6 6 0 0 0 12 3z"/><path d="M10 19h4"/><path d="M11 21.5h2"/>',
    train: '<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M3 10.5h18"/><path d="M7 13.5h.01M17 13.5h.01"/><path d="M6 16v2M18 16v2"/>',
    book:  '<path d="M2 4.5h6a4 4 0 0 1 4 4V20a3 3 0 0 0-3-3H2z"/><path d="M22 4.5h-6a4 4 0 0 0-4 4V20a3 3 0 0 1 3-3h7z"/>',
    tree:  '<path d="M12 3 6.5 12h3L5 18h14l-4.5-6h3z"/><path d="M12 18v3"/>',
    home:  '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
    shop:  '<path d="M3.5 4.5h17l-1 4.2a3 3 0 0 1-5.8.3 3 3 0 0 1-5.4 0 3 3 0 0 1-5.8-.3z"/><path d="M5 11.5V20h14v-8.5"/><path d="M10 20v-5h4v5"/>',
    car:   '<path d="M5 12.5 6.6 8a2 2 0 0 1 1.9-1.4h7a2 2 0 0 1 1.9 1.4L19 12.5"/><path d="M4 12.5h16a1 1 0 0 1 1 1V17H3v-3.5a1 1 0 0 1 1-1z"/><path d="M6.5 15h.01M17.5 15h.01"/><path d="M6 17v1.5M18 17v1.5"/>',
    map:   '<path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5z"/><path d="M9 4v13M15 6.5v13"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
    won:   '<circle cx="12" cy="12" r="8.5"/><path d="M8 9.5l1.7 5 2.3-4 2.3 4 1.7-5"/><path d="M7 12h10"/>',
    star:  '<path d="m12 3.8 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8z"/>'
  };

  // ── 글자 다루기 ─────────────────────────────────────────────────────
  // json 은 우리가 만든 것이지만, 사람이 쓴 글이 그대로 들어옵니다. 꺾쇠 하나 잘못 들어가
  // 배너가 통째로 깨지는 일이 없도록 무조건 escape 하고, 줄바꿈만 <br> 로 살립니다.
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function nl(s) { return esc(s).replace(/\r?\n/g, '<br>'); }
  function arr(v) { return Object.prototype.toString.call(v) === '[object Array]' ? v : []; }
  function no(i) { return (i + 1 < 10 ? '0' : '') + (i + 1); }

  // ── 만들기 ──────────────────────────────────────────────────────────
  function render(data, root) {
    root = root || document.getElementById('itzip-banner') || document.querySelector('.acb');
    if (!root) return;
    var panels = arr(data && data.panels).slice(0, 8);
    if (!panels.length) { root.innerHTML = ''; return; }

    var site = data.site || '';
    var link = data.link || '';
    var ctaText = data.cta || '더 보기';
    // 처음 펼쳐 둘 패널. 라이브는 늘 첫 장이고, 메이커 미리보기만 지금 고치는 패널을
    // 열어 두려고 이 값을 씁니다.
    var open = Math.min(Math.max(data.open | 0, 0), panels.length - 1);

    root.className = 'acb';
    root.style.setProperty('--pn-n', panels.length);
    if (data.stripWidth) root.style.setProperty('--stripw', data.stripWidth + 'px');

    var html = '';
    panels.forEach(function (p, i) {
      var body = '';
      if (site || p.eyebrow) body += '<div class="eyebrow">' + esc(p.eyebrow || site) + '</div>';
      if (p.title) body += '<h2 class="pn-title">' + nl(p.title) + '</h2>';
      if (p.sub) body += '<p class="pn-sub">' + nl(p.sub) + '</p>';

      var feats = arr(p.feats).filter(function (f) { return f && f.text; });
      if (feats.length) {
        body += '<ul class="feat">' + feats.map(function (f) {
          var g = ICONS[f.icon];
          return '<li>' + (g
            ? '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + g + '</svg></span>'
            : '') + '<span>' + nl(f.text) + '</span></li>';
        }).join('') + '</ul>';
      }

      // 평면: 첫 장이 골라진 상태로 섭니다. 설명줄은 하나라도 적혀 있을 때만 자리를 만듭니다.
      var plans = arr(p.plans).filter(function (t) { return t && t.name; });
      if (plans.length) {
        var hasDesc = plans.some(function (t) { return t.desc; });
        body += '<div class="plan-size">' + esc(plans[0].name) + '</div>';
        if (hasDesc) body += '<p class="pn-sub plan-desc">' + nl(plans[0].desc || '') + '</p>';
        body += '<div class="plan-thumbs">' + plans.map(function (t, k) {
          return '<div class="t' + (k ? '' : ' sel') + '"' +
            ' data-size="' + esc(t.name) + '"' +
            ' data-desc="' + esc(t.desc || '') + '"' +
            ' data-img="' + esc(t.img || '') + '"' +
            '><div class="box' + (t.thumb ? ' has-img' : '') + '"' +
            (t.thumb ? ' style="background-image:url(' + esc(t.thumb) + ')"' : '') + '></div>' +
            esc(t.name) + '</div>';
        }).join('') + '</div>';
      }

      var chips = arr(p.chips).filter(function (c) { return c; });
      if (chips.length) {
        body += '<div class="chips">' + chips.map(function (c) {
          return '<span>' + esc(c) + '</span>';
        }).join('') + '</div>';
      }

      // 배너가 iframe(코드위젯) 안에 있어서 target="_top" 이 없으면 배너 안에서 페이지가 열립니다.
      var href = p.link || link;
      if (href) body += '<a class="cta" href="' + esc(href) + '" target="_top">' + esc(p.cta || ctaText) +
        ' <span>&rarr;</span></a>';

      html += '<section class="pn' + (i === open ? ' on' : '') + '" data-i="' + i + '">' +
        '<div class="pn-bg"' + (p.bg ? ' style="background-image:url(' + esc(p.bg) + ')"' : '') + '></div>' +
        '<div class="pn-main"><div class="pn-scrim"></div><div class="pn-body">' + body + '</div></div>' +
        '<button class="pn-strip" aria-label="' + esc(p.label || p.title || '') + ' 열기">' +
        '<span class="no">' + no(i) + '</span>' +
        '<span class="lb">' + esc(p.label || '') + '</span>' +
        '<span class="more">' + esc(ctaText) + '</span><span class="ar">&rarr;</span></button>' +
        '</section>';
    });

    root.innerHTML = html;
    wire(root, data);
  }

  // ── 움직이기 ────────────────────────────────────────────────────────
  function wire(root, data) {
    var pns = [].slice.call(root.querySelectorAll('.pn'));
    var cur = Math.max(0, pns.indexOf(root.querySelector('.pn.on')));
    var timer = null, hovering = false;
    var DUR = typeof data.duration === 'number' ? data.duration : 5000;
    var reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;

    function go(i) { cur = i; pns.forEach(function (p, k) { p.classList.toggle('on', k === i); }); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    // 타이머 재장전: 마지막으로 만진 시점부터 다시 셉니다. 마우스가 배너 위에 있는 동안,
    // 그리고 DUR 이 0 이면 아예 돌지 않습니다.
    function arm() { stop(); if (reduced || hovering || !DUR) return; timer = setInterval(function () { go((cur + 1) % pns.length); }, DUR); }

    pns.forEach(function (p, i) {
      p.querySelector('.pn-strip').addEventListener('click', function () { go(i); arm(); });
    });
    root.addEventListener('mouseenter', function () { hovering = true; stop(); });
    root.addEventListener('mouseleave', function () { hovering = false; arm(); });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : arm(); });
    arm();

    // 평면 썸네일: 고르면 표기·설명이 바뀌고 배경이 서서히 넘어갑니다.
    var plan = root.querySelector('.plan-thumbs');
    if (plan) {
      var panel = plan.closest ? plan.closest('.pn') : plan.parentNode.parentNode.parentNode;
      var thumbs = [].slice.call(plan.querySelectorAll('.t'));
      var sizeEl = panel.querySelector('.plan-size');
      var descEl = panel.querySelector('.plan-desc');
      var fading = null;

      function swap(el, html) {
        if (!el) return;
        if (html != null) el.innerHTML = html;
        el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap');
      }
      function crossfade(url) {
        var bg = panel.querySelector('.pn-bg');
        if (fading && fading.parentNode) fading.parentNode.removeChild(fading);
        var f = document.createElement('div');
        f.className = 'pn-bgfade';
        f.style.backgroundImage = 'url(' + url + ')';
        bg.parentNode.insertBefore(f, bg.nextSibling);
        fading = f;
        requestAnimationFrame(function () { requestAnimationFrame(function () { f.classList.add('show'); }); });
        setTimeout(function () {
          bg.style.backgroundImage = 'url(' + url + ')';
          if (f.parentNode) f.parentNode.removeChild(f);
          if (fading === f) fading = null;
        }, 560);
      }

      thumbs.forEach(function (t) {
        t.addEventListener('click', function () {
          thumbs.forEach(function (x) { x.classList.toggle('sel', x === t); });
          if (sizeEl) { sizeEl.textContent = t.getAttribute('data-size') || ''; swap(sizeEl, null); }
          var d = t.getAttribute('data-desc');
          if (descEl) swap(descEl, nl(d || ''));
          var img = t.getAttribute('data-img');
          if (img) crossfade(img);
          arm();   // 썸네일을 눌러도 자동전환 시간을 다시 셉니다
        });
      });
    }

    fit(root);
  }

  // ── 코드위젯 높이 맞추기 ─────────────────────────────────────────────
  // 큐샵이 잡아 둔 블록 높이가 배너보다 크면 아래에 빈 여백이 남습니다. 공통푸터 autofit 과
  // 같은 원리로 iframe 높이를 실제 배너 높이에 맞춥니다.
  function fit(root) {
    function once() {
      var h = Math.ceil(root.getBoundingClientRect().height);
      if (!h) return;
      try {
        var f = window.frameElement;
        if (f) { f.style.height = h + 'px'; f.style.minHeight = '0'; f.setAttribute('scrolling', 'no'); }
      } catch (e) {}
      try { if (parent && parent !== window) parent.postMessage({ type: 'ftEmbedHeight', height: h }, '*'); } catch (e) {}
    }
    if (!fit.bound) {
      fit.bound = 1;
      window.addEventListener('resize', once);
      window.addEventListener('load', once);
    }
    [0, 200, 800, 2000].forEach(function (t) { setTimeout(once, t); });
  }

  // ── 받아오기 ────────────────────────────────────────────────────────
  // 주소 뒤 v= 는 5분 단위로만 바뀝니다. 5분 안에는 CDN 캐시를 그대로 쓰고, 5분이 지나면
  // 주소가 달라져 갱신된 파일을 확실히 받습니다. (유튜브 목록 위젯과 같은 방식)
  function load() {
    var bust = Math.floor(Date.now() / 300000);
    return fetch(JSON_URL + '?v=' + bust).then(function (r) {
      if (!r.ok) throw new Error('banner.json ' + r.status);
      return r.json();
    });
  }
  function readCache() { try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) { return null; } }
  function writeCache(d) { try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch (e) {} }

  function boot() {
    load().then(function (d) { render(d); writeCache(d); }).catch(function (e) {
      // 깃허브 장애나 네트워크 오류. 마지막으로 잘 받았던 내용으로 버팁니다. 그것도 없으면
      // 빈 상자를 보이느니 아무것도 안 그립니다.
      console.warn('[itzip-banner] banner.json 을 못 읽어 백업 사용:', e);
      var c = readCache();
      if (c) render(c);
    });
  }

  // 메이커의 미리보기는 fetch 대신 직접 데이터를 밀어 넣습니다.
  window.itzipBanner = { render: render };

  function start() {
    // 큐샵에 붙여넣은 코드에는 내용(ITZIP_BANNER_DATA)이 같이 들어 있습니다.
    // 그럴 때는 아무것도 받아오지 않고 바로 그립니다. 큐샵 코드블록이 외부 스크립트를
    // 막기 때문에 실제 라이브는 늘 이 길로 갑니다. 아래 boot() 은 이 파일을 밖에서
    // 불러다 쓰는 곳(메이커 미리보기 등)을 위해 남겨 둡니다.
    if (window.ITZIP_BANNER_DATA) { render(window.ITZIP_BANNER_DATA); return; }
    boot();
  }
  if (!window.ITZIP_BANNER_MANUAL) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
  }
})();
