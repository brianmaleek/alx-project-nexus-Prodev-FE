/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    // This is how we set up nativewind inside our project for styling our app more easily
    theme: {
        extend: {
            colors: {
                primary: '#2f184b',
                secondary: '#532b88',
                light: {
                    100: '#9b72cf',
                    200: '#c8b1e4',
                    300: '#f4effa',
                },
                dark: {
                    100: '#f4effa',
                    200: '#c8b1e4',
                },
                accent: '#AB8BFF',
            }
        },
    },
    plugins: [],
}
