/**
 * Attaches a warning to a hyperlink requiring two clicks to follow it
 *
 * @param {*} clickEl - DOM element to trigger warning
 * @param {*} textEl - DOM element which holds text to replace
 * @param {String} message - Warning message.
 */
function attachWarn(clickEl, textEl, message) {
  const el = clickEl;
  const tEl = textEl;

  el.dataset.preventClick = true;
  el.addEventListener('click', (event) => {
    if (!el.dataset.preventClick) {
      return;
    }
    event.preventDefault();
    delete el.dataset.preventClick;

    const originalText = tEl.innerText;

    function onCancelConfirm() {
      tEl.innerText = originalText;
      el.dataset.preventClick = true;

      el.removeEventListener('blur', onCancelConfirm);
      el.removeEventListener('click', onCancelConfirm);
    }

    el.addEventListener('blur', onCancelConfirm);
    el.addEventListener('click', onCancelConfirm);

    tEl.innerText = message;
  });
}


/**
 * Get bug open status from Bugzilla REST API
 *
 * @param {String} bugNumber
 * @returns {null|Boolean} Status of bug or null if not found
 */
async function bugzillaGetBugState(bugNumber) {
  const response = await fetch(`https://bugzilla.mozilla.org/rest/bug/${bugNumber}?include_fields=is_open`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Error while contacting Bugzilla API');
  }
  const info = await response.json();

  if (info.bugs.length === 0) {
    return null;
  }
  return info.bugs[0].is_open;
}

(async () => {
  const trapNav = document.getElementById('nav');
  const listEl = document.getElementById('listEl');

  // Fetch trap data from backend
  const response = await fetch('/info');
  if (!response.ok) {
    throw new Error('Received error code while fetching list of traps');
  }
  const info = await response.json();
  console.debug('Available traps', info);

  // Build categories nav
  Object.values(info.categories).forEach((category) => {
    const categoryEl = document.createElement('div');
    categoryEl.id = category.name;
    categoryEl.style.display = 'none';

    const categoryListTitle = document.createElement('h2');
    categoryListTitle.innerText = category.name;
    categoryEl.appendChild(categoryListTitle);

    if (category.description) {
      const categoryListDescription = document.createElement('p');
      categoryListDescription.innerText = category.description;
      categoryEl.appendChild(categoryListDescription);
    }

    const categoryList = document.createElement('ul');
    categoryEl.appendChild(categoryList);

    trapNav.appendChild(categoryEl);
  });

  // Insert trap list into categories
  info.traps.forEach((trap) => {
    // Skip hidden traps
    if (trap.unlisted) return;

    const el = listEl.content.cloneNode(true);

    const ref = el.querySelector('a');
    ref.href = info.trapPathPrefix + trap.path;

    if (trap.category.warn) {
      attachWarn(ref, ref.firstElementChild,
        'Warning: This might disrupt or damage your browser. Click again to confirm.');
    }

    el.querySelector('.refTitle').innerText = trap.name;
    el.querySelector('.refBody').innerText = trap.description;

    if (trap.bugs) {
      const container = document.createElement('span');

      if (trap.bugs.firefox) {
        const link = document.createElement('a');
        link.href = `https://bugzilla.mozilla.org/show_bug.cgi?id=${trap.bugs.firefox}`;
        link.target = '_blank';
        const img = document.createElement('img');
        img.title = `Bugzilla Bug ${trap.bugs.firefox}`;
        img.src = '/bug-icons/firefox.ico';

        bugzillaGetBugState(trap.bugs.firefox)
          .then((status) => {
            if (status === false) {
              img.style.filter = 'grayscale(100%)';
            }
          })
          .catch(error => console.error('Error while getting Bugzilla bug info', error));

        link.appendChild(img);
        container.appendChild(link);
      }

      if (container.childNodes.length > 0) {
        el.querySelector('.bugs').appendChild(container);
      }
    }

    const categoryEl = trapNav.querySelector(`#${trap.category.name}`);
    const list = categoryEl.querySelector('ul');

    list.appendChild(el);
    categoryEl.style.display = 'initial';
  });
})();
