'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import SignInButton from '@/components/SignInButton'
import { getCookie } from 'cookies-next'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

export default function AuthButtons() {
	const { isConnected, address } = useAccount()
	const [hasValidToken, setHasValidToken] = useState(false)

	useEffect(() => {
		const verifyToken = () => {
			const token = getCookie('token')

			if (token) {
				try {
					// Decode and verify token if needed (not implemented here)
					setHasValidToken(true)
				} catch (error) {
					console.error('Error decoding token:', error)
					setHasValidToken(false)
				}
			} else {
				setHasValidToken(false)
			}
		}

		if (isConnected && address) {
			verifyToken()
		} else {
			setHasValidToken(false)
		}
	}, [isConnected, address])

	return (
		<div>
			{isConnected ? (
				hasValidToken ? (
					<Link
						href="/dashboard"
						className={cn(
							buttonVariants(),
							'text-2xl bg-black/80 backdrop-blur-sm transition-colors duration-125 ease-exponential-smoothing leading-0 rounded-sm border border-secondary-500 hover:border-accent'
						)}
					>
						Continue to Dashboard &rarr;
					</Link>
				) : (
					<SignInButton />
				)
			) : (
				<ConnectWalletButton />
			)}
		</div>
	)
}
