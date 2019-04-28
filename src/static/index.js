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

    trapNav.appendChild(el);
  });
})();
