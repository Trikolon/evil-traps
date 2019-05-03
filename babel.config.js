module.exports = function (api) {
  api.cache(true);

  const presets = [['@babel/preset-env', {
    targets: {
      node: '8',
    },
  }]];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
