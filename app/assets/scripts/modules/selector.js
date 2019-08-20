function get(...args){
    if(args.length > 1) return document.querySelectorAll(...args);
    return document.querySelector(...args);
}

export default get;


