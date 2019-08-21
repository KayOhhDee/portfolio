import '../scss/style.scss';
import Navigation from "./modules/nav";
import ScrollBehavior from "./modules/scrollBehavior";
import DownloadCv from "./modules/download";
import Counter from "./modules/counter";
import Register from "./modules/register";

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
    svg: ".skill--svg",
    countObj: [
      { countNode: ".count", stop: 15, delay: 200, speed: 50 },
      { countNode: ".count--2", stop: 14, delay: 1050, speed: 50 },
      { countNode: ".count--3", stop: 1, delay: 1900, speed: 50 }
    ]
  };

  new Navigation();
  new ScrollBehavior(DOM_STRINGS.aboutCard, DOM_STRINGS.removeclass, DOM_STRINGS.aboutOffset);
  new ScrollBehavior(DOM_STRINGS.aboutText, DOM_STRINGS.removeclass, DOM_STRINGS.textOffset);
  new ScrollBehavior(DOM_STRINGS.target, DOM_STRINGS.toposition, DOM_STRINGS.svgOffset, DOM_STRINGS.svg);
  new Counter(DOM_STRINGS.countObj);
  new DownloadCv();
  new Register();
}