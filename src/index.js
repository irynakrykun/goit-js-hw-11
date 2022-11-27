import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { FetchImage } from './fetch';
import { PictureApiService } from './fetch';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const pictureApiService = new PictureApiService();
loadMoreBtn.addEventListener('click', OnLoadMore);

formEl.addEventListener('submit', onSubmit);
async function onSubmit(e) {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;
  const query = searchQuery.value.trim();
  if (!query) {
    return;
  }
  pictureApiService.resetPage();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  pictureApiService.formValue = query;
  try {
    const hits = await pictureApiService.fetchImage();
    console.log(hits);
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    CreateImage(hits);
    const ShowLoadMoreBtn = pictureApiService.haveMoreImages();
    if (ShowLoadMoreBtn) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {}
}

function CreateImage(data) {
  let markup = data
    .map(item => {
      return ` <div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width='250px' />
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

  gallery.insertAdjacentHTML('beforeend', markup);
}
async function OnLoadMore(e) {
  
  pictureApiService.incrementPage();
  const ShowLoadMoreBtn = pictureApiService.haveMoreImages();
  if (!ShowLoadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
  try {
    const hits = await pictureApiService.fetchImage();
    console.log(hits);
    CreateImage(hits);
  } catch (error) {}
}
