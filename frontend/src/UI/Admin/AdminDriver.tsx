import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "../../atoms/admin/AdminSidebar";
import DriverTable from "../../atoms/admin/comp/DriverTable";
import { SectionCards } from "../../atoms/admin/comp/section_card";
import { DriverSectionCards } from "../../atoms/admin/comp/DriverSection";



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
          <div className="rounded-xl bg-muted/50 md:col-span-2">
            <DriverSectionCards />
          </div>
          <DriverTable />
        </div>
      </main>

    </SidebarProvider>
  );
}