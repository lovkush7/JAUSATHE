import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "../../atoms/admin/AdminSidebar";
import DriverTable from "../../atoms/admin/comp/DriverTable";



export default function AdminDriver() {
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
          <DriverTable/>
        </div>
      </main>

    </SidebarProvider>
  );
}