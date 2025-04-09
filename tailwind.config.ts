
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom theme colors
				'dark-purple': '#1A1F2C',
				'primary-purple': '#9b87f5',
				'secondary-purple': '#7E69AB',
				'vivid-purple': '#8B5CF6',
				'bright-blue': '#0FA0CE',
				'charcoal': '#000000',
				'light-gray': '#C8C8C9',
				'black': '#000000',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow': {
					'0%, 100%': { 
						textShadow: '0 0 5px rgba(155, 135, 245, 0.8), 0 0 10px rgba(155, 135, 245, 0.6), 0 0 15px rgba(155, 135, 245, 0.4)' 
					},
					'50%': { 
						textShadow: '0 0 10px rgba(155, 135, 245, 1), 0 0 20px rgba(155, 135, 245, 0.8), 0 0 30px rgba(155, 135, 245, 0.6)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(155, 135, 245, 0.6), 0 0 10px rgba(155, 135, 245, 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 15px rgba(155, 135, 245, 0.8), 0 0 25px rgba(155, 135, 245, 0.6)' 
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'dream-catcher-explode': {
					'0%': {
						opacity: '0',
						transform: 'translate(-50%, -50%) scale(0.2)'
					},
					'20%': {
						opacity: '1'
					},
					'100%': {
						opacity: '0',
						transform: 'translate(calc(-50% + var(--explosion-x, 0)), calc(-50% + var(--explosion-y, 0))) scale(var(--explosion-scale, 1))'
					}
				},
				// Enhanced 3D animation
				'dream-catcher-explode-3d': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(-50%, -50%, 0) scale(0.2) rotate(0deg)',
						filter: 'brightness(0.5) drop-shadow(0 0 0 rgba(255, 255, 255, 0))'
					},
					'10%': {
						opacity: '1',
						filter: 'brightness(2) drop-shadow(0 0 10px rgba(255, 255, 255, 1))'
					},
					'30%': {
						opacity: '1',
						filter: 'brightness(1.8) drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))'
					},
					'100%': {
						opacity: '0',
						transform: 'translate3d(calc(-50% + var(--explosion-x, 0)), calc(-50% + var(--explosion-y, 0)), var(--explosion-z, 0)) scale(var(--explosion-scale, 1)) rotate(var(--explosion-rotation, 0deg))',
						filter: 'brightness(0.8) drop-shadow(0 0 5px rgba(255, 255, 255, 0))'
					}
				},
				// Flash animation for initial light burst
				'flash': {
					'0%': { opacity: '1' },
					'25%': { opacity: '0' },
					'100%': { opacity: '0' }
				},
				// Rainbow pulse animation with more intensity
				'pulse-rainbow': {
					'0%, 100%': { 
						transform: 'scale(1)',
						opacity: '0.7'
					},
					'50%': { 
						transform: 'scale(1.8)', // Larger scale
						opacity: '0.9'
					}
				},
				// Extra intense glow for dream catchers
				'glow-extreme': {
					'0%': { 
						filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(155, 135, 245, 0.9))'
					},
					'50%': { 
						filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 1)) drop-shadow(0 0 60px rgba(155, 135, 245, 1))'
					},
					'100%': { 
						filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(155, 135, 245, 0.9))'
					}
				},
				// Intense glow for dream catchers
				'glow-intense': {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 10px rgba(155, 135, 245, 0.7))'
					},
					'50%': { 
						filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 1)) drop-shadow(0 0 30px rgba(155, 135, 245, 1))'
					}
				},
				// Light rays animation
				'rotate-rays': {
					'0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
					'100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.3s ease-in forwards',
				'dream-catcher-explode': 'dream-catcher-explode 1s forwards',
				// Enhanced animations
				'dream-catcher-explode-3d': 'dream-catcher-explode-3d 2.5s forwards', // Longer animation
				'flash': 'flash 0.5s ease-out forwards',
				'pulse-rainbow': 'pulse-rainbow 1.5s ease-in-out infinite', // Faster pulse
				'glow-extreme': 'glow-extreme 0.8s ease-in-out infinite', // Faster, more intense glow
				'glow-intense': 'glow-intense 1s ease-in-out infinite',
				'rotate-rays': 'rotate-rays 10s linear infinite'
			},
			// Add perspective for 3D effect
			perspective: {
				'1000': '1000px',
			},
			backgroundImage: {
				'rays': 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(255,255,255,0.2) 50%, transparent 52%, transparent 100%), radial-gradient(circle at center, transparent 0%, transparent 52%, rgba(255,255,255,0.2) 52%, transparent 54%, transparent 100%), radial-gradient(circle at center, transparent 0%, transparent 54%, rgba(255,255,255,0.2) 54%, transparent 56%, transparent 100%), radial-gradient(circle at center, transparent 0%, transparent 56%, rgba(255,255,255,0.2) 56%, transparent 58%, transparent 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
