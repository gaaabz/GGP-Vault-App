import clsx from 'clsx'
import NextLink from 'next/link'

import { SideItem } from '../SidebarNavbar'

type Props = {
  item: SideItem
  setSidebarOpen?: (b: boolean) => void
}

export default function SidebarItem({ item, setSidebarOpen }: Props) {
  const isExternalLink = item.href.toLowerCase().includes('http')
  return (
    <NextLink
      className="flex w-full items-center text-base"
      href={item.href}
      key={item.name}
      onClick={setSidebarOpen ? () => setSidebarOpen(false) : undefined}
      target={isExternalLink ? '_blank' : ''}
    >
      <span
        className={clsx(
          window.location.pathname === item.href
            ? 'bg-black text-white'
            : 'text-black hover:bg-gray-200',
          'group flex w-full items-center px-12 py-5 text-base font-semibold transition-all',
        )}
      >
        <div className="flex gap-2">
          <span
            className={clsx(
              window.location.pathname === item.href ? 'text-secondary' : 'text-black',
              'block w-6 flex-none',
            )}
          >
            {item.icon}
          </span>
          {item.name}
        </div>
      </span>
    </NextLink>
  )
}
