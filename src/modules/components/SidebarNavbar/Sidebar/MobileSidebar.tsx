import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import NextLink from 'next/link'

import CloseIcon from '/public/assets/img/nav/close.svg'
import ggpVaultTitle from '/public/assets/img/nav/ggp-vault.svg'

import { SideItem } from '../SidebarNavbar'
import SidebarItem from './SidebarItem'

type Props = {
  sidebarOpen: boolean
  validateSidebar: SideItem[]
  liquidSidebar: SideItem[]
  gogoSidebar: SideItem[]
  setSidebarOpen: (b: boolean) => void
}

export default function MobileSidebar({
  gogoSidebar,
  liquidSidebar,
  setSidebarOpen,
  sidebarOpen,
  validateSidebar,
}: Props) {
  return (
    <Transition.Root as={Fragment} show={sidebarOpen}>
      <Dialog as="div" className="relative z-40 sm:hidden" onClose={() => setSidebarOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600/75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <div className="flex shrink-0 items-center justify-between gap-4 px-8">
                <button
                  className="flex h-10 w-10 items-center justify-center focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                  type="button"
                >
                  <span className="sr-only">Close sidebar</span>
                  <Image alt="Close Menu" height={20} src={CloseIcon} width={20} />
                </button>
                <NextLink href="/">
                  <Image alt="GGP Vault" src={ggpVaultTitle} width={189} />
                </NextLink>
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1">
                  {validateSidebar.map((item) => (
                    <span key={item.name}>
                      <SidebarItem item={item} setSidebarOpen={setSidebarOpen} />
                    </span>
                  ))}
                  {liquidSidebar.length > 0 && <hr className="mx-2 border-blue-600"></hr>}
                  {liquidSidebar.map((item) => (
                    <NextLink
                      className="flex w-full items-center text-base"
                      href={item.href}
                      key={item.name}
                      onClick={() => {
                        setSidebarOpen(false)
                      }}
                    >
                      <span
                        className={clsx(
                          window.location.pathname === item.href
                            ? 'bg-indigo-800 text-white'
                            : 'text-indigo-100 hover:bg-indigo-600',
                          'group flex w-full items-center py-6 px-3 text-base font-medium transition-all',
                        )}
                      >
                        <div className="flex gap-2">
                          {item.icon}
                          {item.name}
                        </div>
                      </span>
                    </NextLink>
                  ))}
                  {gogoSidebar.length > 0 && <hr className="mx-2 border-blue-600"></hr>}
                  {gogoSidebar.map((item) => (
                    <NextLink
                      className="flex w-full items-center text-base"
                      href={item.href}
                      key={item.name}
                      onClick={() => {
                        setSidebarOpen(false)
                      }}
                    >
                      <span
                        className={clsx(
                          window.location.pathname === item.href
                            ? 'bg-indigo-800 text-white'
                            : 'text-indigo-100 hover:bg-indigo-600',
                          'group flex w-full items-center py-6 px-3 text-base font-medium transition-all',
                        )}
                      >
                        <div className="flex gap-2">
                          {item.icon}
                          {item.name}
                        </div>
                      </span>
                    </NextLink>
                  ))}
                </nav>
              </div>
              {/* <div className="z-10" style={{ padding: '1rem' }}>
                <BottomBarLinks />
              </div> */}
            </Dialog.Panel>
          </Transition.Child>
          <div aria-hidden="true" className="w-14 shrink-0">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
