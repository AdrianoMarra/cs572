"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addAvailability(val) {
    return function (targetClass) {
        return /** @class */ (function () {
            function class_1() {
                this.available = val;
            }
            return class_1;
        }());
    };
}
exports.addAvailability = addAvailability;
