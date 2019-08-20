import get from "./selector"

class DownloadCV {
    constructor() {
        const DOM_STRING = {
            download: "#download",
            modal: ".modal",
            triggerClass: "downloadtriggered",
            items: ".modal--text",
            nav: ".nav"

        }
        this.button = get(DOM_STRING.download);
        this.modal = get(DOM_STRING.modal);
        this.triggerClass = DOM_STRING.triggerClass;
        this.nav = get(DOM_STRING.nav);
        this.modalItems = Array.from(get(DOM_STRING.items, "all"));
        this.events();
    }

    events() {
        this.button.addEventListener("click", this.revealModal.bind(this));
        this.modalItems.forEach((each) => each.addEventListener("click", this.hideModal.bind(this)));
    }


    revealModal(e) {
        e.preventDefault();
        this.modal.classList.add(this.triggerClass);
        setTimeout(() => this.modal.classList.remove(this.triggerClass), 8000);
    }

    hideModal() {
        this.modal.classList.remove(this.triggerClass);
    }
}


export default DownloadCV;