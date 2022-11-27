import axios from "axios";
const KEY_API = '31580624-e5f87d112d57e9afad49661fb';
const BASE_URL = 'https://pixabay.com/api/';

async function FetchImage(value) {
  try {
    const response = await axios.get(`${BASE_URL}?key=${KEY_API}&image_type=photo&orientation=horizontal&safesearch=true&q=${value}&per_page=40&page=1`);
    return (response.data.hits);
  } catch (error) {
    console.error(error);
  }
}

export{FetchImage}