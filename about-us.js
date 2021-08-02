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
    showContent(e.target);
    e.preventDefault();
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
  return false;
};

const a = document.querySelector(".header-background-img");

(function () {
  $(window)
    .unbind("scroll")
    .scroll(function () {
      if (window.scrollY < 1) {
        return (a.style.top = `${+window.scrollY}px`);
      } else {
        return (a.style.top = `-${window.scrollY / 1.5}px`);
      }
    });
})();
