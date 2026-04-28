export default function HomePage() {
  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Inventory Audit Solution
      </h1>

      <p className="text-lg mb-6">
        บริการตรวจนับสต๊อกสินค้า + Software + Hardware
        สำหรับธุรกิจที่ต้องการความถูกต้อง 100%
      </p>

      <div className="flex gap-4 mb-10">
        <a href="/contact" className="bg-black text-white px-4 py-2 rounded">
          ขอ Demo
        </a>
        <a href="/how-it-works" className="border px-4 py-2 rounded">
          ดูวิธีทำงาน
        </a>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">ปัญหาที่เราช่วยแก้</h2>
        <ul className="list-disc ml-6">
          <li>สต๊อกไม่ตรง</li>
          <li>ของหายโดยไม่รู้สาเหตุ</li>
          <li>ใช้ Excel แล้วควบคุมยาก</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Solution ของเรา</h2>
        <ul className="list-disc ml-6">
          <li>บริการรับจ้างตรวจนับสต๊อก</li>
          <li>Software สำหรับนับเอง (Excel-based)</li>
          <li>Hardware Scanner เพิ่มความเร็ว</li>
        </ul>
      </section>
    </main>
  );
}