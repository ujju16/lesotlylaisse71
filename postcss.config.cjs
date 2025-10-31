module.exports = (ctx = {}) => {
  const file = ctx.file || {};
  const name = file.basename || '';
  const dir = file.dirname || '';
  const isGlobals = name === 'globals.css' || /\bapp\/globals\.css$/.test(`${dir}/${name}`);
  return {
    plugins: [
      isGlobals ? require('tailwindcss') : null,
      require('autoprefixer'),
      isGlobals
        ? require('postcss-replace')({ pattern: /::picker\(select\)/g, replacement: '' })
        : null,
    ].filter(Boolean),
  };
};
