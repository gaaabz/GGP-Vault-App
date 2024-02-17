import { SideItem } from '../SidebarNavbar'
import SidebarItem from './SidebarItem'

type Props = {
  sidebarItems: SideItem[]
}

export default function DesktopSidebar({ sidebarItems }: Props) {
  return (
    <div className="relative hidden border-r border-r-[#E0E0E0] sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col overflow-y-auto bg-white pt-[88px]">
        <div className="flex flex-1 flex-col">
          <nav className="flex flex-1 flex-col gap-2">
            {sidebarItems.map((item) => (
              <span key={item.name}>
                <SidebarItem item={item} />
              </span>
            ))}
          </nav>
        </div>
        {/* <div className="z-10" style={{ padding: '1rem' }}>
          <BottomBarLinks />
        </div> */}
      </div>
    </div>
  )
}
