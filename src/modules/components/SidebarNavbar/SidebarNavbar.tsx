import { ReactNode, useState } from 'react'

import { FaHammer, FaRegCompass } from 'react-icons/fa'
import { LuArrowDownUp } from 'react-icons/lu'

import { NavBar } from './NavigationBar/NavBar'
import DesktopSidebar from './Sidebar/DesktopSidebar'
import MobileSidebar from './Sidebar/MobileSidebar'

export type SideItem = {
  name: string
  href: string
  icon: ReactNode
}

export type NavbarItemTitle = 'VALIDATE'

const validateSidebar = [
  {
    name: 'GGP Vault',
    href: '/',
    icon: <FaRegCompass color="#fff" size={24} />,
  },
]

const liquidSidebar = [
  {
    name: 'Liquid Stake',
    href: '/liquid-staking/',
    icon: <LuArrowDownUp color="#fff" size={24} />,
  },
]

const gogoSidebar = [
  {
    name: 'GoGo Pass',
    href: '/work-in-progress/',
    icon: <FaHammer color="#fff" size={24} />,
  },
]

const sidebarMap: { [key in NavbarItemTitle]: any[] } = {
  VALIDATE: validateSidebar,
}

export function SidebarNavbar({ children }: { children: ReactNode }) {
  const currentPath: NavbarItemTitle = 'VALIDATE'

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navbarTitle, setNavbarTitle] = useState<NavbarItemTitle>(currentPath)

  const currentSidebar = sidebarMap[navbarTitle]

  return (
    <div className="h-full">
      <div className="fixed top-0 z-10 flex h-16 w-full shrink-0 bg-white shadow">
        <NavBar
          navbarTitle={navbarTitle}
          setNavbarTitle={setNavbarTitle}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      {/* Dynamic Mobile Sidebar */}
      <MobileSidebar
        gogoSidebar={gogoSidebar}
        liquidSidebar={liquidSidebar}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        validateSidebar={validateSidebar}
      />

      {/* Static Desktop Sidebar */}
      <DesktopSidebar sidebarItems={currentSidebar} />

      {/* Main Page Content */}
      <div className="flex h-full flex-1 flex-col sm:pl-64">
        <main className="h-full pt-16">{children}</main>
      </div>
    </div>
  )
}
