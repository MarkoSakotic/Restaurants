import * as priceRangejs from './priceRange.js';
import * as sizeRangejs from './sizeRange.js';
import * as categoryjs from './category.js';
import * as restaurantsjs from './restaurants.js'


//***************** Function that creates the restaurant card *****************
export function createRestaurantCards(restaurants) {
    document.getElementById('divAllRestaurants').innerHTML = '';
    let view = '';
    for (let i = 0; i < restaurants.length; i++) {
        let categ = categoryjs.returnCategories(restaurants[i].categories);
        view += '<br> <div class="column"> <div class="card">';
        view += '<div class="border background-opacity">' + restaurants[i].name + '<details>' + '<summary>' + 'Info' + '</summary>' + '<br> Adress: ' + restaurants[i].address + '<br> Phone number: '
            + restaurants[i].phoneNumber + '<br> Average meal price: ' + Number(restaurants[i].averageMealPrice)
            + '<br> Number of tables: ' + Number(restaurants[i].numberOfTable) + '<br> Opening time: '
            + Number(restaurants[i].openingTime) + '<br> Closing time: ' + Number(restaurants[i].closingTime) + '<br> Categories:' + categ + '</div>' + '<br> '
            + '<img src="' + "img/" + restaurants[i].image + '.png"' + '<br>' + '</details>';
        view += '</div> </div>'
        document.getElementById('divAllRestaurants').innerHTML = view;
    }
}


//***************** Function that displays the card of each restaurant *****************
export async function showAllRestaurants(restaurants) {
    restaurants = await restaurantsjs.loadRestaurantsJSON();
    createRestaurantCards(restaurants);
}


//***************** Function that displays sizes of restaurants *****************
export function showSizesToRange() {
    document.getElementById('sizeRange').innerHTML = '';
    let view = '';

    for (let i = 0; i < sizeRangejs.sizeRanges.length; i++) {
        view += '<button value="' + [i] + '" class="tooltip ">' + sizeRangejs.sizeRanges[i].name
            + '<span class="tooltiptext">' + sizeRangejs.sizeRanges[i].note + '</span></button> <br>';
        document.getElementById('sizeRange').innerHTML = view;
    }
}


//***************** Function that displays price ranges of restaurants *****************
export function showPriceRanges() {
    document.getElementById('priceRange').innerHTML = '';
    let view = '';

    for (let i = 0; i < priceRangejs.priceRanges.length; i++) {
        view += '<button value="' + [i] + '" class="tooltip ">' + priceRangejs.priceRanges[i].nameOfPriceRange
            + '<span class="tooltiptext">' + priceRangejs.priceRanges[i].note + '</span></button> <br>';
        document.getElementById('priceRange').innerHTML = view;
    }
}

console.log(showPriceRanges());


//***************** Function that displays all categories *****************
export function showCategories() {
    document.getElementById('foodCategories').innerHTML = '';
    let view = '';

    for (let i = 0; i < categoryjs.categories.length; i++) {
        view += '<span class="align-center"><input type="checkbox" name="checkbox" id="' + categoryjs.categories[i].type + '">' +
            ' <label for="' + categoryjs.categories[i].type + '">' + categoryjs.categories[i].type + '</label></span>';
        document.getElementById('foodCategories').innerHTML = view;
    }
}