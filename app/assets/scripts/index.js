import '../scss/style.scss';
import Navigation from "./modules/nav";
import ScrollBehavior from "./modules/scrollBehavior";
import DownloadCv from "./modules/download";

window.onload = () => {
  const DOM_STRINGS = {
    aboutCard: ".card--about",
    aboutText: ".card--textContent",
    removeclass: "removetranslate",
    aboutOffset: "30%",
    textOffset: "35%",
    target: ".skill",
    toposition: "toposition",
    svgOffset: "30%",
    svg: ".skill--svg"
  };

  new ScrollBehavior(DOM_STRINGS.aboutCard, DOM_STRINGS.removeclass, DOM_STRINGS.aboutOffset);
  new ScrollBehavior(DOM_STRINGS.aboutText, DOM_STRINGS.removeclass, DOM_STRINGS.textOffset);
  new ScrollBehavior(DOM_STRINGS.target, DOM_STRINGS.toposition, DOM_STRINGS.svgOffset, DOM_STRINGS.svg);
  new Navigation();
  new DownloadCv();
}