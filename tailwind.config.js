/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/svelte-daisyui-toast/dist/**/*.{js,svelte}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography"), require('daisyui')],
    daisyui: {
        themes: ['light', 'dark'],
    },
}

