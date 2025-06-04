// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          'slide-in': 'slideIn 0.3s ease-out forwards',
          slideDown: 'slideDown 0.3s ease-out forwards',
        },
        keyframes: {
          slideIn: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          }
        },
      },
    },
  };
  