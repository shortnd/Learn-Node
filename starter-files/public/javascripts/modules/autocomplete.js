function autocomplete(input, latInput, lngInput) {
  if (!input) return; // skip this fn from running if there is no input on page
  const dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  })

  input.on('keydown', (e) => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;