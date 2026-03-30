import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parsePillarTextToQuiz } from "../src/data/pillarTextParser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.join(__dirname, "..");
const questionsDir = path.join(repoRoot, "src/components/questions");

const FILES = [
  { file: "Gratitude.jsx", exportName: "GRATITUDE_QUIZ" },
  { file: "SelflessServic.jsx", exportName: "SELFLESS_SERVICE_QUIZ" },
  { file: "EthicalLife.jsx", exportName: "ETHICAL_LIFE_QUIZ" },
  { file: "SocialMediaPages.jsx", exportName: "SOCIAL_MEDIA_PAGES_QUIZ" },
  { file: "Happiness.jsx", exportName: "HAPPINESS_QUIZ" },
  { file: "VegetarianDiet.jsx", exportName: "VEGETARIAN_DIET_QUIZ" },
  { file: "Meditation.jsx", exportName: "MEDITATION_QUIZ" },
];

function shouldSkip(raw) {
  // Skip files that already look like JS quiz modules.
  return raw.includes("export const") && raw.includes("_QUIZ");
}

function toQuizModule({ easy, medium, deep }, exportName) {
  const moduleBody = `export const ${exportName} = {\n  easy: { questions: ${JSON.stringify(easy, null, 2)} },\n  medium: { questions: ${JSON.stringify(medium, null, 2)} },\n  deep: { questions: ${JSON.stringify(deep, null, 2)} },\n};\n\nexport default ${exportName};\n`;
  return moduleBody;
}

for (const { file, exportName } of FILES) {
  const fullPath = path.join(questionsDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");

  if (shouldSkip(raw)) {
    // Already converted, do nothing.
    continue;
  }

  const parsed = parsePillarTextToQuiz(raw);
  const easy = parsed?.stages?.easy ?? [];
  const medium = parsed?.stages?.medium ?? [];
  const deep = parsed?.stages?.deep ?? [];

  const out = toQuizModule({ easy, medium, deep }, exportName);
  fs.writeFileSync(fullPath, out, "utf8");
  console.log(`Converted ${file} -> ${exportName}`);
}

// Karma file: ensure it has a default export.
const karmaPath = path.join(questionsDir, "Karma.jsx");
const karmaRaw = fs.readFileSync(karmaPath, "utf8");
if (!karmaRaw.includes("export default")) {
  fs.writeFileSync(
    karmaPath,
    `${karmaRaw}\n\nexport default KARMA_QUIZ;\n`,
    "utf8",
  );
  console.log("Added default export to Karma.jsx");
}

