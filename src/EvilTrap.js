import express from 'express';

class EvilTrapCategory {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

function nameToPath(name) {
  // Using encodeURIComponent to ensure valid paths
  return `/${encodeURIComponent(name.toLowerCase().replace(' ', '-'))}/`;
}

class EvilTrap {
  /**
   * @param {String} name - Human readable identifier of trap
   * @param {EvilTrapCategory} [category=EvilTrap.CATEGORY.MISC]
   * @param {String} [description] - Short info text about the trap
   * @param {Boolean} [unlisted = false] - Whether to hide the trap in navigation
   */
  constructor(name, category = EvilTrap.CATEGORY.MISC, description, unlisted = false) {
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error('"name" is mandatory. Must be non empty string');
    }

    this.router = express.Router();
    this.path = nameToPath(name);
    this.name = name;
    this.category = category;
    this.description = description;
    this.unlisted = unlisted;
  }

  routeBuilder(routeBuilder) {
    if (!(routeBuilder instanceof Function)) {
      throw new Error('Argument "routeBuilder" must be a function');
    }
    routeBuilder(this.router);
    return this;
  }

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
}

EvilTrap.CATEGORY = Object.freeze({
  SPAM: new EvilTrapCategory('Spam', 'Spams the user.'),
  CRASH: new EvilTrapCategory('Crash', 'Crashes, freezes or slows the browser.'),
  MISC: new EvilTrapCategory('Misc'),
});

export default EvilTrap;
