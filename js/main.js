const apiKey = "e3eead13-89e4-4093-ac45-66ec3298bdc1";

const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const options = {
  method: "GET",
  headers: {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
  },
};

const filmsWrapper = document.querySelector(".films");

// через промисы
// fetch(`${url}top`, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.log(err));

// через async await
async function fetchAndRenderFilms() {
  const response = await fetch(`${url}top`, options);
  const data = await response.json();
  console.log(data);
  console.log(data.films);

  for (film of data.films) {
    console.log(film);
    const html = `<div class="films">
        <div class="card">
          <img src=${film.posterUrlPreview} alt="Cover" class="card__img" />
          <h3 class="card__title">${film.nameRu}</h3>
          <p class="card__year">${film.year}</p>
          <p class="card__rate">Рейтинг: ${film.rating}</p>
        </div>`;

    filmsWrapper.insertAdjacentHTML("beforeend", html);
  }
}

fetchAndRenderFilms().catch((err) => console.log(err));

// способы вызвать catch
//
// fetchAndRenderFilms().catch((err) => console.log(err))
//
// или
//
// async function fetchAndRenderFilms() {
//   try {
//     const response = await fetch(`${url}top`, options);
//     const data = await response.json();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }
