import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FetchImage } from './fetch';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.addEventListener('click', OnLoadMore);

formEl.addEventListener('submit', onSubmit);


function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  formValue = searchQuery.value;
  console.log(formValue);

  if (!formValue) {
    Notify.info('add Name!');
    return;
  }
  FetchImage(formValue).then((data) => CreateImage(data));
}

// function FetchImage(value) {
//    axios
//     .get(
//       `${BASE_URL}?key=${KEY_API}&image_type=photo&orientation=horizontal&safesearch=true&q=${value}&per-page=40&page=1`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     });
// }

function CreateImage(data) {
  if (data.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    let markup = data.map((item) => {
              return ` <div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Dowloads:${item.downloads}</b>
    </p>
  </div>
</div>`;
      })

      .join('');
  
    gallery.innerHTML = markup;
  }
}
function OnLoadMore(e) {}
