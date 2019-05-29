import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Fullscreen Traps', EvilTrap.CATEGORY.FULLSCREEN, 'Several examples of trapping the user in fullscreen')
  .addStaticRoute('/', path.join(__dirname, 'static'));
