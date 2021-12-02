import * as categoryjs from './category.js';

//***************** Function that returns all restaurants *****************
export function returnAllRestaurants(restaurants) {
  const result = [];

  for (let i = 0; i < restaurants.length; i++) {
    result.push(restaurants[i]);
  }
  return result;
}


//***************** Function that returns list of restaurants based of choosen price range *****************
export function findRestaurantsByPriceRange(restaurantByPrice, price) {
  const result = [];

  for (let i = 0; i < restaurantByPrice.length; i++) {
    const restaurant = restaurantByPrice[i];
    if (restaurant.averageMealPrice >= price.minimumPrice && restaurant.averageMealPrice <= price.maximumPrice) {
      result.push(restaurant);
    }
  }
  return result;
}


//***************** Function that returns list of restaurants based of choosen size range *****************
export function findRestaurantsBySize(restaurantsBySize, size) {
  const result = [];

  for (let i = 0; i < restaurantsBySize.length; i++) {
    const restaurant = restaurantsBySize[i];
    if (restaurant.numberOfTable >= size.minimumSize && restaurant.numberOfTable <= size.maximumSize) {
      result.push(restaurant);
    }
  }
  return result;
}


//***************** Function that returns list of restaurants which are open at specific time *****************
export function findRestaurantsByTimeOfWork(restaurantByTime, time) {
  const result = [];

  for (let i = 0; i < restaurantByTime.length; i++) {
    const restaurant = restaurantByTime[i];
    if (restaurant.openingTime <= time && restaurant.closingTime >= time) {
      result.push(restaurant);
    }
  }
  return result;
}


//***************** Function that returns list of restaurants which are open right now *****************
export function findRestaurantsWhichAreOpenRightNow(restaurantByTime, currentTime) {
  let d = new Date();
  currentTime = d.getHours();

  return findRestaurantsByTimeOfWork(restaurantByTime, currentTime);
}


//***************** Function that returns list of restaurants based on specific category *****************
export function findRestaurantsByCategory(restaurants, categories) {
  return restaurants.filter(restaurant => categories.every(cat => restaurant.categories.some(resCat => resCat.type === cat.type)));
}


//***************** Function that returns list of restaurants serving specific food *****************
export function findRestaurantsBySomeCategory(restaurants, categories) {
  return categories.length !== 0 ? restaurants.filter(restaurant => restaurant.categories.some(resCat => categories.some(cat => cat.type === resCat.type))) : restaurants;
}