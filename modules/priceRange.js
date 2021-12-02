//***************** Function that load price of restaurants from JSON file *****************
export async function loadPriceRanges() {
    const response = await fetch('./json/priceRanges.json');
    return response.json();
}
console.log(loadPriceRanges());

export let priceRanges = await loadPriceRanges();
console.log(priceRanges);