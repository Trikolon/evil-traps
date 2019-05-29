import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Fullscreen Addon', EvilTrap.CATEGORY.FULLSCREEN, 'Addon installation prompts in fullscreen mode.', { firefox: '1412561' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
