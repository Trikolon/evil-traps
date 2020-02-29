const path = require('path');
const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('Playground', undefined, undefined, undefined, true)
  .addStaticRoute('/', path.join(__dirname, 'static'));
