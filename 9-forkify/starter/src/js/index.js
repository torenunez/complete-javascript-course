// Global app controller
import string from './models/Search';
import {add as a, multiply as m, ID} from './views/searchView';
// import * as sv from './views/searchView';

console.log(`Using imported functions! Adding and multiplying 2 and ${ID}, is ${a(ID,2)} and ${m(ID,2)}, respectively. By the way, ${string}`)