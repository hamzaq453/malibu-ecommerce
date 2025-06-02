// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          'slide-in': 'slideIn 0.3s ease-out forwards',
        },
        keyframes: {
          slideIn: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0)' },
          },
        },
      },
    },
  };
  