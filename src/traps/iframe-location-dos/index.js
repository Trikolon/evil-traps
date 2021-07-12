const path = require('path');
const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('Iframe window.location DoS', EvilTrap.CATEGORY.DOS, 'Crashes the browser (win10) or tab by triggering oversized IPC messages.', { firefox: '1709183' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
