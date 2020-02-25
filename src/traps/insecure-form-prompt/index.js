import EvilTrap from '../../EvilTrap';

export default new EvilTrap('Insecure Form Submission Prompt Spam', EvilTrap.CATEGORY.SPAM,
  'Spam with insecure form submission prompts.', { firefox: '616849' })
  .addScriptPage(() => {
    // Make sure the page is loaded via https
    if (window.location.protocol === 'http:') {
      window.location.protocol = 'https';
      return;
    }

    // Create a form which submits to a http page
    const form = document.createElement('form');
    form.action = `http://${window.location.host}${window.location.pathname}redirect`;
    document.body.appendChild(form);
    setInterval(() => { form.submit(); }, 10);
  })
  .addScriptPage(() => {
    window.location.replace(window.location.href.replace('redirect', ''));
  }, '/redirect');
