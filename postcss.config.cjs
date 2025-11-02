module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-replace': {
      pattern: /::picker\(select\)/g,
      replacement: '',
    },
  },
};
