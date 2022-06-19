export async function getSimilarCities(searchCity: string) {
  const response = await fetch(
    `https://autocomplete.travelpayouts.com/places2?term=${searchCity}&locale=en&types[]=city&callback=json`,
    { mode: 'cors' }
  );
  if (response.status == 200) {
    const text = await response.text();
    return JSON.parse(text.slice(5).slice(0, -2));
  }
}
