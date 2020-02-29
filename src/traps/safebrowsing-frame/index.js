const path = require('path');
const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('Safebrowsing Frame', EvilTrap.CATEGORY.MISC, 'Embeds an iframe with a safebrowsing blacklisted site.', { firefox: '1195242' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
