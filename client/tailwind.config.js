/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#956829',
                primaryDark: '#8D5E20',
                secondary: '#623A06',
                backgroundPrimary: '#ffffff',
                footer: 'rgba(168, 131, 63, 0.35)',
            },
            screens: {
                'xl2': '1499px',
            },
            scale: {
                '65': '0.65'
            }
        },
    },
    plugins: [],
}

