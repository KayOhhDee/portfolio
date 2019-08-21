import "waypoints/lib/noframework.waypoints.min";
import _babelPolyfill from "babel-polyfill";
import get from "./selector";

class Counter {
    constructor(counterObject) {
        this.counterObject = counterObject;
        this.index = 0;
        this.hasRun = false;
        this.elements = [];
        this.id = get("#counter");
        this.setWaypoint();

    }

    test() {
        let self = this;
        let promiseObject = Promise.all(this.elements);
        promiseObject
            .then(x => x.forEach(function (e) {
                self.countNext.call(this, e);
            }));
    }

    *generator() {
        let index = this.index;
        yield this.counterObject[index];
    }


    countNext(promise) {
        let [count, stop] = [1, promise.stop];
        setTimeout(function () {
            let startCounter = setInterval(function () {
                get(promise.countNode).textContent = count;
                if (count === stop) {
                    clearInterval(startCounter);
                }
                count++;
            }, 100);
        }, promise.delay);
    }

    setCounter() {
        let self = this;
        let count = this.counterObject.length;
        for (let i = 0; i < count; i++) {
            this.index = i;
            this.elements.push(new Promise(function (resolve) {
                resolve(self.generator().next().value);
            }));
        }
    }

    setWaypoint(){
        let self = this;
        return new Waypoint({
           element: self.id,
            handler: () => {
               if(!self.hasRun){
                   self.setCounter();
                   self.test();
                   self.hasRun = true;
               }
            },
            offset: "40%"
        });
    }
}


export default Counter;
