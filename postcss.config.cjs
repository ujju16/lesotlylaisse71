module.exports = (ctx) => {
  const isGlobals = ctx?.file?.basename === 'globals.css' || /\bapp\/globals\.css$/.test(ctx?.file?.dirname || '');
  return {
    plugins: [
      isGlobals && require('tailwindcss'),
      require('autoprefixer'),
      // Strip invalid ::picker(select) only on global CSS where DaisyUI injects styles
      isGlobals && require('postcss-replace')({
        pattern: /::picker\(select\)/g,
        replacement: ''
      })
    ].filter(Boolean),
  };
};
