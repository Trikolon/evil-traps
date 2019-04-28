function fullscreen(event) {
  if (event && event instanceof Event) event.preventDefault();
  console.debug('requesting fullscreen and pointer lock', { event });
  document.body.requestFullscreen({ navigationUI: false });
  document.body.requestPointerLock();
}

function registerEventListeners() {
  document.addEventListener('contextmenu', fullscreen);
  document.addEventListener('keydown', fullscreen);
  document.addEventListener('mousedown', fullscreen);
  document.body.addEventListener('load', fullscreen);
  document.body.addEventListener('focus', fullscreen);
  document.body.addEventListener('fullscreenchange', fullscreen);
  document.body.addEventListener('resize', fullscreen);
  document.body.addEventListener('scroll', fullscreen);
  document.body.addEventListener('mouseenter', fullscreen);
}

Notification.requestPermission().then(() => fullscreen());

// Try to enter fullscreen on page load (most likely blocked)
fullscreen();

registerEventListeners();
