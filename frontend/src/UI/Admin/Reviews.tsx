import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "../../atoms/admin/AdminSidebar";
import LiveActivity from "../../atoms/admin/comp/LiveActivity";



export default function Reviews() {
  return (
    <SidebarProvider>

      <AdminSidebar />

      <main className="flex-1">
        <div className="flex items-center gap-2 border-b p-4">
          <SidebarTrigger />

          <h1 className="text-xl font-semibold">
            Admin Dashboard
          </h1>
        </div>

        <div className="p-6">
          {/* Dashboard content */}
          <LiveActivity/>
          
        </div>
      </main>

    </SidebarProvider>
  );
}