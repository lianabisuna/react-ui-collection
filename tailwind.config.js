/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require("tailwindcss/colors");

module.exports = {
  safelist: [
    {
      pattern: /(bg|text|border|outline|accent|fill)-(red|violet|yellow|cyan|teal|indigo|blue|gray|amber|pink|green|sky|rose|emerald|fuchsia|lime|purple)-(500|800)/,
      variants: ['hover', 'focus', 'disabled', 'active', 'peer-checked', 'group-focus-within'],
    },
    {
      pattern: /(bg)-(eerie|night|battle)/,
      variants: [],
    },
    {
      pattern: /(rounded)-(sm|md|lg|xl)/,
      variants: [],
    },
    {
      pattern: /(border)-(b)-./,
      variants: [],
    },
    {
      pattern: /(grid-cols)-(1|2|3|4|5)-./,
      variants: [],
    },
  ],
  darkMode: ['class', '[theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      colors: {
        primary: colors.blue,
        night: '#111111',
        eerie: '#252525',
        battle: '#999999',
      },
      keyframes: {
        shake: {
          '0%, 40%, 80%': { transform: 'translate(0,0)' },
          '20%, 60%, 100%': { transform: 'translate(3px,0)' },
        },
        rotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%': { 'background-size': '400% 400%', 'background-position': '0% 50%' },
          '50%': { 'background-size': '400% 400%', 'background-position': '100% 50%' },
          '100%': { 'background-size': '400% 400%', 'background-position': '0% 50%' },
        },
      },
      animation: {
        shake: 'shake .25s ease',
        rotate: 'rotate .8s linear infinite',
        glow: 'glow 15s ease infinite',
      },
      aspectRatio: {
        '4/3': '4/3',
      },
    },
  },
  plugins: [],
}
