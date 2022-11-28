import axios from "axios";
class PictureApiService {

  constructor() {
    this.formValue = ''
    this.page = 1;
    this.totalHits = 0;

  }
  async fetchImage() {
    const KEY_API = '31580624-e5f87d112d57e9afad49661fb';
    const BASE_URL = 'https://pixabay.com/api/';

    const url = `${BASE_URL}?key=${KEY_API}&image_type=photo&orientation=horizontal&safesearch=true&q=${this.formValue}&per_page=40&page=${this.page}`
    const response = await axios.get(url)
    this.totalHits = response.data.totalHits
    return (response.data.hits);
    
  }
  get value() {
    return this.formValue;
  }
  set value(newValue) {
    this.formValue = newValue;
  }
  haveMoreImages() {
    return this.page< Math.ceil(this.totalHits/40)
  }
  incrementPage() {
    this.page += 1;
    
  }
  resetPage() {
    this.page = 1;
  }
}
 export{PictureApiService} 
