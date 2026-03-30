const OPTION_RE = /^\s*o\s*(.+)\s*$/i;
const QUESTION_RE = /^\s*(\d+)\s*[.)]\s*(.+?)\s*$/;

function normalize(text) {
  return (text || "").replace(/\r/g, "").trim();
}

function getStageKey(line) {
  const v = line.toLowerCase();
  if (v.includes("प्रथम चरण") || v.includes("easy")) return "easy";
  if (v.includes("द्वितीय चरण") || v.includes("medium")) return "medium";
  if (v.includes("तृतीय चरण") || v.includes("deep")) return "deep";
  return null;
}

function cleanOption(raw) {
  return raw.replace(/\s*\(correct\)\s*$/i, "").trim();
}

export function parsePillarTextToQuiz(rawText) {
  const lines = normalize(rawText).split("\n");
  const stages = { easy: [], medium: [], deep: [] };
  let currentStage = "easy";
  let currentQuestion = null;

  const pushCurrent = () => {
    if (!currentQuestion) return;
    if (
      currentQuestion.question &&
      Array.isArray(currentQuestion.options) &&
      currentQuestion.options.length >= 2 &&
      Number.isInteger(currentQuestion.correctIndex)
    ) {
      stages[currentStage].push(currentQuestion);
    }
    currentQuestion = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^_+$/.test(line)) continue;

    const stageKey = getStageKey(line);
    if (stageKey) {
      pushCurrent();
      currentStage = stageKey;
      continue;
    }

    const qMatch = line.match(QUESTION_RE);
    if (qMatch) {
      pushCurrent();
      currentQuestion = {
        question: qMatch[2].trim(),
        options: [],
        correctIndex: 0,
      };
      continue;
    }

    const oMatch = line.match(OPTION_RE);
    if (oMatch && currentQuestion) {
      const optRaw = oMatch[1];
      const isCorrect = /\(correct\)\s*$/i.test(optRaw);
      const opt = cleanOption(optRaw);
      currentQuestion.options.push(opt);
      if (isCorrect) {
        currentQuestion.correctIndex = currentQuestion.options.length - 1;
      }
    }
  }

  pushCurrent();
  return { stages };
}

