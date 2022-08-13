// /** @type {import('tailwindcss').Config} */ 
// module.exports = {
//     content: [
//       "./src/**/*.{js,jsx,ts,tsx}",
//     ],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   }

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                'overlay': 'rgba(0,0,0,0.3)'
            },
            gridTemplateColumns: {
                'cards': 'repeat(auto-fill, minmax(270px, 1fr))',
                'products': 'repeat(auto-fill, minmax(220px, 1fr))',
                'tablet': 'repeat(auto-fill, minmax(160px, 1fr))',
                'mobile': 'repeat(auto-fill, minmax(130px, 1fr))'
            },
            boxShadow: {
                'card': 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            },
            animation: {
                'loading': 'spinner 1s cubic-bezier(0, 0.2, 0.8, 1) infinite'
            },
            keyframes: {
                spinner: {
                    '0%': {top: '36px', left: '36px', width: '0', height: '0', opacity: '0'},
                    '4.9%': {top: '36px', left: '36px', width: '0', height: '0', opacity: '0'},
                    '5%': {top: '36px', left: '36px', width: '0', height: '0', opacity: '1'},
                    '100%': {top: '0px', left: '0px', width: '72px', height: '72px', opacity: '0'},
                }
            }
        },
        animationDelay: {
            spinner: "-500ms"
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('tailwindcss-animation-delay')
    ],
  }