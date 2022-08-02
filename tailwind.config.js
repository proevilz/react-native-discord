const colors = require('./colors.ts')
module.exports = {
  content: ['./*.tsx', './src/**/*.tsx'],
  theme: {
    fontFamily: {
      display: ['Roboto'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors,
    },
  },
  plugins: [],
}
