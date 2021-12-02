import * as sizeRangejs from './sizeRange.js';
import * as priceRangejs from './priceRange.js';
import * as categoryjs from './category.js';
import * as viewsjs from './views.js';
import * as urljs from './getUrlParams.js';

viewsjs.showSizesToRange();
viewsjs.showPriceRanges();
viewsjs.showCategories();
viewsjs.showAllRestaurants();
urljs.urlParams();


//***************** Function that load restaurants from JSON file *****************
export async function loadRestaurantsJSON() {
  const response = await fetch('./json/restaurants.json');
  return response.json();
}


//***************** Function that returns all restaurants *****************
export function returnAllRestaurants(restaurants) {
  const result = [];

  for (let i = 0; i < restaurants.length; i++) {
    result.push(restaurants[i]);
  }
  return result;
}


//***************** Function that returns all checked categories *****************
export function isChecked() {
  let checkboxes = document.getElementsByName("checkbox");
  let checked = [];
  checkboxes.forEach(element => {
    categoryjs.categories.forEach(category => {
      if (element.checked && element.id == category.type) {
        checked.push(category);
      }
    })
  })
  return checked;
}


//***************** Function that returns true if any category is checked *****************
export function anyCheckbox() {
  let inputElements = document.getElementsByName("checkbox");
  for (var i = 0; i < inputElements.length; i++)
    if (inputElements[i].type == "checkbox")
      if (inputElements[i].checked)
        return true;
  return false;
}


//***************** Change class name on click on button  *****************
let btns = document.getElementsByTagName('button');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
}



//***************** Event listener when you click on button find restaurants which are open now  *****************
document.getElementById('openRightNow').addEventListener('click', async function () {
  const urlQuery = new URLSearchParams();
  urlQuery.set('openRightNow', 'true');
  window.location.search = urlQuery;
});


//***************** Event listener when you click on button find restaurants which are at specific time  *****************
document.getElementById('filterTime').addEventListener('click', async function () {
  let time = parseInt(document.getElementById('workTime').value);
  if (document.getElementById('workTime').value.length == 0 || isNaN(time) || time < 0 || time > 24) {
    document.getElementById('output').innerText = "Please enter a valid value [1 - 24]!";
  }
  else {
    const urlQuery = new URLSearchParams();
    urlQuery.set('workTime', time);
    window.location.search = urlQuery;
  }
});


//***************** Event listener when you click on button find restaurants in specific size range  *****************
document.getElementById('sizeRange').addEventListener('click', async function (e) {
  document.getElementById('notice').innerText = "All restaurants: ";

  const urlQuery = new URLSearchParams();

  urlQuery.set('minimumSize', sizeRangejs.sizeRanges[e.target.value].min);
  urlQuery.set('maximumSize', sizeRangejs.sizeRanges[e.target.value].max);
  window.location.search = urlQuery;
});


//***************** Event listener when you click on button find restaurants in specific price range  *****************
document.getElementById('priceRange').addEventListener('click', async function (e) {
  document.getElementById('notice').innerText = "All restaurants : ";
  const urlQuery = new URLSearchParams();

  urlQuery.set('minimumPrice', priceRangejs.priceRanges[e.target.value].min);
  urlQuery.set('maximumPrice', priceRangejs.priceRanges[e.target.value].max);
  window.location.search = urlQuery;
});


//***************** Event listener when you click on button reset, to reset all filters  *****************
document.getElementById('reset').addEventListener('click', async function () {
  document.getElementById('notice').innerText = "";
  document.getElementById('output').innerText = "";
  document.getElementById('workTime').value = "";
  let inputElements = document.getElementsByName("checkbox");
  for (var i = 0; i < inputElements.length; i++)
    if (inputElements[i].type == "checkbox") {
      inputElements[i].checked = false;
    }
  viewsjs.showAllRestaurants(await loadRestaurantsJSON());

  let urlQuery = new URLSearchParams();
  urlQuery = "";
  window.location.search = urlQuery;
}
);


//***************** Event listener when you click on button find restaurants which contains all checked categories  *****************
document.getElementById('allCategories').addEventListener('click', async function () {
  if (!anyCheckbox()) {
    document.getElementById('allCategories').setAttribute("disabled", "disabled");
  }
  else {
    const urlQuery = new URLSearchParams();
    urlQuery.set('allCategories', true);
    for (let i = 0; i < isChecked().length; i++) {
      console.log(categoryjs.categories);
      let category = isChecked()[i];
      urlQuery.set('category' + i, category.type);

    }
    window.location.search = urlQuery;

  }
});


//***************** Event listener when you click on button find restaurants which contains any checked categories  *****************
document.getElementById('someCategories').addEventListener('click', async function () {
  if (!anyCheckbox()) {
    document.getElementById('someCategories').setAttribute("disabled", "disabled");
  }
  else {
    const urlQuery = new URLSearchParams();
    urlQuery.set('anyCategories', 'true');
    for (let i = 0; i < isChecked().length; i++) {
      console.log(categoryjs.categories);
      let category = isChecked()[i];
      urlQuery.set('category' + i, category.type);

    }
    window.location.search = urlQuery;
  }
});
