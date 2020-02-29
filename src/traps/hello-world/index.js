const path = require('path');
const EvilTrap = require('../../EvilTrap');


function getHandler(req, res) {
  res.status(200).send('This is the hello world GET handler. <br> <a href="static">Check out the static stuff</a>');
}

function postHandler(req, res) {
  res.status(200).send('This is the hello world POST handler');
}

function helloWorldScript() {
  // eslint-disable-next-line no-alert
  alert('hello world!');
}

module.exports = new EvilTrap('Hello World', EvilTrap.CATEGORY.MISC, 'A demo Evil Trap with static and dynamic content', undefined, true)
  // Dynamic routes
  .routeBuilder((router) => {
    router.get('/', getHandler);
    router.post('/', postHandler);
  })
  // Static file route
  .addStaticRoute('/static', path.join(__dirname, 'static'))
  // Static script route passed a Function
  .addScriptPage(helloWorldScript, '/in-page-script-func')
  // Static script route passed a function string
  .addScriptPage('alert("hello world str")', '/in-page-script-func-string');
