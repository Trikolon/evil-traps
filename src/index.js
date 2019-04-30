import express from 'express';

import EvilTrap from './EvilTrap';

import helloWorld from './traps/hello-world';

import fullscreenAddon from './traps/fullscreen-addon';
import fullscreenTrap from './traps/fullscreen-trap';
import promptSpam from './traps/prompt-spam';
import safeBrowsingFrame from './traps/safebrowsing-frame';
import historyDOS from './traps/historyDOS';

const path = require('path');

const trapPathPrefix = '/trap';

// Evil traps (to be added here)
const traps = [
  helloWorld,
  fullscreenAddon,
  fullscreenTrap,
  promptSpam,
  safeBrowsingFrame,
  historyDOS,
];

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
});
