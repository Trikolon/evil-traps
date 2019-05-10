import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Playground', undefined, undefined, true)
  .addStaticRoute('/', path.join(__dirname, 'static'));
