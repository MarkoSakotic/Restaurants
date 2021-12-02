import * as viewsjs from './views.js';
import * as filterjs from './filter.js';
import * as restaurantsjs from './restaurants.js'

//***************** Function that return view based on URL params *****************
export async function urlParams() {

  const paramsFromUrl = new URLSearchParams(window.location.search);
  console.log(paramsFromUrl.toString());

  let paramsSize = {
    minimumSize: Number(paramsFromUrl.get('minimumSize')),
    maximumSize: Number(paramsFromUrl.get('maximumSize'))
  };

  let paramsPrice = {
    minimumPrice: Number(paramsFromUrl.get('minimumPrice')),
    maximumPrice: Number(paramsFromUrl.get('maximumPrice'))
  };

  let workTime = Number(paramsFromUrl.get('workTime'));

  const urlKeys = [...new URL(window.location.href).searchParams.keys()];

  let categories = [];


  let count = urlKeys.length;
  console.log(count);


  for (let i = 0; i < count - 1; i++) {
    categories.push({ type: paramsFromUrl.get('category' + i) })
  }

  console.log(categories);
  console.log(typeof (categories));

  if (urlKeys[0] === 'openRightNow') {
    document.getElementById('notice').innerText = "All restaurants which are open now: ";
    return viewsjs.createRestaurantCards(filterjs.findRestaurantsWhichAreOpenRightNow(await restaurantsjs.loadRestaurantsJSON()))
  } else if (urlKeys[0] === 'workTime') {
    document.getElementById('output').innerText = "";
    document.getElementById('notice').innerText = "Restaurants which are open at " + workTime + " hour";
    return viewsjs.createRestaurantCards(filterjs.findRestaurantsByTimeOfWork(await restaurantsjs.loadRestaurantsJSON(), workTime))
  } else if (urlKeys[0] === 'minimumPrice') {
    document.getElementById('notice').innerText = "All restaurants with price in range [" + paramsPrice.minimumPrice + " - " + paramsPrice.maximumPrice + "]";
    return viewsjs.createRestaurantCards(filterjs.findRestaurantsByPriceRange(await restaurantsjs.loadRestaurantsJSON(), paramsPrice));
  } else if (urlKeys[0] === 'minimumSize') {
    document.getElementById('notice').innerText = "All restaurants with size in range [" + paramsSize.minimumSize + " - " + paramsSize.maximumSize + "]";
    return viewsjs.createRestaurantCards(filterjs.findRestaurantsBySize(await restaurantsjs.loadRestaurantsJSON(), paramsSize));
  } else if (urlKeys[0] === 'allCategories') {
    document.getElementById('notice').innerText = "All categories included [" + categories.map(obj => obj.type) + "] :";
    return viewsjs.createRestaurantCards(filterjs.findRestaurantsByCategory(await restaurantsjs.loadRestaurantsJSON(), categories));
  } else if (urlKeys[0] === 'anyCategories') {
    document.getElementById('notice').innerText = "Any categories included [" + categories.map(obj => obj.type) + "] :";
    return viewsjs.createRestaurantCards(filterjs.findRestaurantsBySomeCategory(await restaurantsjs.loadRestaurantsJSON(), categories));
  }
}