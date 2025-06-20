module.exports = {
  theme: {
    extend: {
      animation: {
        border: "borderMove 4s linear infinite",
      },
      keyframes: {
        borderMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
};
