/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: {min: '640px', max: '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: {min: '768px', max: '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: {min: '1024px', max: '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: {min: '1280px', max: '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {min: '1536px'}
      // => @media (min-width: 1536px) { ... }
    },
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
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
