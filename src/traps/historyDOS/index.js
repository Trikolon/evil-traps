import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('History.pushState DoS', EvilTrap.CATEGORY.DOS, 'Freezes / slows the browser by spamming history.pushState.', { firefox: '1314912' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
