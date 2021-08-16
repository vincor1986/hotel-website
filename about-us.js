const infoSelectBtns = Array.from(document.querySelectorAll(".info-heading"));

const infoContent = Array.from(document.querySelectorAll(".about-us-content"));

const infoSelect = document.querySelector("#info-select");

infoSelect.addEventListener("change", (e) => {
  infoContent.forEach((el) => (el.style.display = "none"));
  let target = getElement(e.target.value);
  target.style.display = "flex";
});

infoSelectBtns.forEach((el, index) => (el.style.zIndex = `${20 - index}`));

infoSelectBtns[0].disabled = true;

const getElement = (str) => {
  let string = str.toLowerCase().replaceAll(" ", "-").replace("&", "and");
  return document.querySelector(`.${string}-about-us-content-wrapper`);
};

infoSelectBtns.forEach((el) => {
  el.addEventListener("click", (e) => {
    let y = window.scrollY;
    showContent(e.target);
    window.scrollTo(0, y);
  });
});

const showContent = (el) => {
  infoContent.forEach((el) => (el.style.display = "none"));
  let target = getElement(el.innerText);
  target.style.display = "flex";
  infoSelectBtns.forEach((el, index) => {
    el.disabled = false;
    el.style.zIndex = `${20 - index}`;
  });
  el.disabled = true;
  el.style.zIndex = "50";
};

const a = document.querySelector(".header-background-img");

let mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!mediaQuery || mediaQuery.matches) {
  (function () {
    $(window)
      .unbind("scroll")
      .scroll(function () {
        a.style.top = `-${window.scrollY / 1.5}px`;
      });
  })();
}

mediaQuery.addEventListener("change", () => {
  (function () {
    $(window)
      .unbind("scroll")
      .scroll(function () {
        a.style.top = window.scrollY;
      });
  })();
});
