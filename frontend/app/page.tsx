import AuthBackground from '@/components/AuthBackground'
import AuthButtons from '@/components/AuthButtons'

export default function Home() {
	return (
		<main className="">
			<AuthBackground />

			<div className="z-50 w-full h-full absolute inset-0 flex flex-col items-center justify-between">
				<div className="mt-20 w-full flex-1 flex flex-col items-center justify-center">
					<h1 className="flex flex-col items-center justify-center text-4xl md:text-7xl leading-[0.9] md:leading-[0.85] font-space">
						<span>GOLANG</span>
						<span>GALAXY</span>
					</h1>
					<div className="mt-10 md:mt-20">
						<AuthButtons />
					</div>
				</div>
			</div>
		</main>
	)
}
