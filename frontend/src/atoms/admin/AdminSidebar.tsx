import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/AdminDashboard",
  },
  {
    title: "Users",
    url: "/admin/users",
  },
  {
    title: "Drivers",
    url: "/admin/Drivers",
  },
  {
    title: "Vehicles",
    url: "/admin/vehicles",
  },
  {
    title: "Rides",
    url: "/admin/rides",
  },
  {
    title: "Fare Config",
    url: "/admin/FareConfig",
  },
  {
    title: "Reviews",
    url: "/admin/Reviews",
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupLabel>
           <p><span className='text-3xl text-purple-700   font-bold'>जाऔँ</span  ><span className='text-3xl text-blue-500 font-bold'>SATHE</span></p>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}