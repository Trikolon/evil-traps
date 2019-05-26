import EvilTrap from '../../EvilTrap';

const path = require('path');

function getHandler(req, res) {
  res.status(200).send('This is the hello world GET handler. <br> <a href="static">Check out the static stuff</a>');
}

function postHandler(req, res) {
  res.status(200).send('This is the hello world POST handler');
}

export default new EvilTrap('Hello World', EvilTrap.CATEGORY.MISC, 'A demo Evil Trap with static and dynamic content', undefined, true)
  .routeBuilder((router) => {
    router.get('/', getHandler);
    router.post('/', postHandler);
  })
  .addStaticRoute('/static', path.join(__dirname, 'static'));
