import { notFound } from "next/navigation";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import {
  getAboutInfo,
  getContactInfo,
  getCustomerLogos,
  getCustomerReference,
  getHardwareProducts,
  getPricingPackages,
  getProjectDetails,
  getReferenceCases,
  getServices,
  getServicesPage,
  getSolutions,
  getSoftwareProducts,
  supabaseRequest,
} from "@/lib/cms";

const fields = {
  services: [
    { name: "label", label: "Label" },
    { name: "title", label: "Title" },
    { name: "description", label: "Description", type: "textarea" as const },
    { name: "benefit", label: "Benefit Text", type: "textarea" as const },
    { name: "features", label: "Feature List (1 line per item)", type: "textarea" as const },
    { name: "icon_key", label: "Icon Key: service / software / hardware / enterprise" },
    { name: "tone", label: "Card Color: blue / green / purple / yellow" },
    { name: "cta_text", label: "Card CTA Text" },
    { name: "cta_href", label: "Card CTA Link" },
    { name: "image_url", label: "Service Image", type: "image" as const },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
  solution: [
    { name: "label", label: "กลุ่มลูกค้า / Industry" },
    { name: "title", label: "ชื่อโซลูชัน" },
    { name: "description", label: "รายละเอียดโซลูชัน", type: "textarea" as const },
    { name: "image_url", label: "รูปโซลูชัน", type: "image" as const },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
  "project-details": [
    { name: "slug", label: "Slug เช่น sme-online-seller" },
    { name: "label", label: "กลุ่มลูกค้า / Industry" },
    { name: "title", label: "หัวข้อหลัก" },
    { name: "subtitle", label: "Subtitle", type: "textarea" as const },
    { name: "detailTitle", label: "Detail Page - Hero Title" },
    { name: "detailSubtitle", label: "Detail Page - Hero Subtitle", type: "textarea" as const },
    { name: "badges", label: "Hero Badges (1 line per badge)", type: "textarea" as const },
    { name: "detailHeroImage", label: "Detail Page - Hero Image", type: "image" as const },
    { name: "detailSolutionImage", label: "Detail Page - Solution Image", type: "image" as const },
    { name: "heroImage", label: "Hero Image", type: "image" as const },
    { name: "heroAlt", label: "Hero Image Alt Text" },
    { name: "solutionImage", label: "Solution Image", type: "image" as const },
    { name: "solutionAlt", label: "Solution Image Alt Text" },
    { name: "painIntro", label: "Pain Point Section - Intro", type: "textarea" as const },
    { name: "painPointCards", label: "Pain Point Cards: title | description | icon", type: "textarea" as const },
    { name: "solutionTitle", label: "Solution Section - Title" },
    { name: "solutionDescription", label: "Solution Section - Description", type: "textarea" as const },
    { name: "solutionBullets", label: "Solution Bullets (1 line per bullet)", type: "textarea" as const },
    { name: "workflowSteps", label: "Workflow Steps: title | description | icon", type: "textarea" as const },
    { name: "reportCards", label: "Report Cards: title | description | icon", type: "textarea" as const },
    { name: "benefits", label: "KPI / Benefit Cards (1 line per benefit)", type: "textarea" as const },
    { name: "gallery_urls", label: "Gallery Images", type: "gallery" as const },
    { name: "faqs", label: "FAQ: question | answer", type: "textarea" as const },
    { name: "ctaTitle", label: "Bottom CTA Title", type: "textarea" as const },
    { name: "painPoints", label: "Pain Point (1 บรรทัดต่อ 1 ข้อ)", type: "textarea" as const },
    { name: "solutions", label: "Solution (1 บรรทัดต่อ 1 ข้อ)", type: "textarea" as const },
    { name: "scopeOfWork", label: "Scope of Work (1 บรรทัดต่อ 1 ข้อ)", type: "textarea" as const },
    { name: "process", label: "Process ขั้นตอนการทำงาน (1 บรรทัดต่อ 1 ข้อ)", type: "textarea" as const },
    { name: "deliverables", label: "Deliverables (1 บรรทัดต่อ 1 ข้อ)", type: "textarea" as const },
    { name: "kpis", label: "KPI / Business Benefit (1 บรรทัดต่อ 1 ข้อ)", type: "textarea" as const },
    { name: "recommended_package_title", label: "Recommended Package - Title" },
    { name: "recommended_package_description", label: "Recommended Package - Description", type: "textarea" as const },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
  software: [
    { name: "label", label: "Label" },
    { name: "title", label: "Product Name" },
    { name: "description", label: "Description", type: "textarea" as const },
    { name: "image_url", label: "Product Image", type: "image" as const },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
  hardware: [
    { name: "label", label: "Label" },
    { name: "title", label: "Product Name" },
    { name: "description", label: "Description", type: "textarea" as const },
    { name: "image_url", label: "Product Image", type: "image" as const },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
  pricing: [
    { name: "label", label: "Label" },
    { name: "title", label: "Package Name" },
    { name: "price", label: "Price Text" },
    { name: "description", label: "Description", type: "textarea" as const },
    { name: "image_url", label: "Package Image", type: "image" as const },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
  reference: [
    { name: "label", label: "ประเภทลูกค้า" },
    { name: "title", label: "ชื่องาน Reference" },
    { name: "description", label: "รายละเอียดงาน", type: "textarea" as const },
    { name: "details", label: "รายละเอียดเพิ่มเติม", type: "textarea" as const },
    { name: "location", label: "พื้นที่/จังหวัด" },
    { name: "period", label: "ช่วงเวลา" },
    { name: "results", label: "ผลลัพธ์ (1 บรรทัดต่อ 1 ข้อ)", type: "textarea" as const },
    { name: "customer_logo_url", label: "โลโก้ลูกค้า", type: "image" as const },
    { name: "image_url", label: "รูปผลงาน", type: "image" as const },
    { name: "gallery_urls", label: "รูปรายละเอียด Reference (สูงสุด 10 รูป)", type: "gallery" as const },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
  "customer-logos": [
    { name: "title", label: "ชื่อลูกค้า / ชื่อโลโก้" },
    { name: "label", label: "ประเภท / หมวดหมู่" },
    { name: "description", label: "คำอธิบายภายใน CMS", type: "textarea" as const },
    { name: "image_url", label: "ไฟล์โลโก้", type: "image" as const },
    { name: "href", label: "ลิงก์เมื่อคลิกโลโก้ (ไม่บังคับ)" },
    { name: "sort_order", label: "Sort Order", type: "number" as const },
  ],
};

type Params = {
  section: string;
};

function toRows(items: Array<Record<string, unknown>>) {
  return items.map((item) => ({
    id: typeof item.id === "string" ? item.id : undefined,
    data: Object.fromEntries(
      Object.entries(item)
        .filter(([key]) => !["id", "section", "sort_order"].includes(key))
        .flatMap(([key, value]) => {
          if (key === "recommendedPackage" && value && typeof value === "object" && !Array.isArray(value)) {
            const recommendedPackage = value as { title?: unknown; description?: unknown };

            return [
              ["recommended_package_title", recommendedPackage.title == null ? "" : String(recommendedPackage.title)],
              [
                "recommended_package_description",
                recommendedPackage.description == null ? "" : String(recommendedPackage.description),
              ],
            ];
          }

          return [[key, Array.isArray(value) ? value.join("\n") : value == null ? "" : String(value)]];
        }),
    ),
    sort_order: typeof item.sort_order === "number" ? item.sort_order : 100,
  }));
}

export default async function AdminSectionPage({ params }: { params: Promise<Params> }) {
  const { section } = await params;

  if (section === "about") {
    const about = await getAboutInfo();
    return (
      <AdminEditor
        title="เกี่ยวกับเรา"
        mode="content"
        contentKey="about"
        initialContent={about}
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "hero_image_url", label: "About Hero Image", type: "image" },
          { name: "business_image_url", label: "Business Model Image", type: "image" },
          { name: "process_image_url", label: "Process / Workflow Image", type: "image" },
          { name: "trust_image_url", label: "Trust & Output Image", type: "image" },
          { name: "cta_image_url", label: "CTA Background Image", type: "image" },
          { name: "title", label: "หัวข้อหลัก", type: "textarea" },
          { name: "description", label: "รายละเอียดหลัก", type: "textarea" },
          { name: "model_label", label: "หัวข้อย่อย Business Model" },
          { name: "model_title", label: "หัวข้อโมเดลธุรกิจ" },
          { name: "model_description", label: "รายละเอียดโมเดลธุรกิจ", type: "textarea" },
          { name: "value_1_title", label: "จุดเด่น 1 - หัวข้อ" },
          { name: "value_1_description", label: "จุดเด่น 1 - รายละเอียด", type: "textarea" },
          { name: "value_2_title", label: "จุดเด่น 2 - หัวข้อ" },
          { name: "value_2_description", label: "จุดเด่น 2 - รายละเอียด", type: "textarea" },
          { name: "value_3_title", label: "จุดเด่น 3 - หัวข้อ" },
          { name: "value_3_description", label: "จุดเด่น 3 - รายละเอียด", type: "textarea" },
        ]}
      />
    );
  }

  if (section === "services") {
    const servicesPage = await getServicesPage();
    const services = await getServices();

    return (
      <div className="grid gap-10">
        <AdminEditor
          title="Services Page Content"
          mode="content"
          contentKey="services_page"
          initialContent={servicesPage}
          fields={[
            { name: "eyebrow", label: "Hero Eyebrow" },
            { name: "hero_image_url", label: "Hero Image", type: "image" },
            { name: "hero_title", label: "Hero Title", type: "textarea" },
            { name: "hero_description", label: "Hero Description", type: "textarea" },
            { name: "primary_cta_text", label: "Primary CTA Text" },
            { name: "primary_cta_href", label: "Primary CTA Link" },
            { name: "secondary_cta_text", label: "Secondary CTA Text" },
            { name: "secondary_cta_href", label: "Secondary CTA Link" },
            { name: "visual_label", label: "Visual Card Label" },
            { name: "visual_image_url", label: "Visual Card Image", type: "image" },
            { name: "visual_report_title", label: "Visual Report Title" },
            { name: "visual_report_description", label: "Visual Report Description", type: "textarea" },
            { name: "service_section_eyebrow", label: "Service Cards Section Eyebrow" },
            { name: "service_section_image_url", label: "Service Cards Section Image", type: "image" },
            { name: "service_section_title", label: "Service Cards Section Title", type: "textarea" },
            { name: "upgrade_eyebrow", label: "Upgrade Section Eyebrow" },
            { name: "upgrade_image_url", label: "Upgrade Section Image", type: "image" },
            { name: "upgrade_title", label: "Upgrade Section Title", type: "textarea" },
            { name: "upgrade_description", label: "Upgrade Section Description", type: "textarea" },
            { name: "level_1_title", label: "Level 1 Title" },
            { name: "level_1_image_url", label: "Level 1 Image", type: "image" },
            { name: "level_1_description", label: "Level 1 Description", type: "textarea" },
            { name: "level_2_title", label: "Level 2 Title" },
            { name: "level_2_image_url", label: "Level 2 Image", type: "image" },
            { name: "level_2_description", label: "Level 2 Description", type: "textarea" },
            { name: "level_3_title", label: "Level 3 Title" },
            { name: "level_3_image_url", label: "Level 3 Image", type: "image" },
            { name: "level_3_description", label: "Level 3 Description", type: "textarea" },
            { name: "cta_eyebrow", label: "Bottom CTA Eyebrow" },
            { name: "cta_image_url", label: "Bottom CTA Background Image", type: "image" },
            { name: "cta_title", label: "Bottom CTA Title", type: "textarea" },
            { name: "cta_description", label: "Bottom CTA Description", type: "textarea" },
            { name: "cta_button_text", label: "Bottom CTA Button Text" },
            { name: "cta_button_href", label: "Bottom CTA Button Link" },
          ]}
        />
        <AdminEditor
          title="Service Cards"
          mode="collection"
          section="services"
          fields={fields.services}
          initialRows={toRows(services)}
        />
      </div>
    );
  }

  if (section === "contact") {
    const contact = await getContactInfo();
    return (
      <AdminEditor
        title="Contact"
        mode="content"
        contentKey="contact"
        initialContent={contact}
        fields={[
          { name: "email", label: "Email" },
          { name: "phone", label: "Phone" },
          { name: "service_area", label: "Service Area", type: "textarea" },
          { name: "address", label: "Address", type: "textarea" },
        ]}
      />
    );
  }

  if (section === "customer-logos") {
    const customerReference = await getCustomerReference();
    const customerLogos = await getCustomerLogos();

    return (
      <div className="grid gap-10">
        <AdminEditor
          title="OUR CUSTOMER REFERENCED - Section Text"
          mode="content"
          contentKey="customer_reference"
          initialContent={customerReference}
          fields={[
            { name: "eyebrow", label: "Eyebrow / ข้อความเล็กด้านบน" },
            { name: "title", label: "Section Title / หัวข้อหลัก" },
            { name: "description", label: "Admin Note / คำอธิบายใน CMS", type: "textarea" },
          ]}
        />
        <AdminEditor
          title="OUR CUSTOMER REFERENCED - Customer Logos"
          mode="collection"
          section="customer_logos"
          fields={fields["customer-logos"]}
          initialRows={toRows(customerLogos)}
        />
      </div>
    );
  }

  if (section === "media") {
    const media = await supabaseRequest<Array<{ id: string; url: string; alt_text: string; path: string }>>(
      "/rest/v1/media_files?select=*&order=created_at.desc",
      {},
      true,
    );
    return <MediaLibrary initialMedia={media ?? []} />;
  }

  const config = fields[section as keyof typeof fields];

  if (!config) {
    notFound();
  }

  const loaders = {
    services: getServices,
    solution: getSolutions,
    "project-details": getProjectDetails,
    software: getSoftwareProducts,
    hardware: getHardwareProducts,
    pricing: getPricingPackages,
    reference: getReferenceCases,
  };
  const items = await loaders[section as keyof typeof loaders]();
  const collectionSection =
    section === "customer-logos" ? "customer_logos" : section === "project-details" ? "project_details" : section;

  return (
    <AdminEditor
      title={
        section === "customer-logos"
          ? "Customer Logos"
          : section === "project-details"
            ? "Solution Details"
            : section.charAt(0).toUpperCase() + section.slice(1)
      }
      mode="collection"
      section={collectionSection}
      fields={config}
      initialRows={toRows(items)}
    />
  );
}
