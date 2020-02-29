const path = require('path');
const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('Fullscreen Traps', EvilTrap.CATEGORY.FULLSCREEN, 'Several examples of trapping the user in fullscreen')
  .addStaticRoute('/', path.join(__dirname, 'static'));
