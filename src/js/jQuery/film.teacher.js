/* global utils */

const populateCharacterDropdown = (response) => {
  $.each(response.movies[0].abridged_cast, (index, value) => {
    const actorName = value.name;
    const { characters } = value;

    $.each(characters, (charIndex, charName) => {
      const html = `<option value="${actorName}">${charName}</option>`;
      $('#characters').append(html);
    });
  });
};

const getFilmData = () => {
  $.ajax({
    url: '../film/cowboy.json',
    success: (response) => {
      populateCharacterDropdown(response);
    },
    error: (x, xx, errorMessage) => {
      utils.print('AJAX error', errorMessage);
    },
  });
};

const displayActorName = (actorName) => {
  $('#actor').html(actorName);
};

const attachFilmEvents = () => {
  $('#characters').change(function characterChange() {
    const actorName = $(this).val();
    displayActorName(actorName);
  });
};

const cowboyHomework = () => {
  getFilmData();
  attachFilmEvents();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboyHomework,
  };
}
