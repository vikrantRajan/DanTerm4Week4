async function facebookPage() {
  const success = (response) => {
    const src = response.cover.source;
    document.querySelector('body').innerHTML += `<img src="${src}">`;
  };
  const address = '/api/facebook'
  try {
    const rawResponse = await fetch(address);
    const response = await rawResponse.json();
    success(response);
  } catch (error) {
    console.log('Error:', error);
  }
}
