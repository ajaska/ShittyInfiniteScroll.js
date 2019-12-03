// Thanks to https://medium.com/walmartlabs/infinite-scrolling-the-right-way-11b098a08815
export default function(footer: Element, callback: () => void) {
  const options = {};

  const observerCallback: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target === footer) {
        callback();
      }
    });
  };

  var observer = new IntersectionObserver(observerCallback, options);
  observer.observe(footer);
}
