#!/usr/bin/env python3
"""
Effzeh News Content Pipeline
Scannt alle 9 Quellen auf neue Artikel und gibt sie als JSON aus.
Usage: python3 pipeline.py [--dry-run]
"""

import subprocess
import sys
import json
import os
import re
from datetime import datetime, timezone, timedelta

BLOGWATCHER_CLI = "/opt/data/bin/blogwatcher-cli"
FEEDS_DB = "/opt/data/effzeh-blog/feeds.db"
POSTS_DIR = "/opt/data/effzeh-blog/content/posts"

def run_scan():
    env = os.environ.copy()
    env["BLOGWATCHER_DB"] = FEEDS_DB
    result = subprocess.run(
        [BLOGWATCHER_CLI, "scan"],
        capture_output=True, text=True, timeout=120, env=env
    )
    return result.stdout, result.stderr, result.returncode

def get_new_articles():
    env = os.environ.copy()
    env["BLOGWATCHER_DB"] = FEEDS_DB
    result = subprocess.run(
        [BLOGWATCHER_CLI, "articles", "--all"],
        capture_output=True, text=True, timeout=30, env=env
    )
    return result.stdout

def parse_articles_output(output):
    articles = []
    current = {}
    lines = output.split('\n')
    for line in lines:
        match = re.match(r'\s*\[(\d+)\]\s+\[new\]\s+(.+)', line)
        if match:
            if current and 'title' in current:
                articles.append(current)
            current = {'id': int(match.group(1)), 'title': match.group(2).strip()}
            continue
        if current:
            if 'Blog:' in line:
                current['blog'] = line.split('Blog:')[1].strip()
            elif 'URL:' in line:
                current['url'] = line.split('URL:')[1].strip()
            elif 'Published:' in line:
                current['published'] = line.split('Published:')[1].strip()
    if current and 'title' in current:
        articles.append(current)
    return articles

if __name__ == '__main__':
    dry_run = '--dry-run' in sys.argv
    print("=" * 60)
    print("Effzeh News Pipeline – Scan gestartet")
    print(f"Zeit: {datetime.now(tz=timezone(timedelta(hours=2))).strftime('%d.%m.%Y %H:%M')}")
    print("=" * 60)
    stdout, stderr, rc = run_scan()
    print(stdout)
    articles_output = get_new_articles()
    articles = parse_articles_output(articles_output)
    print(f"\nGefundene Artikel: {len(articles)}")
    for a in articles[:10]:
        print(f"  [{a['id']}] {a.get('blog', '?')}: {a['title'][:80]}")
    print(json.dumps({
        "total_articles": len(articles),
        "articles": articles[:20],
    }, indent=2, ensure_ascii=False))
