"use client";

import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  ClipboardCheck,
  FileSpreadsheet,
  ScanBarcode,
  Upload,
} from "lucide-react";

const workflowSteps = [
  {
    title: "Upload Excel Stock",
    description: "นำไฟล์ stock ตั้งต้นจาก Excel เข้า workflow โดยไม่ต้องเปลี่ยนระบบเดิม",
    Icon: Upload,
  },
  {
    title: "Scan / Count",
    description: "ตรวจนับด้วยมือถือหรือ barcode scanner พร้อมบันทึกจำนวนจริง",
    Icon: ScanBarcode,
  },
  {
    title: "Verify Difference",
    description: "ระบบแสดงรายการที่ยอดต่างเพื่อให้ตรวจซ้ำเฉพาะจุดที่สำคัญ",
    Icon: ClipboardCheck,
  },
  {
    title: "Generate Report",
    description: "สรุปรายงาน Stocktake, Diff และ No Count เป็นชุดข้อมูลพร้อมใช้",
    Icon: BarChart3,
  },
  {
    title: "Export / Dashboard",
    description: "ส่งออก Excel หรือดู Dashboard เพื่อใช้ตัดสินใจและปรับยอดต่อ",
    Icon: FileSpreadsheet,
  },
];

const faqs = [
  {
    question: "ต้องเปลี่ยนระบบเดิมไหม?",
    answer:
      "ไม่จำเป็น ระบบถูกออกแบบให้ใช้ไฟล์ Excel เดิมเป็นฐานข้อมูลเริ่มต้น จึงเหมาะกับ SME ที่ยังไม่พร้อมย้ายไป ERP หรือระบบ stock ขนาดใหญ่",
  },
  {
    question: "ใช้กับ Excel ได้ไหม?",
    answer:
      "ได้ โดย workflow จะนำข้อมูลรหัสสินค้า ชื่อสินค้า และยอดตั้งต้นจาก Excel มาใช้เปรียบเทียบกับยอดตรวจนับจริง แล้ว export รายงานกลับไปใช้งานต่อได้",
  },
  {
    question: "ใช้กับมือถือได้ไหม?",
    answer:
      "ใช้ได้ทั้งมือถือและ barcode scanner สำหรับงานที่ต้องการความเร็วสูง สามารถเพิ่ม scanner หรือ mobile kit เพื่อช่วยลดเวลาตรวจนับได้",
  },
  {
    question: "หลังตรวจนับได้รายงานอะไรบ้าง?",
    answer:
      "ได้รายงาน Stocktake Report, Diff Report, No Count Report และ Summary Dashboard เพื่อดูสินค้าที่ตรง ขาด เกิน หรือยังไม่ถูกตรวจนับ",
  },
];

export function SmeWorkflowStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const active = workflowSteps[activeStep];
  const ActiveIcon = active.Icon;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
      <div className="grid gap-4">
        {workflowSteps.map((step, index) => {
          const Icon = step.Icon;
          const isActive = activeStep === index;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
              className={[
                "group flex w-full items-start gap-4 rounded-3xl border bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                isActive
                  ? "border-blue-300 shadow-blue-100"
                  : "border-neutral-200 hover:border-blue-200",
              ].join(" ")}
            >
              <span
                className={[
                  "grid size-12 shrink-0 place-items-center rounded-2xl border transition",
                  isActive
                    ? "border-blue-200 bg-blue-600 text-white"
                    : "border-blue-100 bg-blue-50 text-blue-600",
                ].join(" ")}
              >
                <Icon className="size-5" />
              </span>
              <span>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
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
      <aside className="sticky top-24 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-8 shadow-xl shadow-blue-100/60">
        <div className="grid size-16 place-items-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-200">
          <ActiveIcon className="size-7" />
        </div>
        <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-blue-700">
          Active Workflow
        </p>
        <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
          {active.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-neutral-700">{active.description}</p>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((activeStep + 1) / workflowSteps.length) * 100}%` }}
          />
        </div>
      </aside>
    </div>
  );
}

export function SmeFaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

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
                  "size-5 shrink-0 text-blue-600 transition",
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
