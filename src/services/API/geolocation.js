export const reverseGeo = (coord) => {
  console.log(`LAT ${coord.latitude}`);
  const uri = `https://nominatim.openstreetmap.org/reverse?lat=${coord.latitude}&lon=${coord.longitude}&format=json`;
  return fetch(uri, {method: 'GET'});
};
