//***************** Function that load size of restaurants from JSON file *****************
export async function loadSizeRanges() {
  const response = await fetch('./json/sizeRanges.json');
  return response.json();
}

export let sizeRanges = await loadSizeRanges();
