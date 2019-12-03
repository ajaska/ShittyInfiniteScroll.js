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

  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = "https://picsum.photos/200/300";

    div.className = "cheese-block";
    div.textContent = "hello world";
    footer.parentNode.insertBefore(div, footer);
    footer.parentNode.insertBefore(img, footer);
  }
}

function footerCallback() {
  setTimeout(() => insertInfiniteScrollItems(), 500);
  console.log("hello");
}

docReady(() => {
  footer = determineFooterElement();
  if (footer != null) {
    footerVisible(footer, () => footerCallback());
  }
});
