'use client'

import { useSignMessage, useAccount } from 'wagmi'
import { toast } from 'sonner'
import api from '../lib/axios'
import { Button } from './ui/button'
import { setCookie } from 'cookies-next'

export default function SignInButton() {
	const { address } = useAccount()
	const { signMessageAsync } = useSignMessage()

	const getMessage = async () => {
		const res = await api.get(`/auth/message?address=${address}`)
		console.log(res.data)
		return res.data
	}

	const loginWithEthereum = async () => {
		const message = await getMessage()
		const signature = await signMessageAsync({ message: message.text })

		try {
			const res = await api.post('/auth/signin', {
				address,
				signature,
			})

			setCookie('token', res.data.token, {
				path: '/',
				maxAge: 30 * 24 * 60 * 60,
				sameSite: 'strict',
				secure: true,
			})
			setCookie('address', address, {
				path: '/',
				maxAge: 30 * 24 * 60 * 60,
				sameSite: 'strict',
				secure: true,
			})

			toast.success('Message signed successfully!')
			window.location.reload() // Refresh the page
		} catch (error) {
			console.error(error)
			toast.error('Error signing in')
		}
	}

	return (
		<Button
			onClick={loginWithEthereum}
			className="text-2xl bg-black/80 backdrop-blur-sm transition-colors duration-125 ease-exponential-smoothing leading-0 rounded-sm border border-secondary-500 hover:border-accent"
		>
			Sign In
		</Button>
	)
}
