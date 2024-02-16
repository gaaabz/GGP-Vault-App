import Image from 'next/image'
import NextLink from 'next/link'
import { HiBars3BottomLeft } from 'react-icons/hi2'

import { NavbarItemTitle } from '../SidebarNavbar'

import ggpVaultTitle from '/public/assets/img/nav/ggp-vault.svg'

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
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <HiBars3BottomLeft aria-hidden="true" className="size-6" />
      </button>

      <div className="flex flex-1 justify-between pr-4">
        <div className="flex">
          <div className="hidden w-64 shrink-0 items-center border-r border-r-[#E0E0E0] px-4 sm:flex">
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
