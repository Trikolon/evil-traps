import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Full-screen Auth Prompt', EvilTrap.CATEGORY.FULLSCREEN, 'Use HTTP Basic Auth prompts to trap the user in full-screen.')
  .addStaticRoute('/', path.join(__dirname, 'static'))
  .routeBuilder((router) => {
    router.get('/auth', (req, res) => {
      res.set('WWW-Authenticate', 'Basic realm="Trapped"');
      res.sendStatus(401);
    });
  });
