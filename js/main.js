// настройки

const apiKey = "e3eead13-89e4-4093-ac45-66ec3298bdc1";
const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const options = {
  method: "GET",
  headers: {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
  },
};

// DOM-элементы
const filmsWrapper = document.querySelector(".films");
const loader = document.querySelector(".loader-wrapper");
const buttonShowMore = document.querySelector(".show-more");
buttonShowMore.onclick = fetchAndRenderFilms;

let page = 1;

// получение и вывод ТОП 250 фильмов
async function fetchAndRenderFilms() {
  //показать прелоадер
  loader.classList.remove("none");

  //получаем фильмы
  const data = await fetchData(`${url}top?page=${page}`, options);
  if (data.pagesCount > 1) page++;

  //отображаем кнопку если страниц больше чем 1
  if (data.pagesCount > 1) buttonShowMore.classList.remove("none");

  //скрываем прелоадер
  loader.classList.add("none");

  //рендерим фильмы на страницу
  renderFilms(data.films);

  //скрываем кнопку если последняя страница

  if (page > data.pagesCount) buttonShowMore.classList.add("none");
}

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

function renderFilms(films) {
  for (film of films) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = film.filmId;

    card.onclick = openFilmDetails;

    const html = `
              <img src=${film.posterUrlPreview} alt="Cover" class="card__img" />
              <h3 class="card__title">${film.nameRu}</h3>
              <p class="card__year">${film.year}</p>
              <p class="card__rate">Рейтинг: ${film.rating}</p>
            `;

    card.insertAdjacentHTML("afterbegin", html);

    filmsWrapper.insertAdjacentElement("beforeend", card);
  }

  async function openFilmDetails(event) {
    const id = event.currentTarget.id;

    const data = await fetchData(`${url}${id}`, options);

    renderFilmData(data);
  }
}

function renderFilmData(film) {
  const prevContainer = document.querySelector(".container-right");
  prevContainer ? prevContainer.remove() : "";

  const containerRight = document.createElement("div");
  containerRight.classList.add("container-right");
  document.body.insertAdjacentElement("beforeend", containerRight);

  const buttonClose = document.createElement("button");

  buttonClose.classList.add("btn-close");
  buttonClose.innerHTML =
    '<img src="./images/cross.svg" alt="Close" width="24" />';
  containerRight.insertAdjacentElement("afterbegin", buttonClose);

  buttonClose.onclick = () => {
    containerRight.remove();
  };

  const html = ` <div class="film">
        <div class="film__title">${film.nameRu}</div>

        <div class="film__img">
          <img src=${film.posterUrl} alt=${film.nameRu} />
        </div>

        <div class="film__desc">
          <p class="film__details">Год: ${film.year}</p>
          <p class="film__details">Рейтинг: ${film.ratingKinopoisk}</p>
          <p class="film__details">Продолжительность: ${film.filmLength}</p>
          <p class="film__details">Страна: ${film.countries[0]["country"]}</p>
          <p class="film_text">
          ${film.description}
          </p>
        </div>
      </div>`;

  containerRight.insertAdjacentHTML("beforeend", html);
}

fetchAndRenderFilms().catch((err) => console.log(err));
