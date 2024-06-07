'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from './ui/button'

export default function ConnectWalletButton() {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				const ready = mounted && authenticationStatus !== 'loading'
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus || authenticationStatus === 'authenticated')

				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										onClick={openConnectModal}
										className="text-2xl bg-black/80 backdrop-blur-sm transition-colors duration-125 ease-exponential-smoothing leading-0 rounded-sm border border-secondary-500 hover:border-accent"
									>
										Connect Wallet
									</Button>
								)
							}

							if (chain.unsupported) {
								return (
									<Button
										onClick={openChainModal}
										className="text-2xl bg-black/80 backdrop-blur-sm transition-colors duration-125 ease-exponential-smoothing leading-0 rounded-sm border border-secondary-500 hover:border-accent"
									>
										Wrong Network
									</Button>
								)
							}

							return (
								<Button
									disabled={!ready}
									onClick={openAccountModal}
									className="text-2xl bg-black/80 backdrop-blur-sm transition-colors duration-125 ease-exponential-smoothing leading-0 rounded-sm border border-secondary-500 hover:border-accent"
								>
									Connect Wallet
								</Button>
							)
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}
