'use client'

import {
	darkTheme,
	getDefaultConfig,
	RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { Toaster } from './ui/sonner'
import '@rainbow-me/rainbowkit/styles.css'

export const config = getDefaultConfig({
	appName: 'My RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains: [sepolia],
	ssr: true,
	pollingInterval: 10_000,
})

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					modalSize="compact"
					theme={darkTheme({
						accentColor: '#6F5BDE',
						accentColorForeground: 'white',
						borderRadius: 'none',
						fontStack: 'system',
						overlayBlur: 'large',
					})}
				>
					{children}
					<Toaster position="bottom-right" />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
