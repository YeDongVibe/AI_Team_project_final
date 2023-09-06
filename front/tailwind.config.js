/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'zoom-in': {
          '0%': {
            transform: 'scale-0',
            opacity: 0
          },
          '100%': {
            transform: 'scale-100',
            opacity: 1
          }
        },
        'type-in': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-2em)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'zoom-in': 'zoom-in 3s',
        'type-in': 'type-in 0.5s'
      },
      fontFamily: {
        'porter-sans': ['porter-sans', 'porter-sans-block'],
        poppins: ['poppins'],
        Inconsolata: ['Inconsolata'],
        Notable: ['Notable']
      },
      screens: {
        '2xl': {max: '1535px'},
        // => @media (max-width: 1535px) { ... }

        xl: {max: '1279px'},
        // => @media (max-width: 1279px) { ... }

        lg: {max: '1023px'},
        // => @media (max-width: 1023px) { ... }

        md: {max: '767px'},
        // => @media (max-width: 767px) { ... }

        sm: {max: '639px'}
        // => @media (max-width: 639px) { ... }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
