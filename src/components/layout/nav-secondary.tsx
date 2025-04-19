import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SupportDialog } from "@/components/dialogs/support-dialog";
import { FeedbackDialog } from "@/components/dialogs/feedback-dialog";

export function NavSecondary() {

  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SupportDialog/>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <FeedbackDialog/>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}