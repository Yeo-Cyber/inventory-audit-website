"use client";

import { useMemo, useState } from "react";

const modules = [
  {
    id: "scan",
    label: "Barcode Scan",
    title: "สแกนแล้วรู้ยอดทันที",
    description:
      "จำลอง workflow หน้างาน: เลือก location, สแกนบาร์โค้ด, ใส่จำนวน และเห็นผลต่างทันทีจากไฟล์ Excel ตั้งต้น",
    metric: "1,248",
    metricLabel: "รายการที่ตรวจนับแล้ว",
    status: "นับเสร็จ 72%",
    rows: [
      ["885-001", "กาแฟคั่วเข้ม", "A1-02", "95", "-5"],
      ["885-118", "น้ำเชื่อมวานิลลา", "B2-01", "48", "0"],
      ["885-204", "แก้ว 16 oz.", "หน้าร้าน", "236", "+16"],
    ],
  },
  {
    id: "trace",
    label: "Traceability",
    title: "ตรวจสอบย้อนหลังได้",
    description:
      "เก็บหลักฐานว่าใครนับอะไร เวลาไหน อยู่โซนใด และรายการไหนควรตรวจซ้ำ เหมาะกับงานที่ต้องการความโปร่งใส",
    metric: "318",
    metricLabel: "audit logs",
    status: "พบ 12 รายการต้องตรวจซ้ำ",
    rows: [
      ["A1-02", "นับโดย Team A", "10:24", "95", "recount"],
      ["B2-01", "นับโดย Team B", "10:31", "48", "approved"],
      ["หน้าร้าน", "นับโดย Team C", "10:45", "236", "review"],
    ],
  },
  {
    id: "fifo",
    label: "FIFO / Lot",
    title: "เห็น lot และของค้างสต๊อก",
    description:
      "รองรับงานที่ต้องแยก lot, expiry date หรือ serial ผ่านการ customize เพิ่ม เพื่อจัดการ FIFO และ dead stock ได้ง่ายขึ้น",
    metric: "24",
    metricLabel: "lot ใกล้หมดอายุ",
    status: "แนะนำตรวจโซน A ก่อน",
    rows: [
      ["LOT-2401", "หมดอายุ 12 วัน", "A1-02", "32", "urgent"],
      ["LOT-2405", "หมดอายุ 38 วัน", "B2-01", "18", "watch"],
      ["LOT-2412", "ปกติ", "C1-04", "74", "ok"],
    ],
  },
  {
    id: "report",
    label: "Excel Report",
    title: "สรุปขาดเกินพร้อมใช้",
    description:
      "แสดงรายงานให้เจ้าของดูง่าย ทั้งยอดตั้งต้น ยอดนับจริง ผลต่าง มูลค่าความเสียหาย และ location ของสินค้า",
    metric: "฿186K",
    metricLabel: "มูลค่าผลต่างที่พบ",
    status: "export Excel/PDF พร้อมส่ง",
    rows: [
      ["SKU-001", "ยอดตั้งต้น 100", "นับได้ 95", "-5", "ขาด"],
      ["SKU-118", "ยอดตั้งต้น 48", "นับได้ 48", "0", "ตรง"],
      ["SKU-204", "ยอดตั้งต้น 220", "นับได้ 236", "+16", "เกิน"],
    ],
  },
];

export function InteractiveShowcase() {
  const [activeId, setActiveId] = useState(modules[0].id);
  const active = useMemo(
    () => modules.find((item) => item.id === activeId) ?? modules[0],
    [activeId],
  );

  return (
    <section className="border-y border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
            Interactive Demo
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
            กดเลือกฟีเจอร์แล้วดูภาพรวมการตรวจนับแบบทันที
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-600">
            โครงสร้างนี้ได้แรงบันดาลใจจากเว็บ WMS ที่นำเสนอความสามารถเป็นหมวด ๆ
            แต่ยังคงสไตล์เดิมของ StockTake Pro: เรียบ ชัด และเน้นตัวเลขที่นำไปใช้ต่อได้จริง
          </p>
          <div className="mt-8 grid gap-3">
            {modules.map((item) => {
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={[
                    "flex items-center justify-between rounded-lg border px-4 py-3 text-left transition",
                    selected
                      ? "border-yellow-400 bg-yellow-50 shadow-sm shadow-yellow-100"
                      : "border-neutral-200 bg-white hover:border-yellow-300 hover:bg-yellow-50/50",
                  ].join(" ")}
                  aria-pressed={selected}
                >
                  <span>
                    <span className="block text-sm font-black text-neutral-950">{item.label}</span>
                    <span className="mt-1 block text-xs font-medium text-neutral-500">{item.status}</span>
                  </span>
                  <span
                    className={[
                      "grid size-8 place-items-center rounded-md text-sm font-black",
                      selected ? "bg-yellow-400 text-neutral-950" : "bg-neutral-100 text-neutral-500",
                    ].join(" ")}
                  >
                    {selected ? "✓" : "+"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 shadow-xl shadow-neutral-200/70">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-neutral-950 px-5 py-4 text-white">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-yellow-300">
                Live Preview
              </p>
              <h3 className="mt-1 text-xl font-black">{active.title}</h3>
            </div>
            <span className="rounded-md bg-yellow-400 px-3 py-1 text-xs font-black text-neutral-950">
              {active.status}
            </span>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-lg border border-neutral-200 bg-white/80 p-5">
              <p className="text-sm leading-6 text-neutral-600">{active.description}</p>
              <div className="mt-6 rounded-lg bg-neutral-950 p-5 text-white">
                <p className="text-4xl font-black tracking-tight">{active.metric}</p>
                <p className="mt-2 text-sm text-neutral-300">{active.metricLabel}</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <span className="rounded-md bg-green-100 px-2 py-2 text-green-700">ตรง</span>
                <span className="rounded-md bg-red-100 px-2 py-2 text-red-700">ขาด</span>
                <span className="rounded-md bg-blue-100 px-2 py-2 text-blue-700">เกิน</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
              <div className="grid grid-cols-5 bg-neutral-100 px-3 py-3 text-xs font-black text-neutral-600">
                <span>Code</span>
                <span>Info</span>
                <span>Location</span>
                <span>Qty</span>
                <span>Status</span>
              </div>
              {active.rows.map((row) => (
                <div
                  key={row.join("-")}
                  className="grid grid-cols-5 border-t border-neutral-200 px-3 py-3 text-xs text-neutral-700"
                >
                  {row.map((cell) => (
                    <span
                      key={cell}
                      className={
                        cell.startsWith("-")
                          ? "font-black text-red-600"
                          : cell.startsWith("+")
                            ? "font-black text-blue-700"
                            : cell === "0" || cell === "approved" || cell === "ok" || cell === "ตรง"
                              ? "font-black text-green-700"
                              : ""
                      }
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

