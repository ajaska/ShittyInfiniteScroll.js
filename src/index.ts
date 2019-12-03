import docReady from "./docready";
import footerVisible from "./footerVisible";

let footer: Element | null = null;

function determineFooterElement() {
  return (
    document.querySelector("footer") ||
    document.querySelector(".footer") ||
    document.querySelector("#footer")
  );
}

function insertInfiniteScrollItems() {
  if (footer?.parentNode == null) return;

  // Whoa. An old-school for-loop.
  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");
    img.src = "https://picsum.photos/300/200";

    footer.parentNode.insertBefore(img, footer);
  }
}

function footerCallback() {
  setTimeout(() => insertInfiniteScrollItems(), 500);
}

docReady(() => {
  footer = determineFooterElement();
  if (footer != null) {
    footerVisible(footer, () => footerCallback());
  }
});
