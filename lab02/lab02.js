const pluck = function(asyncMeth, option) {
    if (option){
        const maxVal = Math.max(...this);
        console.log(asyncMeth + maxVal);
        let arr = this.filter(item => item != maxVal);
    } else {
        const minVal = Math.min(...this);
        console.log(asyncMeth + minVal);
        let arr = this.filter(item => item != minVal);
    } 
}

const pluckImmediate = function(option) {
    setImmediate(() => {
        this.pluck("Immediate: ", option);
    });
}

const pluckNextTick = function(option) {
    process.nextTick(() => {
        this.pluck("NextTick: ", option);
    });
}

Array.prototype.pluck = pluck;
Array.prototype.pluckImm = pluckImmediate;
Array.prototype.pluckNT = pluckNextTick;

console.log('Immediate start');
[1,2,3,4,5,6,7,8].pluckImm(true); // pluck largest
[1,2,3,4,5,6,7,8].pluckImm(false); // pluck smallest
console.log('Immediate end');

console.log('NextTick start');
[1,2,3,4,5,6,7,8].pluckNT(true); // pluck largest
[1,2,3,4,5,6,7,8].pluckNT(false); // pluck smallest
console.log('NextTick end');