/* ==========================================================================
   AgentRoom Starfield  ·  v0.1  ·  keine Abhängigkeiten
   ---------------------------------------------------------------------------
   const sky = AgentRoomStarfield.mount(canvas, {
     density: 1,          // Sterne pro 10.000 px² (Standard 1)
     layers: 3,           // Parallax-Ebenen
     shootingStars: true, // Sternschnuppen
     constellation: true, // Linien zwischen nahen hellen Sternen ("Agenten-Netz")
     mouseParallax: true,
     speed: 1,            // Drift-Geschwindigkeit
   });
   sky.warp(1200);        // Warp-Effekt (z. B. beim Betreten eines Raums)
   sky.burst(x, y);       // Sternenexplosion (z. B. Task erledigt)
   sky.refreshColors();   // nach Theme-Wechsel
   sky.destroy();
   Farben kommen aus den CSS-Variablen --ar-star-color / --ar-star-tint.
   ========================================================================== */
(function (global) {
  "use strict";

  const reduceMotion = () =>
    global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readRGB(el, name, fallback) {
    const v = getComputedStyle(el).getPropertyValue(name).trim();
    return v || fallback;
  }

  function mount(canvas, opts) {
    const o = Object.assign(
      { density: 1, layers: 3, shootingStars: true, constellation: true, mouseParallax: true, speed: 1 },
      opts || {}
    );
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1, stars = [], shooting = [], particles = [];
    let raf = 0, last = performance.now(), t = 0;
    let mx = 0, my = 0, pmx = 0, pmy = 0;
    let warpUntil = 0, warpStart = 0;
    let starRGB = "242,240,255", tintRGB = "124,92,255";

    function refreshColors() {
      const root = document.documentElement;
      starRGB = readRGB(root, "--ar-star-color", starRGB).replace(/\s/g, "");
      tintRGB = readRGB(root, "--ar-star-tint", tintRGB).replace(/\s/g, "");
    }

    function resize() {
      dpr = Math.min(global.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = Math.round(((w * h) / 10000) * o.density * 1.4);
      stars = [];
      for (let i = 0; i < count; i++) {
        const layer = Math.floor(Math.random() * o.layers); // 0 = fern
        const depth = (layer + 1) / o.layers;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.3 + Math.random() * 0.9 * depth + (Math.random() < 0.03 ? 0.9 : 0),
          depth,
          tw: Math.random() * Math.PI * 2,          // Twinkle-Phase
          twSpeed: 0.6 + Math.random() * 1.8,
          tinted: Math.random() < 0.12,            // farbige Sterne
        });
      }
    }

    function spawnShootingStar() {
      const fromLeft = Math.random() < 0.5;
      const angle = (fromLeft ? 0.25 : Math.PI - 0.25) + (Math.random() - 0.5) * 0.3;
      const speed = 700 + Math.random() * 500;
      shooting.push({
        x: fromLeft ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
        y: Math.random() * h * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 0.7 + Math.random() * 0.5,
        len: 80 + Math.random() * 90,
      });
    }

    function burst(x, y, n) {
      n = n || 36;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.2;
        const s = 60 + Math.random() * 220;
        particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 0.6 + Math.random() * 0.7, tinted: Math.random() < 0.5 });
      }
      if (reduceMotion()) frame(performance.now());
    }

    function warp(ms) {
      warpStart = performance.now();
      warpUntil = warpStart + (ms || 1200);
    }

    function warpAmount(now) {
      if (now > warpUntil) return 0;
      const p = (now - warpStart) / (warpUntil - warpStart);
      return Math.sin(p * Math.PI); // 0 → 1 → 0
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now; t += dt;
      const still = reduceMotion();
      const wa = still ? 0 : warpAmount(now);

      ctx.clearRect(0, 0, w, h);
      pmx += (mx - pmx) * 0.05;
      pmy += (my - pmy) * 0.05;
      const cx = w / 2, cy = h / 2;

      // --- Sterne
      for (const s of stars) {
        if (!still) {
          s.x -= o.speed * 4 * s.depth * dt;
          if (s.x < -2) s.x = w + 2;
          s.tw += s.twSpeed * dt;
        }
        const px = s.x + (o.mouseParallax ? pmx * 18 * s.depth : 0);
        const py = s.y + (o.mouseParallax ? pmy * 18 * s.depth : 0);
        const alpha = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.tw))) * (0.4 + 0.6 * s.depth);
        const rgb = s.tinted ? tintRGB : starRGB;

        if (wa > 0) {
          // Warp: Sterne werden zu Streifen, die vom Zentrum wegzeigen
          const dx = px - cx, dy = py - cy;
          const k = wa * 0.18 * s.depth;
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth = s.r;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + dx * k, py + dy * k);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${rgb},${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, s.r, 0, Math.PI * 2);
          ctx.fill();
          if (s.r > 1.3) { // Glanz für helle Sterne
            ctx.fillStyle = `rgba(${rgb},${alpha * 0.15})`;
            ctx.beginPath();
            ctx.arc(px, py, s.r * 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        s._px = px; s._py = py; s._a = alpha;
      }

      // --- Konstellationen: helle, nahe Sterne verbinden ("Agenten-Netz")
      if (o.constellation && wa === 0) {
        const bright = stars.filter((s) => s.r > 1.05);
        const maxD = Math.min(w, h) * 0.16;
        ctx.lineWidth = 0.6;
        for (let i = 0; i < bright.length; i++) {
          for (let j = i + 1; j < bright.length; j++) {
            const a = bright[i], b = bright[j];
            const d = Math.hypot(a._px - b._px, a._py - b._py);
            if (d < maxD) {
              const al = (1 - d / maxD) * 0.22 * Math.min(a._a, b._a);
              ctx.strokeStyle = `rgba(${tintRGB},${al})`;
              ctx.beginPath();
              ctx.moveTo(a._px, a._py);
              ctx.lineTo(b._px, b._py);
              ctx.stroke();
            }
          }
        }
      }

      // --- Sternschnuppen
      if (o.shootingStars && !still && Math.random() < dt * 0.35) spawnShootingStar();
      shooting = shooting.filter((s) => {
        s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt;
        const p = s.life / s.max;
        if (p >= 1) return false;
        const fade = Math.sin(p * Math.PI);
        const sp = Math.hypot(s.vx, s.vy);
        const tx = s.x - (s.vx / sp) * s.len, ty = s.y - (s.vy / sp) * s.len;
        const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
        g.addColorStop(0, `rgba(${starRGB},${0.9 * fade})`);
        g.addColorStop(0.3, `rgba(${tintRGB},${0.4 * fade})`);
        g.addColorStop(1, `rgba(${tintRGB},0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        return true;
      });

      // --- Burst-Partikel
      particles = particles.filter((p) => {
        p.life += dt || 0.016;
        p.vx *= 0.96; p.vy *= 0.96;
        p.x += p.vx * (dt || 0.016); p.y += p.vy * (dt || 0.016);
        const q = p.life / p.max;
        if (q >= 1) return false;
        ctx.fillStyle = `rgba(${p.tinted ? tintRGB : starRGB},${1 - q})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 * (1 - q) + 0.4, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      if (!still || particles.length) raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      mx = (e.clientX / global.innerWidth - 0.5) * 2;
      my = (e.clientY / global.innerHeight - 0.5) * 2;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (o.mouseParallax) global.addEventListener("pointermove", onMove, { passive: true });
    refreshColors();
    resize();
    raf = requestAnimationFrame(frame);

    const mq = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame); };
    mq && mq.addEventListener && mq.addEventListener("change", onMq);

    return {
      warp, burst, refreshColors,
      destroy() {
        cancelAnimationFrame(raf);
        ro.disconnect();
        global.removeEventListener("pointermove", onMove);
        mq && mq.removeEventListener && mq.removeEventListener("change", onMq);
      },
    };
  }

  global.AgentRoomStarfield = { mount };
})(window);
