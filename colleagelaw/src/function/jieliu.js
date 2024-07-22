export const throttle = (handler, wait) => {
    var previous = 0;
    console.log('1')
    return function () {
        let now = Date.now();
        let context = this;
        console.log(this);
        if (now - previous > wait) {
            handler()
            previous = now;
        }
    }
}