/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
  "./screens/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"
],
  theme: {
    extend: {
      fontFamily: {
        poppins: [
          'Poppins-Regular'
        ],
      },
        
    },
  },
  plugins: [],
}

