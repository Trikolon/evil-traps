const path = require('path');
const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('Fullscreen Addon', EvilTrap.CATEGORY.FULLSCREEN, 'Addon installation prompts in fullscreen mode.', { firefox: '1412561' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
