import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Insecure Form Submission Prompt Spam', EvilTrap.CATEGORY.SPAM,
  'Spam with insecure form submission prompts.', { firefox: '616849' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
