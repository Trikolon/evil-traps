import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Fullscreen Addon Popup', EvilTrap.CATEGORY.FULLSCREEN,
  'Tricks user into installing unwanted addon in fullscreen mode, disguising as a Firefox update. Bypasses addon install block by requesting it in a popup.',
  { firefox: '1596189' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
