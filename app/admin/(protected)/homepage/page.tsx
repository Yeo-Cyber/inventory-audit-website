import { AdminEditor } from "@/components/admin/AdminEditor";
import { defaultHomepage } from "@/lib/defaults";
import { getHomepage, getNavigation } from "@/lib/cms";

export default async function HomepageAdminPage() {
  const [homepage, navItems] = await Promise.all([getHomepage(), getNavigation()]);

  return (
    <div className="grid gap-10">
      <AdminEditor
        title="Homepage"
        mode="content"
        contentKey="homepage"
        initialContent={homepage}
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "hero_title", label: "Hero Title", type: "textarea" },
          { name: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
          { name: "primary_cta_text", label: "Primary CTA Text" },
          { name: "primary_cta_href", label: "Primary CTA Link" },
          { name: "secondary_cta_text", label: "Secondary CTA Text" },
          { name: "secondary_cta_href", label: "Secondary CTA Link" },
          { name: "banner_image", label: "Banner Image", type: "image" },
          { name: "logo_url", label: "Logo Image", type: "image" },
        ]}
      />
      <AdminEditor
        title="Navigation Menu"
        mode="navigation"
        fields={[
          { name: "label", label: "Menu Label" },
          { name: "href", label: "URL" },
          { name: "sort_order", label: "Sort Order", type: "number" },
        ]}
        initialContent={defaultHomepage}
        initialRows={navItems.map((item) => ({
          id: "id" in item ? String(item.id) : undefined,
          data: { label: item.label, href: item.href },
          sort_order: item.sort_order,
        }))}
      />
    </div>
  );
}
