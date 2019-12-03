import docReady from "./docready";
import footerVisible from "./footerVisible";

function determineFooterElement(): Element {
  return (
    document.querySelector("footer") ||
    document.querySelector(".footer") ||
    document.querySelector("#footer")!
  );
}

function footerCallback() {
  console.log("hello");
}

docReady(() => {
  footerVisible(determineFooterElement(), footerCallback);
});
