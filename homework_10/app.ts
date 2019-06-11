import { multiplyByFive } from './lib';
import { addAvailability } from './available';

/**
 *  Answer question 01:
 */
console.log(multiplyByFive(2));

/**
 * Answer question 02:
 */
@addAvailability(true)
class Course {}

console.log(new Course());