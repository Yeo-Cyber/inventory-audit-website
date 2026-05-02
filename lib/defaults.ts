export const defaultSiteConfig = {
  name: "StockTake Pro",
  url: "https://stocktake-pro-inventory.vercel.app",
  description:
    "StockTake Pro ให้บริการตรวจนับสต๊อกสินค้า จำหน่ายซอฟต์แวร์ตรวจนับผ่าน Excel และอุปกรณ์สแกนบาร์โค้ดสำหรับ SME โรงงาน คลังสินค้า และ Hypermarket",
};

export const defaultNavigation = [
  { label: "หน้าแรก", href: "/", sort_order: 1 },
  { label: "เกี่ยวกับเรา", href: "/about", sort_order: 2 },
  { label: "บริการ", href: "/services", sort_order: 3 },
  { label: "โซลูชัน", href: "/projects", sort_order: 4 },
  { label: "ผลงานที่ผ่านมา", href: "/reference", sort_order: 5 },
  { label: "ติดต่อเรา", href: "/contact", sort_order: 6 },
];

export const defaultHomepage = {
  eyebrow: "Inventory Audit Service + Software + Hardware",
  hero_title: "ตรวจนับสต๊อกให้รู้ยอดจริง โดยเริ่มจาก Excel ที่คุณมีอยู่แล้ว",
  hero_subtitle:
    "บริการตรวจนับสินค้า ซอฟต์แวร์สแกนบาร์โค้ดแบบไม่ต้องมี database และชุดอุปกรณ์ที่เปลี่ยนมือถือให้เป็นเครื่องตรวจนับสต๊อก สำหรับ SME โรงงาน คลังสินค้า และงานระดับ Hypermarket",
  primary_cta_text: "ขอคำปรึกษาฟรี",
  primary_cta_href: "/contact",
  secondary_cta_text: "ดูแพ็กเกจบริการ",
  secondary_cta_href: "/services",
  banner_image: "/stocktake-dashboard.svg",
  logo_url: "",
};

export const defaultAbout = {
  eyebrow: "About StockTake Pro",
  hero_image_url: "",
  business_image_url: "",
  process_image_url: "",
  trust_image_url: "",
  cta_image_url: "",
  title: "เราไม่ได้ขายแค่การนับของ แต่ขายตัวเลขที่เจ้าของธุรกิจเชื่อถือได้",
  description:
    "ธุรกิจจำนวนมากมียอดในระบบ แต่ไม่รู้ว่าสินค้าจริงอยู่ตรงไหน ขาดเท่าไหร่ หรือเงินจมอยู่กับสินค้าอะไร StockTake Pro จึงออกแบบบริการและซอฟต์แวร์ให้ตอบคำถามสำคัญที่สุด: มีเท่าไหร่ นับได้เท่าไหร่ ขาดเกินเท่าไหร่ และสินค้าอยู่ที่ไหน",
  model_label: "Business Model",
  model_title: "Hybrid: Service + Software + Hardware",
  model_description:
    "ลูกค้ารายเล็กใช้แอปและมือถือสแกนเองได้ ลูกค้าที่มีงานหนักซื้อ Pro Mobile Kit เพิ่มได้ และลูกค้าระดับโรงงานหรือ hypermarket ใช้บริการทีมคุมงานพร้อมอุปกรณ์เช่าได้ในโมเดลเดียวกัน",
  value_1_title: "นับจากของจริง",
  value_1_description:
    "ใช้แนวคิด Blind Count ลดการนับให้ตรงตัวเลขเดิม และช่วยให้เจ้าของเห็นความจริงของสต๊อก",
  value_2_title: "เริ่มจากระบบเดิม",
  value_2_description:
    "ไม่บังคับเปลี่ยน ERP หรือสร้าง database ใหม่ ลูกค้าเริ่มได้จาก Excel ที่มีอยู่แล้ว",
  value_3_title: "ต่อยอดเป็นระบบใหญ่",
  value_3_description:
    "เริ่มจากมือถือเครื่องเดียว แล้วขยายเป็น hardware kit, supervisor และ local sync สำหรับงานใหญ่ได้",
};

export const defaultMetrics = [
  { value: "Excel", label: "ใช้ไฟล์ตั้งต้นของลูกค้า ไม่ต้องมี database กลาง" },
  { value: "Offline", label: "สแกนและตรวจนับได้แม้ไม่มีอินเทอร์เน็ต" },
  { value: "Report", label: "รู้ทันทีว่ามีเท่าไหร่ นับได้เท่าไหร่ ขาดเกินเท่าไหร่" },
];

export const defaultServices = [
  {
    label: "Service",
    title: "รับจ้างตรวจนับสต๊อกสินค้า",
    description:
      "ทีมงานเข้าหน้างาน ตรวจนับแบบ Blind Count เทียบยอดกับไฟล์ตั้งต้น และส่งรายงานผลต่างที่ตรวจสอบย้อนหลังได้",
    image_url: "",
    sort_order: 1,
  },
  {
    label: "Software",
    title: "แอปตรวจนับจากไฟล์ Excel",
    description:
      "นำเข้า Excel สแกนบาร์โค้ด ใส่จำนวน ระบุตำแหน่ง และ export รายงานโดยไม่ต้องเก็บข้อมูลบน cloud",
    image_url: "",
    sort_order: 2,
  },
  {
    label: "Hardware",
    title: "Mobile Scanner Kit",
    description:
      "เปลี่ยนมือถือเป็นเครื่องตรวจนับด้วย Bluetooth barcode scanner, ring scanner หรือ handheld ที่เหมาะกับงานหนัก",
    image_url: "",
    sort_order: 3,
  },
  {
    label: "Enterprise",
    title: "Hybrid Audit สำหรับคลังขนาดใหญ่",
    description:
      "รองรับทีมหลายคน การรวมไฟล์ การเช่าอุปกรณ์ และ supervisor คุมงานสำหรับโรงงานหรือ hypermarket",
    image_url: "",
    sort_order: 4,
  },
];

export const defaultSolutions = [
  {
    label: "SME / Online Seller",
    title: "ตรวจนับคลังสินค้าออนไลน์",
    description:
      "ช่วยเจ้าของกิจการรู้ยอดจริง สินค้าขาดเกิน และตำแหน่งจัดเก็บ โดยเริ่มจากไฟล์ Excel เดิมที่ใช้อยู่",
    image_url: "",
    sort_order: 1,
  },
  {
    label: "Restaurant / Cafe",
    title: "ตรวจวัตถุดิบและของเสีย",
    description:
      "ตรวจรอบสั้นทุกเดือน เพื่อหาของหาย ของหมดอายุ และต้นทุนจมจากวัตถุดิบที่ควบคุมยาก",
    image_url: "",
    sort_order: 2,
  },
  {
    label: "Factory / Warehouse",
    title: "ตรวจนับเพื่อปิดงบและควบคุมการผลิต",
    description:
      "รองรับ barcode เป็นหลัก และเปิดทาง customize QR code สำหรับ lot, expiry date หรือ serial number",
    image_url: "",
    sort_order: 3,
  },
];

export const defaultSoftware = [
  {
    label: "Mobile App",
    title: "Excel Scan Application",
    description:
      "แอปสำหรับนำเข้าไฟล์ Excel ตั้งต้น สแกนบาร์โค้ด ใส่ยอดนับจริง ระบุตำแหน่ง และ export รายงานขาด/เกิน",
    image_url: "/stocktake-dashboard.svg",
    sort_order: 1,
  },
  {
    label: "Dashboard",
    title: "Owner Report Dashboard",
    description:
      "หน้าสรุปสำหรับเจ้าของกิจการ ดูยอดตั้งต้น ยอดนับจริง ผลต่าง มูลค่าความเสียหาย และรายการที่ควรตรวจซ้ำ",
    image_url: "/stocktake-dashboard.svg",
    sort_order: 2,
  },
];

export const defaultHardware = [
  {
    label: "Scanner",
    title: "Bluetooth Barcode Scanner",
    description:
      "อุปกรณ์สแกนบาร์โค้ดเชื่อมต่อมือถือ เหมาะกับทีมที่ต้องนับหลายพันรายการและต้องการความเร็วสูงกว่ากล้องมือถือ",
    image_url: "/references/sme-warehouse.svg",
    sort_order: 1,
  },
  {
    label: "Kit",
    title: "Mobile Scanner Kit",
    description:
      "ชุดมือถือ + scanner + workflow สำหรับงานหน้างานที่ต้องการลด downtime และเพิ่มความแม่นยำ",
    image_url: "/references/factory-audit.svg",
    sort_order: 2,
  },
];

export const defaultPricing = [
  {
    label: "เริ่มต้น",
    title: "Software Only",
    price: "เริ่มต้นประหยัด",
    description: "ใช้กล้องมือถือสแกน barcode และ export Excel report ได้ทันที",
    image_url: "",
    sort_order: 1,
  },
  {
    label: "ยอดนิยม",
    title: "Pro Mobile Kit",
    price: "สแกนเร็วขึ้น",
    description: "แอปพร้อม Bluetooth scanner สำหรับทีมที่ต้องนับหลายพันรายการ",
    image_url: "",
    sort_order: 2,
  },
  {
    label: "งานโครงการ",
    title: "Managed Audit",
    price: "มีทีมคุมงาน",
    description: "ส่ง supervisor พร้อมอุปกรณ์และ workflow สำหรับงานตรวจนับจริง",
    image_url: "",
    sort_order: 3,
  },
];

export const defaultReferences = [
  {
    label: "คลังสินค้า SME",
    title: "ตรวจนับคลังสินค้าออนไลน์ 3,200 SKU",
    description:
      "นำไฟล์ Excel ตั้งต้นของลูกค้าเข้า workflow ตรวจนับด้วย barcode และสรุปรายการขาด/เกินสำหรับปรับยอดหลังบ้าน",
    location: "กรุงเทพฯ",
    period: "Q1/2026",
    image_url: "/references/sme-warehouse.svg",
    results: "นับจบใน 1 วัน\nระบุตำแหน่งสินค้าได้ทุกโซน\nส่งรายงาน Excel พร้อม variance",
    sort_order: 1,
  },
  {
    label: "โรงงานผลิต",
    title: "ตรวจนับวัตถุดิบเพื่อปิดงบประจำปี",
    description:
      "จัดทีมตรวจนับร่วมกับฝ่ายคลังและฝ่ายบัญชี แยกรายงานตาม location, barcode และยอดผลต่างเพื่อใช้ตรวจสอบภายใน",
    location: "ชลบุรี",
    period: "Year-end Audit",
    image_url: "/references/factory-audit.svg",
    results: "รองรับหลาย location\nมี audit trail รายการนับ\nพร้อมแนบหลักฐานภาพหน้างาน",
    sort_order: 2,
  },
  {
    label: "ร้านอาหารหลายสาขา",
    title: "ตรวจนับวัตถุดิบและสินค้าสิ้นเปลือง",
    description:
      "ตรวจนับวัตถุดิบรอบสั้นเพื่อหาของหาย ของหมดอายุ และต้นทุนจม พร้อมรายงานสรุปให้เจ้าของกิจการดูง่าย",
    location: "นนทบุรี",
    period: "Monthly Check",
    image_url: "/references/restaurant-stock.svg",
    results: "เห็นของขาด/เกินรายสาขา\nลดเวลารวมยอดด้วย Excel report\nเหมาะกับการตรวจซ้ำทุกเดือน",
    sort_order: 3,
  },
];

export const defaultCustomerLogos = [
  {
    label: "Customer",
    title: "SME Warehouse",
    description: "ลูกค้ากลุ่มคลังสินค้า SME",
    image_url: "",
    href: "",
    sort_order: 1,
  },
  {
    label: "Customer",
    title: "Factory Audit",
    description: "ลูกค้ากลุ่มโรงงานและคลังวัตถุดิบ",
    image_url: "",
    href: "",
    sort_order: 2,
  },
  {
    label: "Customer",
    title: "Restaurant Chain",
    description: "ลูกค้ากลุ่มร้านอาหารหลายสาขา",
    image_url: "",
    href: "",
    sort_order: 3,
  },
  {
    label: "Customer",
    title: "Online Seller",
    description: "ลูกค้ากลุ่มร้านค้าออนไลน์",
    image_url: "",
    href: "",
    sort_order: 4,
  },
];

export const defaultContact = {
  email: "sales@stocktakepro.example",
  phone: "02-014-0128",
  service_area: "กรุงเทพฯ ปริมณฑล และงานโครงการทั่วประเทศ",
  address: "กรุงเทพฯ และให้บริการทั่วประเทศ",
};
