"""Optional design tool. Normal builds use the bundled WOFF2 and need only Node.js.

python -m pip install 'fonttools[woff]'
python scripts/subset-font.py /path/to/NotoSansSC-VF.ttf
"""
import hashlib
import json
import sys
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1])
text = (root / 'src/page.mjs').read_text(encoding='utf-8')
characters = set(range(32, 127)) | {ord(c) for c in text if ord(c) > 127}
font = TTFont(source)
cmap = font.getBestCmap()
covered = characters & set(cmap)
options = subset.Options()
options.flavor = 'woff2'
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=covered)
subsetter.subset(font)
font.flavor = 'woff2'
destination = root / 'assets/fonts/netwatch-sans-sc.woff2'
font.save(destination)
manifest = {
    'family': 'Noto Sans SC',
    'license': 'SIL Open Font License 1.1',
    'source': 'https://github.com/google/fonts/tree/main/ofl/notosanssc',
    'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'fontSha256': hashlib.sha256(destination.read_bytes()).hexdigest(),
    'codepoints': sorted(covered),
}
(root / 'scripts/font-coverage.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'{len(covered)} glyphs, {destination.stat().st_size:,} bytes: {destination}')
