import EvilTrap from '../../EvilTrap';

const path = require('path');

export default new EvilTrap('Confirm Auth Prompt Spam', EvilTrap.CATEGORY.SPAM, 'Spam with auth confirmations prompts.', null)
  .addStaticRoute('/', path.join(__dirname, 'static'));
