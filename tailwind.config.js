/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#e9ebf2',
          100: '#c7ccdc',
          200: '#9aa3c0',
          300: '#6c7aa4',
          400: '#3f5088',
          500: '#1a2650',
          600: '#141d3e',
          700: '#10182f',
          800: '#0b1122',
          900: '#050813',
          950: '#020409'
        },
        navy: {
          DEFAULT: '#0A0E1A',
          light: '#0F1729',
          dark: '#050709'
        },
        gold: {
          50: '#fbf6e7',
          100: '#f5e9bf',
          200: '#eed88c',
          300: '#e5c355',
          400: '#dbae30',
          DEFAULT: '#D4AF37',
          600: '#b8860b',
          700: '#96700c',
          800: '#795911',
          900: '#634a14'
        },
        bronze: '#B8860B',
        ember: '#E8873A',
        ivory: '#F5F3EE'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        deva: ['"Noto Sans Devanagari"', 'sans-serif']
      },
      maxWidth: {
        '7xl': '80rem'
      },
      boxShadow: {
        gold: '0 0 25px -5px rgba(212, 175, 55, 0.45)',
        'gold-lg': '0 0 60px -10px rgba(212, 175, 55, 0.35)'
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 50% 20%, rgba(212,175,55,0.15), transparent 60%)'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(15px,-20px)' }
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 }
        },
        raySlide: {
          '0%': { transform: 'translateX(-10%) rotate(0deg)' },
          '100%': { transform: 'translateX(10%) rotate(2deg)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        }
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        twinkle: 'twinkle 3.5s ease-in-out infinite',
        raySlide: 'raySlide 18s ease-in-out infinite alternate',
        floaty: 'floaty 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
