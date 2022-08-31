const bannerSlider = document.querySelector(".banner-container");
const bannerImages = document.querySelectorAll(".banner-image");
const menuIcon = document.querySelector(".menu");
const menu = document.querySelector(".hidden-menu");

menuIcon.addEventListener("click", () => {
  if (menu.classList.contains("show-menu")) {
    menu.classList.remove("show-menu");
  } else {
    menu.classList.add("show-menu");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (!bannerSlider) return false;
  setInterval(() => {
    bannerSlider.firstElementChild.classList.add("remove");
    let banner = bannerSlider.firstElementChild.innerHTML;
    bannerSlider.insertAdjacentHTML(
      "beforeend",
      `<div class="banner-image">
    ${banner}
  </div>`
    );
  }, 5000);
});

if (bannerSlider) {
  bannerSlider.addEventListener("transitionend", () => {
    if (!bannerSlider) return;
    bannerSlider.firstElementChild.remove();
  });
}
