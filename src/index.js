import express from 'express';
import glob from 'glob';

import EvilTrap from './EvilTrap';

const path = require('path');

// Base route for all trap routes
const trapPathPrefix = '/trap';

// GitHub url to trap source directory
const repoTrapUrl = 'https://github.com/Trikolon/evil-traps/tree/master/src/traps/';

/**
 * Get all trap instances stored in ./traps.
 *
 * @returns {EvilTrap[]} - Array of trap objects.
 */
function getTraps() {
  const files = glob.sync(path.join(__dirname, './traps/*/index.js'));
  return files.map((f) => {
    try {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const trap = require(f).default;
      trap.srcRef = repoTrapUrl + path.basename(path.dirname(f));
      return trap;
    } catch (err) {
      console.warn('Skipping failed import', f, err.message);
      return null;
    }
  }).filter(f => f != null);
}

// Import evil traps from trap directory
const traps = getTraps();

const app = express();

// Register trap routes
const trapRouter = express.Router();
traps.forEach((trap) => {
  trapRouter.use(trap.path, trap.router);
});
app.use(trapPathPrefix, trapRouter);


// Route for static files for landing page
app.use('/', express.static(path.join(__dirname, 'static')));

// Route for serving trap info payload
app.get('/info', (req, res) => {
  res.status(200).json({
    categories: EvilTrap.CATEGORY,
    trapPathPrefix,
    traps,
  });
});

// Start web-server
const listener = app.listen(process.env.PORT || 8080, process.env.HOST || 'localhost', () => {
  const listenerAddr = listener.address();
  console.info(`Started server at ${listenerAddr.address}:${listenerAddr.port}`);
  console.info('Traps', traps.map(trap => ({ name: trap.name, path: trap.path, bugs: trap.bugs })));
});
