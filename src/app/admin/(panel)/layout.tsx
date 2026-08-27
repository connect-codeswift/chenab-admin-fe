import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden auth-aurora lg:flex-row lg:gap-6 lg:p-5">
      <AdminSidebar />

      {/* Holds the fixed sidebar's column; the sidebar itself is out of flow
          from lg up, and a plain bar above the content below it. */}
      <div aria-hidden className="hidden lg:block lg:w-62 lg:shrink-0" />

      <main
        id="admin-main"
        className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 lg:p-0"
      >
        {children}
      </main>
    </div>
  );
}
