/* global document, FB, window */
/* eslint-disable no-console */
const facebook = () => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: '270093713358132',
      xfbml: true,
      version: 'v2.6',
    });

    FB.login((loginResponse) => {
      if (loginResponse.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me?fields=id,name,website,picture', (response) => {
          if (response.picture) {
            document.getElementById('picture').innerHTML =
              `<img src="${response.picture.data.url}">`;
          }
          console.log(`Good to see you, ${response.name}.`);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };

  {
    const s = 'script';
    const id = 'facebook-jssdk';
    if (!document.getElementById(id)) {
      const fjs = document.getElementsByTagName(s)[0];
      const js = document.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
};

const getFacebookPage = () => {
  $.ajax({
    url: '/facebook',
    success: (response) => {
      $('#cover').attr('src', response.cover);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    facebook,
    getFacebookPage,
  };
}
