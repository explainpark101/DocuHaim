// scripts/generate-llms.js

const fs = require("fs");
const path = require("path");

const SITE =
  process.env.SITE_URL ||
  "https://explainpark101.github.io/s3haim";

const PROJECT =
  process.env.PROJECT_NAME ||
  "S3Haim";

const DOCS_DIR = path.join(process.cwd(), "docs");
const OUTPUT_DIR = path.join(process.cwd(), "public");

function walk(dir: string): string[] {
  let result: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === ".vitepress") continue;
    if (entry.name === "node_modules") continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...walk(full));
    } else if (entry.name.endsWith(".md")) {
      result.push(full);
    }
  }

  return result;
}

function removeFrontmatter(content: string): string {
  return content.replace(/^---[\s\S]*?---\n?/m, "");
}

function title(content: string, fallback: string): string {
  const m = content.match(/^# (.+)$/m);
  return m ? m[1].trim() : fallback;
}

function url(file: string): string {
  let rel = path.relative(DOCS_DIR, file);

  rel = rel.replace(/\\/g, "/");

  rel = rel.replace(/README\.md$/i, "");

  rel = rel.replace(/index\.md$/i, "");

  rel = rel.replace(/\.md$/i, "");

  if (rel.length && !rel.endsWith("/")) {
    rel += "/";
  }

  return `${SITE}/docs/${rel}`;
}

const files = walk(DOCS_DIR).sort();

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

//
// llms.txt
//

let txt: string = "";

txt += `# ${PROJECT}\n\n`;

txt += "## Documentation\n\n";

for (const file of files) {
  txt += `${url(file)}\n`;
}

txt += "\n";

fs.writeFileSync(
  path.join(OUTPUT_DIR, "llms.txt"),
  txt
);

//
// llms-full.txt
//

let full: string = "";

full += `# ${PROJECT}\n\n`;

full += `Generated: ${new Date().toISOString()}\n\n`;

for (const file of files) {
  let md: string = fs.readFileSync(file, "utf8");

  md = removeFrontmatter(md).trim();

  full += "============================================================\n";

  full += title(md, path.basename(file));

  full += "\n";

  full += "============================================================\n\n";

  full += `URL: ${url(file)}\n\n`;

  full += md;

  full += "\n\n";
}

fs.writeFileSync(
  path.join(OUTPUT_DIR, "llms-full.txt"),
  full
);

console.log(`✓ Generated llms.txt (${files.length} docs)`);
console.log(`✓ Generated llms-full.txt`);