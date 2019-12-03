import docReady from "./docready";

function determineFooterElement(): HTMLElement {
  return document.querySelector("footer")!;
}

function footerCallback() {
  console.log("hello");
}

const initIntersectionObserver = () => {
  const options = {
    /* root: document.querySelector(".cat-list") */
  };

  const footer = determineFooterElement();

  const callback: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
      if (entry.target === footer) {
        footerCallback();
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);
  observer.observe(footer);
};

docReady(initIntersectionObserver);
