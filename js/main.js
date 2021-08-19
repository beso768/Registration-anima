const burgerBtn = $(".burger-button");
const menu = $(".mobile-menu");
const closeMenu = () => {
  menu.css("right", "-100%");
  $("nav").css("display", "none");
};
const openMenu = () => {
  menu.css("right", 0);
  $("#menu-close").click(closeMenu);
  $("nav").css("display", "flex");
};
burgerBtn.click(openMenu);
