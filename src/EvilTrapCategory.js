class EvilTrapCategory {
  /**
   * @param {string} name
   * @param {string} [description]
   * @param {boolean} [warn] - Wether user should be warned before opening traps from this category
   * @memberof EvilTrapCategory
   */
  constructor(name, description, warn = false) {
    this.id = name.replace(' ', '-');
    this.name = name;
    this.description = description;
    this.warn = warn;
  }
}

module.exports = EvilTrapCategory;
