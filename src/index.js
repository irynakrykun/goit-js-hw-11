import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PictureApiService } from './fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = new SimpleLightbox('.gallery a');

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
      return ` <div class="photo-card"><div class="thumb"><a class="gallery-item" href="${item.largeImageURL}">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="350px" height="250px"/></a></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${item.likes}</span>
                </p>
    <p class="info-item">
      <b>Views</b>
      <span>${item.views}</span>
                </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${item.comments}</span>
                </p>
    <p class="info-item">
      <b>Dowloads</b>
      <span>${item.downloads}</span>
          </p>
     </div>
</div>`;
    })

    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox = new SimpleLightbox('.gallery a');
}

async function OnLoadMore(e) {
  pictureApiService.incrementPage();
  const ShowLoadMoreBtn = pictureApiService.haveMoreImages();
  if (!ShowLoadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  try {
    const hits = await pictureApiService.fetchImage();
    CreateImage(hits);
    lightbox.refresh();
  } catch (error) {}
}
