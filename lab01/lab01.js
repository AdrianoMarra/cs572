// const removeNum = function (num) {
//     const arr = this;
//     return new Promise((resolve, reject) => {
//         setTimeout(function() {
//             resolve(arr.filter(item => item != num)) 
//         }, 1000);
//     });
// }

// Array.prototype.removeNum = removeNum;

// console.log("Start");
// [1,3,4,2,1,5].removeNum(1).then(response => console.log(response))
// console.log("Finish");


const fetchApi = function () {

    console.log("before fetchApi");

    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(myJson => {
        console.log(myJson.results[0].name)
        console.log(myJson.results[0].location)
    });

    console.log("after fetchApi");

}

async function asyncAwaitFetch() {

    console.log("before asyncAwaitFetch");

    try {
        let results = await fetchApi();
    } catch (error) {
        console.log(error);
    }

    console.log("after asyncAwaitFetch");

}