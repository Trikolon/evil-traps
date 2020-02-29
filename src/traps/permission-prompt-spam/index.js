const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('Permission Prompt Spam', EvilTrap.CATEGORY.SPAM, 'Spam the user with notification permission prompts.', { firefox: '1492668' })
  .addScriptPage(async () => {
    const domainNoEnd = 5;

    const result = await Notification.requestPermission();
    if (result === 'denied' || result === 'default') {
      const { hostname } = window.location;
      let subDomainNo = Number.parseInt(hostname.substr(0, hostname.indexOf('.')), 10);
      let nextHost;

      if (Number.isNaN(subDomainNo)) {
        nextHost = `1.${hostname}`;
      } else {
        // Exit when we run out of subdomains. Could loop but that could cause DoS.
        if (subDomainNo === domainNoEnd) {
          return;
        }
        subDomainNo += 1;
        nextHost = `${subDomainNo}${hostname.substring(hostname.indexOf('.'))}`;
      }
      window.location.hostname = nextHost;
    }
    // eslint-disable-next-line no-unused-vars
    const notification = new Notification('Hello World');
  });
