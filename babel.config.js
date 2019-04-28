module.exports = function (api) {
  api.cache(false);

  const presets = [['@babel/preset-env', {
    targets: {
      node: '10',
    },
  }]];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
