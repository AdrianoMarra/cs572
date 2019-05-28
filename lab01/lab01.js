/**
 * Resp question 01:
 */

const removeNum = function (num) {
    const arr = this;
    return new Promise((resolve, reject) => {
        resolve(arr.filter(item => item != num))
    });
}

Array.prototype.removeNum = removeNum;

console.log("Start");
[1,3,4,2,1,5].removeNum(1).then(response => console.log(response))
console.log("Finish");

/**
 * Resp question 02:
 */

var URL = 'https://randomuser.me/api/';

const formatData = function (results) {
    let resp = [];

    results.forEach(element => {
        const obj = { name, location };
        obj.name = element.name;
        obj.location = element.location;
        resp.push(obj);
    });

    return resp;
}

function simpleFetchApi() {
    console.log("Before simpleFetchApi");

    fetch(URL)
        .then(response => response.json())
        .then(myJson => {
            console.log(formatData(myJson.results));
        });

    console.log("After simpleFetchApi");
}

const fetchApiPromise = function () {
    return new Promise((resolve, reject) => {

        resolve(
            fetch(URL)
                .then(response => response.json())
                .then(myJson => {
                    return formatData(myJson.results);
                })
        );

        reject(new Error("Call failled"));
    });
}

async function asyncAwaitFetch() {
    console.log("Before asyncAwaitFetch");
    try {
        const results = await fetchApiPromise();
        console.log("Keep doing something...");
        console.log(results);
    } catch (error) {
        console.log(error);
    }
    console.log("After asyncAwaitFetch");
}

const { from } = rxjs;
const { map } = rxjs.operators;

const reactiveFetch = function () {
    console.log("Before reactiveFetch");

    let myPromise = fetchApiPromise();
    let obs$ = from(myPromise);

    obs$.pipe(
        // I am using map here just to show how 
        // we could use the operators inside the pipe 
        map((item, idx) => {
            return {
                mappedName: item[idx].name, 
                mappedLocation: item[idx].location
            }
        })
    )
        .subscribe((item) => console.log(item));

    console.log("After reactiveFetch");
}

/**
 * All the methods above are Asyncronous.
 * */