"""Builds a single-file preview page (for claude.ai) from the React source files.
Usage: python3 tools/build_preview.py <out_bundle.jsx> <out_page.html>"""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ORDER = ["src/data/settings.js", "src/data/pricing.js", "src/data/content.js", "src/data/i18n.js",
         "src/components/Stone.jsx", "src/components/Commission.jsx", "src/pages/Pages.jsx", "src/App.jsx"]

def strip(src):
    src = re.sub(r'^import\s[\s\S]*?from\s+["\'][^"\']+["\'];\s*$', "", src, flags=re.M)
    src = re.sub(r'^import\s+["\'][^"\']+["\'];\s*$', "", src, flags=re.M)
    src = src.replace("export default function", "function").replace("export function", "function").replace("export const", "const")
    return src

bundle = "const { useState, useEffect } = React;\n" + "\n".join(
    f"// ---- {p} ----\n" + strip((ROOT / p).read_text()) for p in ORDER)
pathlib.Path(sys.argv[1]).write_text(bundle)

css = (ROOT / "src/index.css").read_text()
page = f"""<title>Kaleikiʻi Carving</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap">
<style>
{css}
.boot {{ padding: 80px 16px; text-align: center; color: var(--muted); }}
</style>
<div id="root"><p class="boot">Loading Kaleikiʻi…</p></div>
<script>window.__ARTIFACT = true;</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.7/babel.min.js"></script>
<script type="text/babel" data-presets="react">
{bundle}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>
"""
pathlib.Path(sys.argv[2]).write_text(page)
print("bundle", len(bundle), "page", len(page))
