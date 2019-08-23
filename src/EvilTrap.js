import express from 'express';


class EvilTrapCategory {
  /**
   * @param {string} name
   * @param {string} [description]
   * @param {boolean} [warn] - Wether user should be warned before opening traps from this category
   * @memberof EvilTrapCategory
   */
  constructor(name, description, warn = false) {
    this.name = name;
    this.description = description;
    this.warn = warn;
  }
}

/**
 * Convert evil trap name to path suitable for express route.
 * @param {string} name
 * @returns {string} Path suitable for express route
 */
function nameToPath(name) {
  // Using encodeURIComponent to ensure valid paths
  return `/${encodeURIComponent(name.toLowerCase().replace(new RegExp('\\s', 'g'), '-'))}/`;
}

class EvilTrap {
  /**
   * @param {string} name - Human readable identifier of trap
   * @param {EvilTrapCategory} [category=EvilTrap.CATEGORY.MISC]
   * @param {string} [description] - Short info text about the trap
   * @param {Object} [bugs] - A map of bug numbers to show alongside the evil trap,
   *                          currently accepts only "firefox" keys.
   * @param {boolean} [unlisted = false] - Whether to hide the trap in navigation
   */
  constructor(name, category = EvilTrap.CATEGORY.MISC, description, bugs, unlisted = false) {
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error('"name" is mandatory. Must be non empty string');
    }

    this.router = express.Router();
    this.path = nameToPath(name);
    this.name = name;
    this.category = category;
    this.description = description;
    this.bugs = bugs;
    this.unlisted = unlisted;

    this.srcRef = null;
  }


  /**
   * Configure http routes for evil trap.
   * @param {Function} routeBuilder - Function to be called with router object
   * @returns {EvilTrap} - Current EvilTrap instance.
   * @memberof EvilTrap
   */
  routeBuilder(routeBuilder) {
    if (!(routeBuilder instanceof Function)) {
      throw new Error('Argument "routeBuilder" must be a function');
    }
    routeBuilder(this.router);
    return this;
  }


  /**
   * Add a http route to serve static files.
   *
   * @param {string} [mountPath='/'] - Where to register the route relative to the trap base route.
   * @param {string} sourcePath - Path of folder to be served.
   * @returns {EvilTrap} - Current EvilTrap instance.
   * @memberof EvilTrap
   */
  addStaticRoute(mountPath = '/', sourcePath) {
    if (typeof mountPath !== 'string' || mountPath.length === 0) {
      throw new Error('Argument "mountPath" must be non empty string');
    }
    if (typeof sourcePath !== 'string' || sourcePath.length === 0) {
      throw new Error('Argument "sourcePath" must be non empty string');
    }
    this.router.use(mountPath, express.static(sourcePath));
    return this;
  }


  /**
   * Add a page which runs a JS payload
   * TODO: add support for reading script from JS file (script as path string).
   * @param {string|Function} script - Function string or Function to run on page load
   *                                   (injected as script tag in body).
   * @param {string} [mountPath='/'] - Where to register the route relative to the trap base route.
   * @param {string} [pageTitle=this.name] - Title of HTML page.
   * @returns {EvilTrap} - Current EvilTrap instance.
   * @memberof EvilTrap
   */
  addScriptPage(script, mountPath = '/', pageTitle = this.name) {
    let scriptStr;
    if (typeof script === 'string') {
      scriptStr = script;
    } else if (script instanceof Function) {
      scriptStr = `(${script.toString()})()`;
    } else {
      throw new Error('Invalid argument "script", expected string or Function');
    }

    const body = `<html>
                    <head>
                      <title>${pageTitle}</title>
                    </head>
                    <body>
                      <script>
                        ${scriptStr}
                      </script>
                    </body>
                  </html>`;
    this.routeBuilder((builder) => {
      builder.get(mountPath, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.status(200).send(body);
      });
    });
    return this;
  }
}

EvilTrap.CATEGORY = Object.freeze({
  DOS: new EvilTrapCategory('DoS', 'Denial of Service: Crashes, freezes or slows the browser.', true),
  FULLSCREEN: new EvilTrapCategory('Full-Screen', 'Abuse full-screen to trap or phish the user.'),
  SPAM: new EvilTrapCategory('Spam'),
  MISC: new EvilTrapCategory('Misc'),
});

export default EvilTrap;
