import EvilTrap from '../../EvilTrap';

export default new EvilTrap('Navigation Block', EvilTrap.CATEGORY.MISC, 'Abuses unload event to prevent user from navigating away from the site or reporting it to SafeBrowsing.', {firefox: '1263100'})
  .addScriptPage(() => {
    const storageKey = 'unloadTriggered';

    function appendMsg(msg) {
      const el = document.createElement('h1');
      el.innerText = msg;
      document.body.appendChild(el);
    }

    if (localStorage.getItem(storageKey)) {
      localStorage.removeItem(storageKey);
      appendMsg("You're still here!");
      document.body.style.backgroundColor = 'red';
    }
    appendMsg('Go ahead, navigate away without closing the tab, or report me via Help-> Report Deceptive Site');
    window.onbeforeunload = () => {
      localStorage.setItem(storageKey, true);
      setTimeout(() => {
        window.location.reload(true);
      }, 10);
      window.onbeforeunload = () => {};
      return 'You are about to leave this page!';
    };
  });
