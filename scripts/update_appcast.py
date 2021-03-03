import sys
import hashlib
import json
from pathlib import Path


def update_appcast(version):
    release_file = Path(f'release/bob-plugin-openl-translate-v{version}.bobplugin')
    assert release_file.is_file(), 'Release file not exist'
    with open(release_file, 'rb') as f:
        c = f.read()
        file_hash = hashlib.sha256(c).hexdigest()
    version_info = {
        'version': version,
        'desc': f'https://github.com/AgaveTech/bob-plugin-openl-translate/releases/tag/v{version}',
        'sha256': file_hash,
        'url': f'https://github.com/AgaveTech/bob-plugin-openl-translate/releases/download/v{version}/{release_file.name}',
        'minBobVersion': '0.5.0'
    }
    appcast_file = Path('appcast.json')
    if appcast_file.is_file():
        with open(appcast_file, 'r') as f:
            appcast = json.load(f)
    else:
        appcast = dict(identifier='club.openl.bob-plugin-openl-translate', versions=[])
    appcast['versions'].insert(0, version_info)
    with open(appcast_file, 'w') as f:
        json.dump(appcast, f, ensure_ascii=False, indent=2)


if __name__ == '__main__':
    version = sys.argv[1]
    update_appcast(version)
