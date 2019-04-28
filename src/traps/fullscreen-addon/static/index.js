const delay = ms => new Promise(r => setTimeout(r, ms));

function install() {
  window.location = 'addon.xpi';
}

function fullscreen() {
  document.body.requestFullscreen({ navigationUI: false });
}

async function fullscreenInstall(reverse = false) {
  if (reverse) {
    install();
    for (let i = 0; i < 1000; i += 1) console.log(i); // Waste some time
  }
  await fullscreen();
  if (!reverse) {
    await delay(1000);
    install();
  }
}

function listenClick(id, handler) {
  const element = document.getElementById(id);
  if (element == null) {
    throw new Error(`Element with id ${id}does not exist.`);
  }
  element.addEventListener('click', handler);
}

listenClick('btnFullscreenInstallReverse', () => fullscreenInstall(true));
listenClick('btnFullscreenInstall', () => fullscreenInstall());
listenClick('btnInstall', install);
listenClick('btnFullscreen', fullscreen);
listenClick('btnInstallExternal', () => {
  window.location = 'https://addons.mozilla.org/firefox/downloads/file/1730458/ublock_origin-1.18.16-an+fx.xpi?src=search';
});
