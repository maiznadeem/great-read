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
                footer: '#F2EADF',
            },
            screens: {
                'custxs': '350px',
                'custsm': '800px',
                'custmd': '950px',
                'custlg': '1100px',
                'xl2': '1499px',
            },
            scale: {
                '65': '0.65',
                '60': '0.60'
            },
        },
    },
    plugins: [],
}

