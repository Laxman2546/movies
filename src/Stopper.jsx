const Stopper = () => {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === "I")
      event.preventDefault();
    if (event.ctrlKey && event.shiftKey && event.key === "J")
      event.preventDefault();
    if (event.ctrlKey && event.key === "U") event.preventDefault();
  });
  (function detectDevTools() {
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        window.location.href = "https://www.google.com";
      },
    });
    console.log("%c", element);
  })();
  setInterval(function () {
    if (window.outerWidth - window.innerWidth > 200) {
      window.location.href = "https://www.google.com";
    }
  }, 1000);
  setInterval(function () {
    const before = new Date();
    debugger;
    const after = new Date();
    if (after - before > 100) {
      window.location.href = "https://www.google.com";
    }
  }, 1000);
  return <></>;
};
export default Stopper;
