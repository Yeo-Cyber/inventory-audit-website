"use client";

import { useState } from "react";
import {
  BarChart3,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  FileSpreadsheet,
  MapPinned,
  ScanBarcode,
  Upload,
} from "lucide-react";

type Tone = "blue" | "green" | "purple";

type WorkflowStep = {
  title: string;
  description: string;
  icon: keyof typeof stepIcons;
};

type Faq = {
  question: string;
  answer: string;
};

const stepIcons = {
  upload: Upload,
  scan: ScanBarcode,
  verify: ClipboardCheck,
  report: BarChart3,
  export: FileSpreadsheet,
  calendar: CalendarCheck,
  location: MapPinned,
};

const toneClasses = {
  blue: {
    activeBorder: "border-blue-300 shadow-blue-100",
    hoverBorder: "hover:border-blue-200",
    iconActive: "border-blue-200 bg-blue-600 text-white",
    iconIdle: "border-blue-100 bg-blue-50 text-blue-600",
    text: "text-blue-700",
    aside: "border-blue-100 bg-gradient-to-br from-blue-50 via-white to-yellow-50 shadow-blue-100/60",
    asideIcon: "bg-blue-600 shadow-blue-200",
    progressBg: "bg-blue-100",
    progress: "bg-blue-600",
  },
  green: {
    activeBorder: "border-green-300 shadow-green-100",
    hoverBorder: "hover:border-green-200",
    iconActive: "border-green-200 bg-green-600 text-white",
    iconIdle: "border-green-100 bg-green-50 text-green-600",
    text: "text-green-700",
    aside: "border-green-100 bg-gradient-to-br from-green-50 via-white to-yellow-50 shadow-green-100/60",
    asideIcon: "bg-green-600 shadow-green-200",
    progressBg: "bg-green-100",
    progress: "bg-green-600",
  },
  purple: {
    activeBorder: "border-purple-300 shadow-purple-100",
    hoverBorder: "hover:border-purple-200",
    iconActive: "border-purple-200 bg-purple-600 text-white",
    iconIdle: "border-purple-100 bg-purple-50 text-purple-600",
    text: "text-purple-700",
    aside: "border-purple-100 bg-gradient-to-br from-purple-50 via-white to-yellow-50 shadow-purple-100/60",
    asideIcon: "bg-purple-600 shadow-purple-200",
    progressBg: "bg-purple-100",
    progress: "bg-purple-600",
  },
};

export function SolutionWorkflowStepper({
  steps,
  tone,
}: {
  steps: WorkflowStep[];
  tone: Tone;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];
  const ActiveIcon = stepIcons[active.icon];
  const theme = toneClasses[tone];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
      <div className="grid gap-4">
        {steps.map((step, index) => {
          const Icon = stepIcons[step.icon];
          const isActive = activeStep === index;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
              className={[
                "group flex w-full items-start gap-4 rounded-3xl border bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                isActive ? theme.activeBorder : `border-neutral-200 ${theme.hoverBorder}`,
              ].join(" ")}
            >
              <span
                className={[
                  "grid size-12 shrink-0 place-items-center rounded-2xl border transition",
                  isActive ? theme.iconActive : theme.iconIdle,
                ].join(" ")}
              >
                <Icon className="size-5" />
              </span>
              <span>
                <span className={`text-xs font-black uppercase tracking-[0.16em] ${theme.text}`}>
                  Step {index + 1}
                </span>
                <span className="mt-1 block text-lg font-black text-neutral-950">
                  {step.title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-neutral-600">
                  {step.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <aside className={`sticky top-24 rounded-3xl border p-8 shadow-xl ${theme.aside}`}>
        <div className={`grid size-16 place-items-center rounded-3xl text-white shadow-lg ${theme.asideIcon}`}>
          <ActiveIcon className="size-7" />
        </div>
        <p className={`mt-8 text-sm font-black uppercase tracking-[0.18em] ${theme.text}`}>
          Active Workflow
        </p>
        <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
          {active.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-neutral-700">{active.description}</p>
        <div className={`mt-8 h-2 overflow-hidden rounded-full ${theme.progressBg}`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ${theme.progress}`}
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </aside>
    </div>
  );
}

export function SolutionFaqAccordion({
  faqs,
  tone,
}: {
  faqs: Faq[];
  tone: Tone;
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const theme = toneClasses[tone];

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-lg font-black text-neutral-950">{faq.question}</span>
              <ChevronDown
                className={[
                  `size-5 shrink-0 transition ${theme.text}`,
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
            {isOpen ? (
              <div className="border-t border-neutral-200 px-6 py-5 text-sm leading-7 text-neutral-700">
                {faq.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
