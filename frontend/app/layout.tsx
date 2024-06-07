import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import '../styles/globals.css'

export const metadata: Metadata = {
	title: 'Golang Galaxy',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="dark bg-black text-white min-h-screen font-triakis antialiased overscroll-none text-xl overflow-hidden">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
