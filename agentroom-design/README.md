# AgentRoom · Design System v0.1

> **Jeder Agent ist ein Stern. Jeder Raum ist ein Sternbild. Du bist dort, wo sie sich treffen.**

Öffne `index.html` im Browser: Die Seite zeigt das komplette System live, mit Theme-Umschalter, Sternenfeld, Warp und Supernova zum Anklicken.

| Datei | Inhalt |
|---|---|
| `index.html` | Live-Showcase: Konzept, Logo, Farben, Typo, Symbole, Komponenten, Hintergründe, Animationen, Text |
| `tokens.css` | Alle Design-Tokens als CSS-Variablen, 4 Themes, Keyframe-Bibliothek |
| `starfield.js` | Wiederverwendbares Canvas-Sternenfeld (Parallax, Twinkle, Sternschnuppen, Sternbilder, Warp, Burst) |
| `icons.svg` | 18 Symbole als SVG-Sprite |
| `build-icons.py` | Fügt `icons.svg` in `index.html` ein (nach Icon-Änderungen ausführen) |

---

## 1. Herkunft: was aus dem bestehenden Code übernommen wurde

Das L0INE-Repo enthält bisher nur ein README mit einem ASCII-Blocklogo. Daraus ergibt sich die vorhandene Design-DNA:

- **Monospace und Terminal-Ästhetik.** Daraus werden die Mono-Labels in VERSALIEN und das `terminal`-Theme.
- **ASCII- und Block-Zeichen (`█ ░▒▓ ╔═╗`).** Daraus werden das ASCII-Logo, Footer-Ornamente und die Terminal-Kulisse.
- **Dunkel, präzise, minimal.** Das bestimmt die Grundhaltung des gesamten Systems.

AgentRoom erweitert diese DNA um eine zweite Ebene, den **Kosmos**.

## 2. Leitidee: „Das Observatorium“

AgentRoom ist ein ruhiger, dunkler Raum im All. KI-Agenten erscheinen als leuchtende Himmelskörper, die man beobachten und steuern kann.

**Drei Prinzipien**
1. **Sichtbar statt magisch.** Denken, Tool-Aufrufe und Übergaben werden als Licht, Bahn oder Signal sichtbar.
2. **Ruhe im Chaos.** Ambient-Bewegung bleibt langsam. Schnelle Bewegung gibt es nur bei echten Ereignissen.
3. **Präzision der Maschine.** Mono, Raster und Zeitstempel. Das All ist die Bühne, das Terminal das Werkzeug.

**Metaphern-Lexikon**

| Produkt-Konzept | Visuelle Metapher | Umsetzung |
|---|---|---|
| Agent | Stern | farbiger Avatar mit Glanz |
| Agent aktiv | Orbit | rotierender Ring um den Avatar |
| Raum | Sternbild | Linien zwischen Agenten (`ar-draw`) |
| Denken | Orbit-Punkte | `.dots`, Orbit-Loader statt Spinner |
| Übergabe | Sternschnuppe | Lichtstreif von A nach B |
| Task erledigt | Supernova | `sky.burst(x, y)` |
| Raum betreten | Warp | `sky.warp(1200)` |
| Fehler | Pulsar | rosa Puls (`ar-pulse`), kein hektisches Blinken |
| Gedächtnis | Kristall-Schichten | Symbol `i-memory` |

## 3. Logo

Ein **Torbogen** (der Raum) mit einem **vierzackigen Stern** (der Agent) darin. Varianten: Wortmarke, App-Icon und ASCII-Logo als Terminal-Hommage. Mindestgröße: 16 px.

## 4. Themes

| Theme | Charakter | Einsatz |
|---|---|---|
| `void` (Standard) | Deep Space, Violett + Türkis | App, Arbeitsbereich |
| `nebula` | Magenta, Orange, warm | Onboarding, Marketing, Events |
| `terminal` | Phosphor-Grün, Scanlines, alles Mono, eckig | Dev-Modus, Logs, Power-User |
| `daylight` | hell, „Observatorium bei Tag“ | Tagsüber, Dokumente, Barrierefreiheit |

Umschalten: `<html data-theme="nebula">`. Das Sternenfeld übernimmt die Theme-Farben nach `sky.refreshColors()`.

**Agenten-Farben** (`--ar-agent-1` … `-8`: Nova, Aurora, Solar, Pulsar, Comet, Quasar, Ember, Orchid) bleiben in allen Themes gleich, damit man einen Agenten überall wiedererkennt.

## 5. Typografie

- **Space Grotesk** für Überschriften
- **Inter** für Fließtext und Chat
- **JetBrains Mono** für Labels, Code, Zeitstempel und IDs

Die Skala ist eine Major Third (1.25), 12 → 39 px, dazu ein fluider Hero-Titel.

## 6. Symbole

18 Icons: `logo, agent, crew, room, think, message, tool, memory, task, handoff, signal, launch, planet, star, guard, observe, terminal, warp`.

Regeln: 24-px-Raster, 1,5 px Linie, runde Enden, `currentColor`. **Gefüllte Punkte = Agent bzw. Energie, Linien = Struktur.**

```html
<svg class="ico"><use href="#i-agent"/></svg>
```

## 7. Hintergründe

| Kulisse | Einsatz |
|---|---|
| Void | Standard-Arbeitsbereich |
| Nebula | Onboarding, Marketing |
| Horizon (Synthwave-Grid + Sonne) | Landingpage-Hero |
| Aurora (rotierendes Polarlicht) | Erfolgsmomente |
| Terminal (Scanlines + Log) | Logs, Dev-Ansichten |
| Dot-Grid | Editoren, helles Theme |

Darüber liegt optional das lebende Sternenfeld.

## 8. Animation

```js
const sky = AgentRoomStarfield.mount(canvas, { density: 1, shootingStars: true, constellation: true });
sky.warp(1200);      // Raum betreten
sky.burst(x, y);     // Task erledigt
sky.refreshColors(); // nach Theme-Wechsel
```

| Token | Wert | Wofür |
|---|---|---|
| `--ar-dur-instant` | 90 ms | Hover, Press |
| `--ar-dur-fast` | 160 ms | Buttons, Toggles |
| `--ar-dur-base` | 260 ms | Karten, Panels |
| `--ar-dur-slow` | 480 ms | Neue Nachricht, Theme-Wechsel |
| `--ar-dur-ambient` | 6 s | Twinkle, Atmen |
| `--ar-dur-orbit` | 18 s | Orbit-Ringe |
| `--ar-ease-warp` | `cubic-bezier(.16,1,.3,1)` | alles, was ankommt |
| `--ar-ease-orbit` | `cubic-bezier(.45,0,.55,1)` | Schleifen |
| `--ar-ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | Hover-Lift |

Bei `prefers-reduced-motion: reduce` laufen keine Animationen, und das Sternenfeld wird statisch.

## 9. Text & Tonalität

Ruhig, klar, leicht poetisch, nie verschnörkelt. **Wir duzen.** Die Metapher würzt den Text, sie ersetzt keine Information.

- ✓ „Nova reicht den Entwurf an Aurora weiter.“
- ✕ „Agent-Instanz #2 hat Payload an Instanz #3 übertragen.“
- ✓ „Verbindung verloren. Wir versuchen es in 5 s erneut.“
- ✕ „Die Sterne stehen schlecht 🌌 …“ (Metapher statt Information)

**Glossar:** Raum · Crew · Signal · Übergabe · Gedächtnis · Starten/Warp · Beobachten

---

## Vorgehen: wie wir das Konzept weiterentwickeln

1. **Moodboard abstimmen.** Gefallen dir in der Showcase die Richtung (Observatorium) und die 4 Themes? Was soll weg, was verstärkt werden?
2. **Logo finalisieren.** Die Tür mit dem Stern als Basis, eventuell 2–3 Varianten skizzieren und am echten App-Icon testen.
3. **Tokens einfrieren.** Wenn Farben und Typo sitzen, wird `tokens.css` die einzige Quelle (bei Bedarf Export nach Tailwind, Figma oder JSON).
4. **Kern-Screens entwerfen.** Raum-Übersicht, Raum-Ansicht (Sternbild + Chat), Agent-Detail, Onboarding.
5. **Komponenten bauen.** In der Ziel-Codebasis von AgentRoom (React/Vue/…) mit diesen Tokens.
6. **Motion-Feintuning.** Warp, Supernova und Übergaben in echten Flows testen und Dauer anpassen.
7. **A11y-Check.** Kontraste (AA) pro Theme prüfen, Reduced Motion und Tastatur-Fokus.
