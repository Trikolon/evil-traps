const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('Confirm Auth Prompt Spam', EvilTrap.CATEGORY.SPAM,
  'Spam with auth confirmations prompts.', { firefox: '1571003' })
  .addScriptPage((() => {
    const nextLocation = window.location.href
      .replace(`${window.location.protocol}//`,
        `${window.location.protocol}//admin@`);
    setInterval(() => {
      window.location.href = nextLocation;
    }, 1000);
  }));
