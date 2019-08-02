import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Permission Prompt Spam', EvilTrap.CATEGORY.SPAM, 'Spam the user with notification permission prompts.', { firefox: '1492668' })
  .addStaticRoute('/', path.join(__dirname, 'static'));
