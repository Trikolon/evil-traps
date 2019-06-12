import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Fullscreen Permission Prompt', EvilTrap.CATEGORY.FULLSCREEN, null, { firefox: '1522120' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
