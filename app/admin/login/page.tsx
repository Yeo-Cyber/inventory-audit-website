import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-100 px-6">
      <div className="w-full max-w-md">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
          StockTake CMS
        </p>
        <h1 className="mt-3 text-3xl font-black text-neutral-950">Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          เข้าสู่ระบบเพื่อแก้ไขเนื้อหา รูปภาพ เมนู และข้อมูลติดต่อของเว็บไซต์
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
