export function returnCategories(categories) {
    let str = '';
    for (let j = 0; j < categories.length; j++) {
        str += `${(j + 1) + '.' + categories[j].type} `;
    }
    return str;
}

//***************** Function that load categories of restaurants from JSON file *****************
export async function loadCategories() {
    const response = await fetch('./json/categories.json');
    return response.json();
}

export let categories = await loadCategories();