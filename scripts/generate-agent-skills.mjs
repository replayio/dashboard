import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const sourcesRoot = path.join(repoRoot, "agent", "skill-sources");
const outDir = path.join(repoRoot, "public", ".well-known", "agent-skills");
const outFile = path.join(outDir, "index.json");
const pubSourcesDir = path.join(outDir, "sources");

const SCHEMA_URL =
  "https://agentskills.io/schemas/agent-skills-index/v0.2.0/agent-skills-index.schema.json";

function walkSkillFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkSkillFiles(full, acc);
    else if (name === "SKILL.md") acc.push(full);
  }
  return acc;
}

function skillNameFromPath(filePath) {
  const rel = path.relative(sourcesRoot, filePath);
  const parts = rel.split(path.sep).filter(Boolean);
  if (parts.length >= 2) return parts[0] ?? "skill";
  return path.basename(path.dirname(filePath));
}

function primaryHeading(body) {
  const m = body.match(/^#\s+(.+)$/m);
  return m?.[1]?.trim();
}

function main() {
  const files = walkSkillFiles(sourcesRoot);

  fs.mkdirSync(pubSourcesDir, { recursive: true });

  const skills = files.map(filePath => {
    const body = fs.readFileSync(filePath, "utf8");
    const hash = crypto.createHash("sha256").update(body).digest("hex");
    const name = skillNameFromPath(filePath);
    const relInsideSources = path.relative(sourcesRoot, filePath).split(path.sep).join("/");
    const dest = path.join(pubSourcesDir, relInsideSources);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(filePath, dest);

    const urlPath = `/.well-known/agent-skills/sources/${relInsideSources}`;
    const title = primaryHeading(body);

    return {
      name,
      type: "text/markdown",
      description: title || `Agent skill: ${name}`,
      url: urlPath,
      digest: {
        sha256: hash,
      },
    };
  });

  const index = {
    $schema: SCHEMA_URL,
    version: "0.2.0",
    skills,
  };

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`Wrote ${skills.length} skill(s) to ${path.relative(repoRoot, outFile)}`);
}

main();
