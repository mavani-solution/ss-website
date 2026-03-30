import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Bot } from "lucide-react";
import karmaQuiz from "./questions/Karma.jsx";
import gratitudeQuiz from "./questions/Gratitude.jsx";
import selflessQuiz from "./questions/SelflessServic.jsx";
import ethicalQuiz from "./questions/EthicalLife.jsx";
import socialMediaQuiz from "./questions/SocialMediaPages.jsx";
import happinessQuiz from "./questions/Happiness.jsx";
import vegetarianQuiz from "./questions/VegetarianDiet.jsx";
import meditationQuiz from "./questions/Meditation.jsx";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

const labels = ["A", "B", "C", "D"];
const PHONE_DIGITS = 10;
const QUESTION_COUNT = 3;
const SECONDS_PER_QUESTION = 30;
const SAVE_API_TIMEOUT_MS = 12000;

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.8 11.8 0 0 0 12.1.01C5.57.01.23 5.35.23 11.88c0 2.1.55 4.15 1.6 5.96L.06 24l6.34-1.66a11.8 11.8 0 0 0 5.67 1.45h.01c6.52 0 11.87-5.34 11.87-11.88 0-3.17-1.23-6.16-3.43-8.43ZM12.08 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.66-.23-.38a9.88 9.88 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9a9.86 9.86 0 0 1 7.01 2.91 9.83 9.83 0 0 1 2.89 6.99c0 5.46-4.45 9.9-9.89 9.9Zm5.43-7.42c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.23-.64.08-.3-.15-1.25-.46-2.38-1.47a8.88 8.88 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.53.08-.8.38-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.35.2 1.86.12.56-.08 1.78-.73 2.03-1.44.25-.71.25-1.31.17-1.44-.07-.13-.27-.2-.56-.35Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

const PLATFORM_LINK_IMAGES = [
  {
    key: "whatsapp-community",
    label: "WhatsApp Community",
    icon: WhatsAppIcon,
    src: "/whatsapp-community.jpeg",
  },
  {
    key: "whatsapp-chatbot",
    label: "WhatsApp Chatbot",
    icon: WhatsAppIcon,
    src: "/whatsapp-chatbot.jpeg",
  },
  {
    key: "instagram-page",
    label: "Instagram Page",
    icon: InstagramIcon,
    src: "/instagram-page.jpeg",
  },
];

/** Keep only digits, max length for mobile numbers */
function sanitizePhoneInput(raw) {
  return raw.replace(/\D/g, "").slice(0, PHONE_DIGITS);
}

export default function PillarQuizDialog({
  open,
  onOpenChange,
  pillar,
  onRegistrationComplete,
}) {
  const [step, setStep] = useState(1);
  /** 1–3 = questions, 4 = registration, 5 = connected confirmation */
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showConnectedContent, setShowConnectedContent] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [stageQuestions, setStageQuestions] = useState([]);
  const confettiCanvasRef = useRef(null);
  const confettiShotRef = useRef(null);

  useEffect(() => {
    if (
      step !== 6 ||
      !open ||
      !confettiCanvasRef.current ||
      !showConnectedContent
    ) {
      return undefined;
    }

    if (confettiShotRef.current) {
      confettiShotRef.current.reset();
    }

    confettiShotRef.current = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    });

    confettiShotRef.current({
      particleCount: 90,
      spread: 80,
      startVelocity: 38,
      scalar: 1.05,
      ticks: 240,
      origin: { y: 0.6 },
      colors: ["#ffffff", "#f4d67a", "#60a5fa", "#fb7185", "#86efac"],
    });

    return () => {
      if (confettiShotRef.current) {
        confettiShotRef.current.reset();
        confettiShotRef.current = null;
      }
    };
  }, [step, open, showConnectedContent]);

  const selectedRef = useRef(null);
  const processingRef = useRef(false);
  const timerRef = useRef(null);
  const finalizeRef = useRef(() => {});

  useEffect(() => {
    selectedRef.current = selectedIndex;
  }, [selectedIndex]);

  const quiz = useMemo(() => {
    if (!pillar?.id) return null;
    const map = {
      karma: karmaQuiz,
      gratitude: gratitudeQuiz,
      "selfless-service": selflessQuiz,
      "ethical-life": ethicalQuiz,
      "social-media-pages-of-maharaji": socialMediaQuiz,
      happiness: happinessQuiz,
      "vegetarian-diet": vegetarianQuiz,
      meditation: meditationQuiz,
    };
    return map[pillar.id] ?? null;
  }, [pillar]);
  const currentQuestion =
    step >= 1 && step <= QUESTION_COUNT ? stageQuestions[step - 1] : null;
  const correctIndex = currentQuestion?.correctIndex;

  const resetQuizState = useCallback(() => {
    setStep(1);
    setSelectedIndex(null);
    selectedRef.current = null;
    setSubmitted(false);
    setScore(0);
    setTimeLeft(SECONDS_PER_QUESTION);
    setStageQuestions([]);
    setName("");
    setPhone("");
    setPhoneError("");
    setSaveError("");
    setIsSaving(false);
    setShowConnectedContent(false);
    processingRef.current = false;
  }, []);

  useEffect(() => {
    if (!open || !pillar?.id) return;
    if (!quiz) return;

    resetQuizState();
    const pickOne = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return null;
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const easyPool = quiz?.easy?.questions ?? [];
    const mediumPool = quiz?.medium?.questions ?? [];
    const deepPool = quiz?.deep?.questions ?? [];

    const easyQ = pickOne(easyPool);
    const mediumQ = pickOne(mediumPool);
    const deepQ = pickOne(deepPool);

    const fallbackPool = [...easyPool, ...mediumPool, ...deepPool];
    const fallbackPick = () =>
      fallbackPool.length > 0
        ? fallbackPool[Math.floor(Math.random() * fallbackPool.length)]
        : null;

    setStageQuestions(
      [
        easyQ ?? fallbackPick(),
        mediumQ ?? fallbackPick(),
        deepQ ?? fallbackPick(),
      ].filter(Boolean)
    );
  }, [open, pillar?.id, quiz, resetQuizState]);

  const finalizeQuestion = useCallback(() => {
    if (processingRef.current) return;
    if (step < 1 || step > QUESTION_COUNT) return;
    if (!currentQuestion) return;
    processingRef.current = true;

    const q = currentQuestion;
    const idx = selectedRef.current;
    if (idx !== null && idx === q.correctIndex) {
      setScore((s) => s + 1);
    }

    setSelectedIndex(null);
    selectedRef.current = null;
    setSubmitted(false);

    if (step === QUESTION_COUNT) {
      setStep(4);
    } else {
      setStep((s) => s + 1);
    }

    window.setTimeout(() => {
      processingRef.current = false;
    }, 0);
  }, [currentQuestion, step]);

  // Keep timer callback pointing to the latest finalize function.
  useEffect(() => {
    finalizeRef.current = finalizeQuestion;
  }, [finalizeQuestion]);

  useEffect(() => {
    if (!open || !pillar?.id || !currentQuestion) return;
    if (step < 1 || step > QUESTION_COUNT) return;

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    let seconds = SECONDS_PER_QUESTION;
    setTimeLeft(seconds);

    timerRef.current = window.setInterval(() => {
      seconds -= 1;
      setTimeLeft(seconds);
      if (seconds <= 0) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        finalizeRef.current();
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, pillar?.id, step, currentQuestion]);

  const clearQuestionTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedIndex === null) return;
    setSubmitted(true);
    clearQuestionTimer();
    window.setTimeout(() => {
      finalizeQuestion();
    }, 450);
  };

  const phoneValid = phone.length === PHONE_DIGITS;
  const canSave = name.trim().length > 0 && phoneValid;
  const scorePercent = Math.round((score / QUESTION_COUNT) * 100);

  const handlePhoneChange = (e) => {
    setPhone(sanitizePhoneInput(e.target.value));
    setPhoneError("");
  };

  const handlePhoneBlur = () => {
    if (phone.length === 0) {
      setPhoneError("");
      return;
    }
    if (phone.length === PHONE_DIGITS) {
      setPhoneError("");
      return;
    }
    setPhoneError(`Enter all ${PHONE_DIGITS} digits.`);
  };

  const handleSave = async () => {
    if (!pillar) return;
    if (!name.trim()) return;

    setSaveError("");

    if (phone.length === 0) {
      setPhoneError("Enter your 10-digit mobile number.");
      return;
    }
    if (phone.length < PHONE_DIGITS) {
      setPhoneError(`Mobile number must be exactly ${PHONE_DIGITS} digits.`);
      return;
    }

    const payload = {
      name: name.trim(),
      phone,
      pillarId: pillar.id,
      pillarTitle: pillar.title,
      score,
      maxScore: QUESTION_COUNT,
      scorePercent,
    };

    setStep(6);
    setShowConnectedContent(false);
    setIsSaving(true);
    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => {
        controller.abort();
      }, SAVE_API_TIMEOUT_MS);

      const response = await fetch(
        "https://quiz-score-api.onrender.com/api/save-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            name: payload.name,
            phone: payload.phone,
            score: payload.scorePercent,
          }),
        }
      );
      window.clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      onRegistrationComplete?.(payload);
      setShowConnectedContent(true);
    } catch (error) {
      if (error?.name === "AbortError") {
        setSaveError("Request timed out. Please try again.");
      } else {
        setSaveError("Could not save now. Please try again.");
      }
      setShowConnectedContent(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextFromScore = () => {
    setStep(5);
  };

  const mm = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const ss = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {pillar && quiz && (
        <DialogContent
          className={cn(
            "pillar-dialog-shell max-h-[min(92dvh,calc(100dvh-2rem))] min-h-[min(84dvh,46rem)] w-full max-w-2xl"
          )}
        >
          {step >= 1 && step <= QUESTION_COUNT && currentQuestion && (
            <div
              className="pillar-quiz-step flex flex-1 min-h-0 flex-col gap-5"
              key={`q-${step}`}
            >
              <div className="flex flex-col gap-3">
                {/* Title row */}
                <div className="flex items-center justify-between gap-3">
                  <DialogHeader className="text-left sm:text-left items-start">
                    <DialogTitle className="text-white text-3xl ">
                      {pillar.title}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>

              {/* Questions block centered vertically + horizontally */}
              <div className="flex flex-1 min-h-0 flex-col justify-center gap-3">
                <p className="text-base sm:text-lg font-normal leading-relaxed text-[#f4d67a]">
                  प्रश्न {step} / {QUESTION_COUNT}: {currentQuestion.question}
                </p>

                <RadioGroup
                  value={
                    selectedIndex !== null ? String(selectedIndex) : undefined
                  }
                  onValueChange={(v) => {
                    if (!submitted) {
                      const n = parseInt(v, 10);
                      setSelectedIndex(n);
                      selectedRef.current = n;
                    }
                  }}
                  disabled={submitted}
                  className="flex w-full flex-col gap-2.5"
                  aria-label="विकल्प चुनें"
                >
                  {currentQuestion.options.map((opt, index) => {
                    const id = `pillar-opt-${pillar.id}-s${step}-${index}`;
                    const isSelected = selectedIndex === index;
                    const showCorrect = submitted && index === correctIndex;
                    const showWrong =
                      submitted && isSelected && index !== correctIndex;

                    return (
                      <div
                        key={index}
                        className={cn(
                          "relative flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm transition-all sm:text-base",
                          showCorrect &&
                            "border-emerald-300 bg-emerald-100/95 text-emerald-950 ring-2 ring-emerald-200/80",
                          showWrong &&
                            "border-red-300 bg-red-100/95 text-red-950",
                          !showCorrect &&
                            !showWrong &&
                            isSelected &&
                            "border-[#f4d67a] bg-[#fff7e6] text-[#2d2430] ring-2 ring-[#f4d67a]/40 shadow-[0_0_0_2px_rgb(244_214_122/25%)]",
                          !showCorrect &&
                            !showWrong &&
                            !isSelected &&
                            "border-[rgb(213_179_211/38%)] bg-white text-[#2d2430] hover:border-[rgb(184_145_183/70%)]"
                        )}
                      >
                        <RadioGroupItem
                          value={String(index)}
                          id={id}
                          className="sr-only"
                          tabIndex={submitted ? -1 : 0}
                        />
                        <Label
                          htmlFor={id}
                          className="flex flex-1 cursor-pointer items-center gap-0.5 leading-snug font-normal peer-disabled:cursor-default"
                        >
                          <span className="font-semibold text-[#2d2430] text-sm sm:text-base">
                            {labels[index]}.
                          </span>
                          <span className="text-[#2d2430] text-sm sm:text-base">
                            {opt}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
                <div className="flex justify-end">
                  <div
                    className="flex shrink-0 items-center gap-2 rounded-xl border border-white/28 bg-white/10 px-3 py-2 font-mono text-base font-semibold tabular-nums text-white sm:text-lg"
                    aria-live="polite"
                  >
                    <span className="text-xs font-sans font-medium uppercase tracking-wide text-white/70">
                      Time
                    </span>
                    {mm}:{ss}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex w-full justify-center">
                <Button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedIndex === null}
                  className="w-full cursor-pointer bg-[#f4d67a] text-[#2d2430] hover:bg-[#e7c651] focus-visible:ring-[#f4d67a]/35"
                >
                  Submit answer
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div
              className="pillar-quiz-step flex flex-1 min-h-0 flex-col items-center gap-6"
              key="step-4-score"
            >
              <div className="flex flex-1 w-full flex-col items-center justify-center">
                <div className="mt-1 flex items-center justify-center gap-3">
                  {Array.from({ length: QUESTION_COUNT }).map((_, index) => (
                    <span
                      key={`final-star-${index}`}
                      className={cn(
                        "text-5xl leading-none sm:text-6xl",
                        index < score ? "text-[#f4d67a]" : "text-white/35"
                      )}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-base sm:text-lg text-white/75 mt-4 font-semibold">
                  Score: {scorePercent}%
                </p>
              </div>

              <div className="mt-auto w-full">
                <Button
                  type="button"
                  onClick={handleNextFromScore}
                  className="w-full cursor-pointer bg-[#f4d67a] text-[#2d2430] hover:bg-[#e7c651] focus-visible:ring-[#f4d67a]/35"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div
              className="pillar-quiz-step flex flex-1 min-h-0 flex-col gap-5"
              key="step-5-barcode-form"
            >
              <DialogHeader className="text-center sm:text-center items-center">
                <p className="text-base sm:text-lg text-white/75 font-semibold">
                  Fill your details to connect with us.
                </p>
              </DialogHeader>

              <div className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0">
                {PLATFORM_LINK_IMAGES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="min-w-[86%] snap-center rounded-xl border border-white/25 bg-white/10 p-3 sm:min-w-0 sm:p-2"
                    >
                      <div className="mb-2.5 flex items-center justify-center gap-2 text-white sm:mb-2">
                        <Icon className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
                        <p className="text-sm font-semibold sm:text-xs lg:text-sm">
                          {item.label}
                        </p>
                      </div>
                      <img
                        src={item.src}
                        alt={item.label}
                        className="h-auto w-full rounded-lg border border-[rgb(118_73_121/12%)] bg-white object-contain p-2 sm:p-1.5"
                      />
                    </div>
                  );
                })}
              </div> 

              <div className="flex flex-col gap-4">
                <div className="grid w-full gap-2">
                  <Label
                    htmlFor="pillar-name"
                    className="text-white text-base sm:text-lg font-semibold"
                  >
                    Name
                  </Label>
                  <Input
                    id="pillar-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                    className="border-white/35 bg-white text-[#2d2430] placeholder:text-[#5f5267]"
                  />
                </div>
                <div className="grid w-full gap-2">
                  <Label
                    htmlFor="pillar-phone"
                    className="text-white text-base sm:text-lg font-semibold"
                  >
                    Phone number
                  </Label>
                  <Input
                    id="pillar-phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={PHONE_DIGITS}
                    placeholder="10-digit mobile number"
                    aria-invalid={phoneError ? "true" : "false"}
                    aria-describedby={
                      phoneError ? "pillar-phone-error" : undefined
                    }
                    className={cn(
                      "border-white/35 bg-white text-[#2d2430] placeholder:text-[#5f5267]",
                      phoneError &&
                        "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/25"
                    )}
                  />
                  {phoneError && (
                    <p
                      id="pillar-phone-error"
                      role="alert"
                      className="text-sm text-red-600"
                    >
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto w-full">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={!canSave || isSaving}
                  className="w-full cursor-pointer bg-[#f4d67a] text-[#2d2430] hover:bg-[#e7c651] focus-visible:ring-[#f4d67a]/35"
                >
                  {isSaving ? "Saving..." : "Connected with us"}
                </Button>
                {saveError && (
                  <p role="alert" className="mt-2 text-sm text-red-200">
                    {saveError}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div
              className="pillar-quiz-step confetti-wrap flex flex-1 min-h-0 flex-col items-center justify-center gap-5 py-6 text-center w-full px-0"
              key="step-6-connected"
            >
              <canvas
                ref={confettiCanvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              />
              {isSaving && (
                <div className="relative z-10 flex w-full flex-col items-center gap-4">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/35 border-t-[#f4d67a]" />
                  <p className="text-white text-base sm:text-lg font-semibold">
                    Saving your details...
                  </p>
                </div>
              )}

              {!isSaving && !showConnectedContent && saveError && (
                <div className="relative z-10 flex w-full flex-col items-center gap-4">
                  <p className="text-red-200 text-base sm:text-lg font-semibold">
                    {saveError}
                  </p>
                  <Button
                    type="button"
                    onClick={() => setStep(5)}
                    className="w-full cursor-pointer bg-[#f4d67a] text-[#2d2430] hover:bg-[#e7c651] focus-visible:ring-[#f4d67a]/35 sm:w-auto"
                  >
                    Back
                  </Button>
                </div>
              )}

              {!isSaving && showConnectedContent && (
                <div className="relative z-10 flex w-full flex-col items-center gap-3">
                  <p className="text-white font-semibold text-2xl sm:text-3xl">
                    You are Connected with Us
                  </p>
                  <p className="max-w-md text-base sm:text-lg text-white/90 font-medium">
                    Thank you for completing the quiz and connecting with us.
                  </p>
                  <Button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="w-full cursor-pointer bg-[#f4d67a] text-[#2d2430] hover:bg-[#e7c651] focus-visible:ring-[#f4d67a]/35 sm:w-auto"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
