/** @type {import('tailwindcss').Config} */

const colours = require('tailwindcss/colors')

export default {
    content: [
        './src/**/*.{html,js}',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.js',
        './node_modules/tw-elements-react/dist/js/**/*.js'
    ],
    theme: {
        extend: {
            animation: {
                rainbow: 'colours 4s ease-in-out infinite, spin 1s linear infinite',
                rainbow_text: 'colours 4s ease-in-out infinite',
                rainbow_bg: 'bg_colours 4s ease-in-out infinite',
            },
            keyframes: {
                colours: {
                    '0%, 100%': { 'color': 'red' },
                    '25%': { 'color': 'blue' },
                    '50%': { 'color': 'green' },
                    '75%': { 'color': 'gold' },
                },
                bg_colours: {
                    '0%, 100%': { 'background-color': '#fde68a' },
                    '25%': { 'background-color': '#bbf7d0' },
                    '50%': { 'background-color': '#bae6fd' },
                    '75%': { 'background-color': '#fecdd3' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('tw-elements-react/dist/plugin.cjs'),
    ],
}

