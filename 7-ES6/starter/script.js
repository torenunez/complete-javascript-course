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
    
    printTreeDensity(){
        console.log(`${this.name} has a tree density of ${this.treeDensity()} trees per square km.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size='normal') {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}


function calcTotAvg(arr) {
    let total = 0;
    
    for (const a of arr) {
        total += a
       }

    return [total, total/ arr.length]
}
    

const Park1 = new Park('Parque Tezozomoc', 1900, 1512, 2151);
const Park2 = new Park('Parc Guell', 1950, 15, 121);
const Park3 = new Park('Griffith Park', 1960, 120, 1025);
const parks = [Park1, Park2, Park3];

const Street1 = new Street('Fair Oaks', 1915, 112);
const Street2 = new Street('Reforma', 1890, 950, 'huge');
const Street3 = new Street('Passeig Gracia', 1800, 50, 'tiny');
const Street4 = new Street('Lopez Mateos', 1920, 512, 'big');
const streets = [Street1, Street2, Street3, Street4];


function reportParks(p) {
    
    console.log('---------------------------')
    console.log('   Park Report')
    console.log('---------------------------')
    
    // 1 
    p.forEach(el => el.printTreeDensity()); 
    
    // 2
    const [totalAge, avgAge] = calcTotAvg(p.map(el => el.calculateAge()));
    console.log(`The average age for all parks is  ${avgAge}.`);
    
    // 3
    const i = p.map(el => el.trees).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has ${p[i].trees} tres, which is greater than 1000.`)

};


function reportStreets(s) {
    
    console.log('---------------------------')
    console.log('   Streets Report')
    console.log('---------------------------') 
    
    // 4
    const [totalLength, avgLength] = calcTotAvg(s.map(el => el.length));
    console.log(`The total street length is ${totalLength} and the average street length is ${avgLength}.`)
    // 5
    s.forEach(obj => console.log(`${obj.name} is ${obj.size}.`)); 
};


reportParks(parks);
reportStreets(streets);
