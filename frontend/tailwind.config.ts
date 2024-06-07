import type { Config } from 'tailwindcss'

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		extend: {
			fontFamily: {
				triakis: ['Triakis', 'sans-serif'],
				space: ['Space', 'sans-serif'],
			},
			colors: {
				secondary: {
					0: '#FFFFFF',
					200: 'C0C0C0',
					400: '#A3A3A3',
					500: '#444444',
					600: '#252525',
					800: '#171717',
				},
				accent: '#6F5BDE',
			},
			keyframes: {
				'exponential-smoothing': {
					'0%': { transform: 'translateX(0%)' },
					'10%': { transform: 'translateX(5%)' },
					'20%': { transform: 'translateX(15%)' },
					'30%': { transform: 'translateX(25%)' },
					'40%': { transform: 'translateX(35%)' },
					'50%': { transform: 'translateX(45%)' },
					'60%': { transform: 'translateX(55%)' },
					'70%': { transform: 'translateX(65%)' },
					'80%': { transform: 'translateX(75%)' },
					'90%': { transform: 'translateX(85%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'exponential-smoothing':
					'exponential-smoothing 0.5s cubic-bezier(0.1, 0.7, 1.0, 0.1) forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
