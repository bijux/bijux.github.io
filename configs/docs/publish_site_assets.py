from __future__ import annotations

import shutil
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


ROOT_ICON_FILENAMES = (
    "favicon.ico",
    "apple-touch-icon.png",
    "apple-touch-icon-precomposed.png",
)


def on_post_build(config) -> None:
    """Publish source-bound icons and the configured custom domain."""
    docs_dir = Path(config.docs_dir)
    site_dir = Path(config.site_dir)
    icon_source_dir = docs_dir / "assets" / "site-icons"

    for filename in ROOT_ICON_FILENAMES:
        source_path = icon_source_dir / filename
        if not source_path.exists():
            raise FileNotFoundError(f"Missing site icon source: {source_path}")
        destination_path = site_dir / filename
        destination_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source_path, destination_path)

    shutil.copyfile(REPO_ROOT / "CNAME", site_dir / "CNAME")
