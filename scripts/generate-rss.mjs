import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIR = path.resolve('content/posts');
const DIST_DIR = path.resolve('dist');

// Update this to your verified custom domain or Pages URL
const SITE_URL = 'https://YOUR_DOMAIN.com'; 
const SITE_TITLE = 'Bug Bounty Security Disclosures';
const SITE_DESC = 'Technical write-ups, vulnerability research, and PoC walkthroughs.';

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const yaml = match[1];
  const data = {};
  for (const line of yaml.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  }
  return data;
}

function generateRss() {
  if (!fs.existsSync(POSTS_DIR)) return;
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const items = files.map((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    const slug = file.replace(/\.mdx?$/, '');

    const title = frontmatter.title || slug;
    const date = frontmatter.date ? new Date(frontmatter.date).toUTCString() : new Date().toUTCString();
    const summary = frontmatter.summary || '';
    const link = `${SITE_URL}/#${slug}`;

    return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${summary}]]></description>
    </item>`;
  }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(DIST_DIR, 'rss.xml'), rssXml.trim());
  console.log('✓ Successfully generated dist/rss.xml');
}

generateRss();