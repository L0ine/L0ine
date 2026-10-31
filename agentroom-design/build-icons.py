"""Fügt icons.svg inline in index.html ein (zwischen ICONS:START/END).
Ausführen nach jeder Änderung an icons.svg:  python3 build-icons.py"""
import pathlib, re
here = pathlib.Path(__file__).parent
svg = (here / "icons.svg").read_text(encoding="utf-8").strip()
html = (here / "index.html").read_text(encoding="utf-8")
html = re.sub(r"<!--ICONS:START-->.*?<!--ICONS:END-->",
              lambda m: f"<!--ICONS:START-->\n{svg}\n<!--ICONS:END-->", html, flags=re.S)
(here / "index.html").write_text(html, encoding="utf-8")
print("icons inlined")
