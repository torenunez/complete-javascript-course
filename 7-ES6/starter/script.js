/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


class Element {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.buildYear;
        this.age = age;
        return age
    }
}


class Park extends Element {
    constructor(name, buildYear, trees, area) {
        super(name, buildYear);
        this.trees = trees;
        this.area = area;
    }
    
    treeDensity() {
        return this.trees/this.area;
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size='normal') {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}


function avgAge(Parks) {
    let totalAge = 0;
    Parks.forEach(obj => totalAge += obj.calculateAge());
    return totalAge/Parks.size
}

function lengthInfo(Streets) {
    let totalLength = 0;
    Streets.forEach(obj => totalLength += obj.length);
    return {
        total: totalLength,
        avg: totalLength/Streets.size
    }
}


const Park1 = new Park('Parque Tezozomoc', 1900, 1512, 2151);
const Park2 = new Park('Parc Guell', 1950, 15, 121);
const Park3 = new Park('Griffith Park', 1960, 120, 1025);

const Street1 = new Street('Fair Oaks', 1915, 112);
const Street2 = new Street('Reforma', 1890, 950, 'huge');
const Street3 = new Street('Passeig Gracia', 1800, 50, 'tiny');
const Street4 = new Street('Lopez Mateos', 1920, 512, 'big');



const Parks = new Map();
Parks.set(1, Park1);
Parks.set(2, Park2);
Parks.set(3, Park3);


const Streets = new Map();
Streets.set(1, Street1);
Streets.set(2, Street2);
Streets.set(3, Street3);
Streets.set(4, Street4);

// Basic
//Parks.forEach(obj => console.log(obj));
//Streets.forEach(obj => console.log(obj));

// Questions
console.log('---------------------------')
console.log('Elements Report')
console.log('---------------------------')

// 1 ...k, v order reversed in Python?
Parks.forEach((value, key) => console.log(`Park ${key} is called ${value.name} and has a tree density of ${value.treeDensity()}.`)); 
// 2
console.log(`The average age for all parks is  ${avgAge(Parks)}.`)
// 3
Parks.forEach((value, key) => {
    if (value.trees > 1000){
        //console.log(key, value.name, value.trees)
        console.log(`Park ${key} is called ${value.name} and has ${value.trees} tres, which is greater than 1000.`)
    }
})
// 4
const {total, avg} = lengthInfo(Streets);
console.log(`The total length is ${total} and the avg length is ${avg}.`)
// 5
Streets.forEach((value, key) => console.log(`Street ${key} is called ${value.name} and is ${value.size}.`)); 





