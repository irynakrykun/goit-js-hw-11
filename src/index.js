import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";

const KEY_API = '31580624-e5f87d112d57e9afad49661fb';
const BASE_URL = 'https://pixabay.com/api/';
const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
// пагінація = 'https://pixabay.com/api/?key=31580624-e5f87d112d57e9afad49661fb&per-page=40&page=1'

formEl.addEventListener("submit", onSubmit);
function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery }
  } = e.currentTarget;
  const formValue = searchQuery.value;

  if (!formValue) {
    Notify.info('add Name!');
    return;
  }
  FetchImage(formValue)
}
function FetchImage(value) {
  axios
    .get(`BASE_URL?key=KEY_API&image_type=photo&orientation=horizontal&safesearch=true&q=${value}&per-page=40&page=1`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data)
    
    }).catch((error) => {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    })
}




  //     .then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // })
  //   .catch(error => console.log(console.error))



function createImage() {
   ` <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
   gallery.innerHTML('') 
}
