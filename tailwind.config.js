const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: ['./*.tsx', './src/**/*.tsx'],
    theme: {
        fontFamily: {
            display: ['Roboto'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            colors: {
                discord: {
                    DEFAULT: '#7289da',
                    gray: {
                        1: '#292b2f', // tab bar
                        2: '#36393f', // chat bg
                        3: '#202225', // darker sidebar
                        4: '#a3a6aa',
                    },
                },
            },
        },
    },
    plugins: [],
}
