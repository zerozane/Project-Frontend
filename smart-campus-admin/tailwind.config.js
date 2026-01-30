/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                },
                smart: {
                    bg: '#f8fafc',
                    card: '#ffffff',
                    sidebar: '#1a1f2e',
                    accent: '#10b981',
                }
            },
            fontFamily: {
                sans: ['Inter', 'Sarabun', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
            },
            backdropBlur: {
                'glass': '10px',
            }
        },
    },
    plugins: [],
}
