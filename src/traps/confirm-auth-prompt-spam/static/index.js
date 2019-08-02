(() => {
  const nextLocation = window.location.href
    .replace(`${window.location.protocol}//`,
      `${window.location.protocol}//admin@`);
  setInterval(() => {
    window.location.href = nextLocation;
  }, 1000);
})();
