import "waypoints/lib/noframework.waypoints.min";
import smoothScroll from "smoothscroll";
import get from "./selector";


class Navigation {
    constructor() {
        this.dom = {
            navbar: ".nav",
            isVisible: "isVisible",
            border: "border-bottom-isActive",
            hamburger: ".nav--mobile-menu",
            isopened: "isopened",
            navLinks: ".nav--main-link:not(:last-child)",
            transparent: "transparent",
            name: ".hero--i",
            about: "#about",
            show: "show"

        };
        this.navbar = get(this.dom.navbar);
        this.hamburger = get(this.dom.hamburger);
        this.breakpoint = get(this.dom.name);
        this.about  = get(this.dom.about);
        this.navlinks = Array.from(get(this.dom.navLinks, "all"));
        this.events();
        this.waypoint();
    }


    events() {
        this.hamburger.addEventListener("click", this.revealNavigation.bind(this));
        this.navlinks.forEach(this.smoothscroll.bind(this));
    }

    removeborder(element) {
        let context = this;
        this.navlinks.forEach(function (el) {
            element.classList.add(context.dom.border);
            if (element !== el) el.classList.remove(context.dom.border);
        });
    }

    smoothscroll(el) {
        const self = this;
        el.addEventListener("click", function (e) {
            e.preventDefault();
            let refPoint = get(this.getAttribute("data-id"));
            smoothScroll(refPoint, 1500);
            self.removeborder(this);
        });
    }

    revealNavigation() {
        this.navbar.classList.toggle(this.dom.isVisible);
        this.hamburger.classList.toggle(this.dom.isopened);
    }

    waypoint() {
        let self = this;
        new Waypoint({
            element: self.breakpoint,
            handler: function (direction) {
                if(direction === "down"){
                    self.navbar.classList.add(self.dom.transparent);
                }
            }
        });

        new Waypoint({
            element: self.about,
            handler: function (direction) {
                if(direction === "up")
                     self.navbar.classList.remove(self.dom.show, self.dom.transparent);

            }
        });

        new Waypoint({
            element: self.about,
            handler: function (direction) {
                if(direction === "down")
                    self.navbar.classList.add(self.dom.show, self.dom.transparent);
            }
        });

    }
}

export default Navigation;
