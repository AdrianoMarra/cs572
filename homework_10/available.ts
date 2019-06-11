
export function addAvailability(val:boolean) {
    return function (targetClass: Function) {
         return class {
            available = val;
        }
    }
}
