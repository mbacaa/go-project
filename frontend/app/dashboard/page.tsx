'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getCookie } from 'cookies-next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Gopher from '@/public/images/gopher.png'
import Image from 'next/image'
import api from '@/lib/axios'

const formatToken = (token: string) => {
	if (!token || token.length <= 10) {
		return token
	}
	return `${token.slice(0, 5)}...${token.slice(-5)}`
}

export default function Dashboard() {
	const [protectedData, setProtectedData] = useState(null)
	const { isConnected, address } = useAccount()
	const token = getCookie('token')
	const formattedToken = formatToken(token as string | '')

	useEffect(() => {
		if (!isConnected || !token) {
			redirect('/')
		} else {
			const fetchProtectedData = async () => {
				try {
					const res = await api.get('/protected', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					setProtectedData(res.data)
				} catch (error) {
					console.error('Error fetching protected data:', error)
				}
			}
			fetchProtectedData()
		}
	}, [isConnected, token])

	return (
		<main className="w-full h-screen flex flex-col overflow-hidden oversroll-none p-10">
			<div className="absolute flex w-full h-full items-end justify-end -z-10 -right-32 -bottom-32 overflow-hidden ">
				<Image src={Gopher} alt="Gopher" className="scale-x-[-1]" />
			</div>

			<div className="flex justify-between">
				<Link
					href="/"
					className="p-2 text-5xl hover:scale-110 ease-in-out transition-all"
				>
					🏠
				</Link>
				<div className="h-fit">
					<ConnectButton />
				</div>
			</div>
			<div className="w-full h-full items-center justify-center flex-1 flex flex-col gap-2 text-2xl">
				<p className="text-7xl max-w-3xl flex text-center font-black mb-10">
					You are authorized to view this page! 🎉
				</p>
			</div>
			{isConnected && address && <p>Your address: {address ? address : ''}</p>}
			{formattedToken && (
				<p className="flex text-center">Your auth token: {formattedToken}</p>
			)}
			<p>Protected data:</p>
			{protectedData && (
				<div className="text-sm flex justify-center">
					<pre>{JSON.stringify(protectedData, null, 2)}</pre>
				</div>
			)}
		</main>
	)
}
