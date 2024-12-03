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
