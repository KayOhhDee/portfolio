import "waypoints/lib/noframework.waypoints.min";
import get from "./selector";


class ScrollBehavior {
    constructor(className, modifierClass, offset, ...args) {
        this.target = get(className);
        this.offset = offset || null;
        this.modifierclass = modifierClass;
        let subs;
        if (args.length) {
            subs = Array.from(get(args[0], "all"));
        }
        this.subtargets = subs || [];
        this.setWayPoints();
    }
    
    animateSubtargets(){
        if(this.subtargets.length > 1){
            this.subtargets.forEach( each => each.classList.add(this.modifierclass));
            return false;
        }
    }
    
    setWayPoints(){
        let self = this;
         new Waypoint({
           element: self.target,
            handler: (direction) => {
               if(direction === "down"){
                   try{
                       self.animateSubtargets();
                       self.target.classList.add(self.modifierclass);

                   }catch(e){
                       console.log(e);
                   }
               }
            },
            offset: self.offset
        });
    }
}

export default ScrollBehavior;