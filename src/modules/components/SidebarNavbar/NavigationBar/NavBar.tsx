import Image from 'next/image'
import NextLink from 'next/link'

import { NavbarItemTitle } from '../SidebarNavbar'

import ggpVaultTitle from '/public/assets/img/nav/ggp-vault.svg'
import HamburgerIcon from '/public/assets/img/nav/hamburger.svg'

import ConnectButton from '@/common/components/ConnectButton'

type Props = {
  navbarTitle: NavbarItemTitle
  setNavbarTitle: (n: NavbarItemTitle) => void
  setSidebarOpen: (b: boolean) => void
}

export const NavBar = ({ navbarTitle, setNavbarTitle, setSidebarOpen }: Props) => {
  return (
    <>
      <button
        className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:hidden md:border-r md:border-gray-200"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Image alt="Open Sidebar" src={HamburgerIcon} />
      </button>

      <div className="flex flex-1 justify-between pr-4">
        <div className="flex">
          <div className="hidden w-64 shrink-0 items-center px-4 sm:flex md:border-r md:border-r-[#E0E0E0]">
            <NextLink href="/" onClick={() => setNavbarTitle('VALIDATE')}>
              <Image alt="GGP Vault" src={ggpVaultTitle} width={189} />
            </NextLink>
          </div>
          <div className="hidden items-center gap-10 px-4 font-bold text-blue-900 sm:flex">
            {/* <NavItem
              href="/"
              icon={
                <TbVectorBezierCircle
                  color={navbarTitle === 'VALIDATE' ? '#6255F1' : '#0D0959'}
                  size={24}
                />
              }
              navbarTitle={navbarTitle}
              setNavbarTitle={setNavbarTitle}
              title="VALIDATE"
            /> */}
            {/* <NavItem
              href="/liquid-staking"
              icon={
                <ggAVAXTokenIcon fill={navbarTitle === 'LIQUID STAKE' ? '#6255F1' : '#0D0959'} />
              }
              navbarTitle={navbarTitle}
              setNavbarTitle={setNavbarTitle}
              title="LIQUID STAKE"
            /> */}
            {/* <NavItem
              href="/#"
              icon={<GoGoPassIcon fill={navbarTitle === 'GOGO PASS' ? '#6255F1' : '#0D0959'} />}
              navbarTitle={navbarTitle}
              setNavbarTitle={setNavbarTitle}
              title="GOGO PASS"
            /> */}
            {/* Commented this out for now until GoGoPass is ready */}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="ml-4 flex items-center sm:ml-6">
            <ConnectButton />
          </div>
          {/* <div className="flex items-center">
            <HelpButton />
          </div> */}
        </div>
      </div>
    </>
  )
}
