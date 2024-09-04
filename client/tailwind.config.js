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
                backgroundPrimary: '#FFF8EC',
                footer: '#F2EADF',
            },
            screens: {
                'custxs': '350px',
                'custsm': '800px',
                'custmd': '950px',
                'custlg': '1100px',
                'xl2': '1900px',
            },
            scale: {
                '65': '0.65',
                '60': '0.60',
            },
        },
    },
    plugins: [
        function({addUtilities}) {
            const newUtilities = {
                ".scrollbar-thin": {
                    scrollbarWidth: "thin",
                    scrollbarColor: "#956829 white",
                },
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar": {
                        height: "8px",
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "white",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#956829",
                        borderRadius: "20px",
                        border: "1px solid white",
                    }
                }
            }
            addUtilities(newUtilities, ["responsive", "hover"]);
        }
    ],
}

