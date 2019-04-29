import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Safebrowsing Frame', EvilTrap.CATEGORY.SPAM, 'Embeds an iframe with a safebrowsing blacklisted site.')
  .addStaticRoute('/', path.join(__dirname, 'static'));
