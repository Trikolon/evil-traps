import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Fullscreen Trap', EvilTrap.CATEGORY.MISC, 'Trap the user in fullscreen by entering it whenever possible.')
  .addStaticRoute('/', path.join(__dirname, 'static'));
