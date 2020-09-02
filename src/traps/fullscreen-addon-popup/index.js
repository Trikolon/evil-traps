const path = require('path');
const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('Fullscreen Addon Popup', EvilTrap.CATEGORY.FULLSCREEN,
  'Tricks user into installing unwanted addon in fullscreen mode, disguising as a Firefox update. Bypasses addon install block by requesting it in a popup.',
  { firefox: '1596189' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
