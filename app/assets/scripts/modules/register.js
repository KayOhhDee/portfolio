import get from "./selector";
import * as firebase from "firebase/app";
import "firebase/database";
import { CountUp } from "countup.js";
import firebaseConfig from "./config";

class Register {
    constructor() {
        this.registerContent = get(".showcase--button");
        this.nofication = get(".showcase--notify");
        this.span = get(".showcase--number");
        this.portfolio = get(".projects");
        this.notifIndex = 0;
        this.notifStatements = ["Bravo!!!!", "keep Going", "Getting there", "Marvelous!!!", "okay self's enough:)"];
        this.count = 0;
        this.init();
        this.ref;
        this.events();
        this.syncData();
    }

    init() {
        firebase.initializeApp(firebaseConfig);
        this.pullFromFirebase();
    }

    events() {
        this.registerContent.addEventListener("click", this.async.bind(this));
    }

    *generator() {
        let index = this.notifIndex;
        yield this.notifStatements[index];
    }


    changeText() {
        let text = this.generator().next().value;
        if (text) {
            this.nofication.textContent = text;
            this.notifIndex++

        } else {
            this.nofication.textContent = "okay stop now:(, im out fo words";
            this.notifIndex = 0;
        }
    }


    mutateRef() {
        return this.ref = this.count + 30;
    }
    
    pullFromFirebase() {
        const ref = firebase.database().ref("register/counter");
        ref.once("value")
            .then((snapshot) => {
                let currentNumber = snapshot.val();
                return currentNumber;
            }).then((currentNumber) => {
            let self = this;
            const counting = new CountUp(self.span, self.count, currentNumber, 0, 3);
            counting.start();
            this.count = currentNumber;
            this.ref = currentNumber + 10;
        });
    }

    syncData() {
        const ref = firebase.database().ref("register/counter");
        let data;
        ref.on("value", (snapshot) => {
            data = snapshot.val();
            let self = this;
            const counting = new CountUp(self.span, self.count, data, 0, 10);
            counting.start();
            this.count = data;
        });
    }


    async() {
        this.count++;
        const promise = new Promise((resolve) => {
            resolve(this.count)
        });
        return this.callstack(promise);
    }

    callstack(promise) {
        promise
            .then((count) => this.updateNumber(count))
            .then((count) => this.addToDataBase(count))
            .then(() => this.notify())
    }

    updateNumber(currentNumber) {
        this.span.textContent = currentNumber;
        return currentNumber;
    }

    notify() {
        if (this.count === this.ref) {
            this.nofication.classList.add("movein");
            setTimeout(() => this.nofication.classList.remove("movein"), 4000)
            this.mutateRef();
            this.changeText();
        }
    }
    

    addToDataBase(currentNumber) {
        let db = firebase.database().ref("register/counter");
        db.set(currentNumber);
        return currentNumber;
    }

}

export default Register;