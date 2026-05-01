import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminLoggedIn } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
