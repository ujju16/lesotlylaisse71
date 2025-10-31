module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // Workaround for daisyUI v5 invalid pseudo-element in LightningCSS
    require('postcss-replace')({
      pattern: /::picker\(select\)/g,
      replacement: ''
    })
  ],
};
