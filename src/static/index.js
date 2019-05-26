(async () => {
  const trapNav = document.getElementById('trapNav');
  const listEl = document.getElementById('listEl');

  // Fetch trap data from backend
  const response = await fetch('/info');
  if (!response.ok) {
    throw new Error('Received error code while fetching list of traps');
  }
  const info = await response.json();

  console.debug('Available traps', info);

  // Build main nav
  info.traps.forEach((trap) => {
    // Skip hidden traps
    if (trap.unlisted) return;

    const el = listEl.content.cloneNode(true);

    el.querySelector('a').href = info.trapPathPrefix + trap.path;
    el.querySelector('.refTitle').innerText = trap.name;
    el.querySelector('.refBody').innerText = trap.description;

    if (trap.bugs) {
      const container = document.createElement('span');

      if (trap.bugs.firefox) {
        const link = document.createElement('a');
        link.href = `https://bugzilla.mozilla.org/show_bug.cgi?id=${trap.bugs.firefox}`;
        link.target = '_blank';
        const img = document.createElement('img');
        img.src = '/bug-icons/firefox.ico';
        link.appendChild(img);
        container.appendChild(link);
      }

      if (container.childNodes.length > 0) {
        el.querySelector('.bugs').appendChild(container);
      }
    }

    trapNav.appendChild(el);
  });
})();
