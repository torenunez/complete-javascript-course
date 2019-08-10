// Global app controller
import axios from 'axios';

async function getResults(query){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '';
    try{
        const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes)
    } catch (error){
        alert(error);
    }  
};

getResults('chayote');