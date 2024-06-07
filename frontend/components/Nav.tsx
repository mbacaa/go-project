'use client'

import Image from 'next/image'
import Logo from '../public/images/branding/logo-small.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

export default function Nav() {
	const pathname = usePathname()

	const navLinks = {
		dashboard: '/dashboard',
		map: '/map',
	}

	return (
		<nav className="flex justify-between items-center w-full">
			<div className="flex items-center space-x-8">
				<Link href="/">
					<Image
						src={Logo}
						alt="Galactic Reborn Logo"
						className="hover:opacity-80 transition-opacity duration-125 ease-exponential-smoothing"
					/>
				</Link>
				{Object.entries(navLinks).map(([name, path]) => (
					<Link
						key={name}
						href={path}
						className={cn(
							'text-3xl mt-1.5 hover:opacity-85 transition-opacity duration-125 ease-exponential-smoothing',
							pathname === path && 'text-accent'
						)}
					>
						{name.toUpperCase()}
					</Link>
				))}
			</div>
			<Button className="text-xl mt-1.5 border border-secondary-500 rounded-sm pb-1 hover:border-accent transition-colors duration-125 ease-exponential-smoothing">
				0x122121dk...121
			</Button>
		</nav>
	)
}
