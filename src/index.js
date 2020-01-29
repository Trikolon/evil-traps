import express from 'express';
import glob from 'glob';

import EvilTrap from './EvilTrap';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// HTTP server defaults
const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 8080;
const DEFAULT_HTTPS_PORT = 8443;

// Base route for all trap routes
const TRAP_PATH_PREFIX = '/trap';

// GitHub url to trap source directory
const REPO_TRAP_URL = 'https://github.com/Trikolon/evil-traps/tree/master/src/traps/';

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
      trap.srcRef = REPO_TRAP_URL + path.basename(path.dirname(f));
      return trap;
    } catch (err) {
      console.warn('Skipping failed import', f, err.message);
      return null;
    }
  }).filter(f => f != null);
}


(() => {
  // Import evil traps from trap directory
  const traps = getTraps();

  const app = express();

  // Register trap routes
  const trapRouter = express.Router();
  traps.forEach((trap) => {
    trapRouter.use(trap.path, trap.router);
  });
  app.use(TRAP_PATH_PREFIX, trapRouter);


  // Route for static files for landing page
  app.use('/', express.static(path.join(__dirname, 'static')));

  // Route for serving trap info payload
  app.get('/info', (req, res) => {
    res.status(200).json({
      categories: EvilTrap.CATEGORY,
      trapPathPrefix: TRAP_PATH_PREFIX,
      traps,
    });
  });

  console.info('Traps', traps.map(trap => ({ name: trap.name, path: trap.path, bugs: trap.bugs })));

  // Start http server
  const httpServer = http.createServer(app);
  const httpListener = httpServer.listen(
    process.env.PORT || DEFAULT_PORT,
    process.env.HOST || DEFAULT_HOST, () => {
      const listenerAddr = httpListener.address();
      console.info(`Started HTTP server at ${listenerAddr.address}:${listenerAddr.port}`);
    },
  );

  // Start https server if configured
  if (process.env.HTTPS_CERT && process.env.HTTPS_KEY) {
    let key;
    let cert;
    try {
      key = fs.readFileSync(process.env.HTTPS_KEY, 'utf8');
      cert = fs.readFileSync(process.env.HTTPS_CERT, 'utf8');
    } catch (error) {
      console.error('Error while reading key/cert for HTTPS', error);
      return;
    }
    const httpsServer = https.createServer({ key, cert }, app);
    const httpsListener = httpsServer.listen(
      process.env.HTTPS_PORT || DEFAULT_HTTPS_PORT,
      process.env.HTTPS_HOST || process.env.HOST || DEFAULT_HOST, () => {
        const listenerAddr = httpsListener.address();
        console.info(`Started HTTPS server at ${listenerAddr.address}:${listenerAddr.port}`);
      },
    );
  }
})();
