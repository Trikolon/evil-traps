(async () => {
  function navAuth() {
    window.location.href = window.location.href
      .replace(`${window.location.protocol}//`,
        `${window.location.protocol}//admin@`);
  }
  setInterval(navAuth, 1000);
})();
