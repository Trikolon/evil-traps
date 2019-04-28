import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Fullscreen Addon', EvilTrap.CATEGORY.MISC, 'Addon installation prompts in fullscreen mode.')
  .addStaticRoute('/', path.join(__dirname, 'static'));
