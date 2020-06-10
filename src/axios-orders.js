import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://my-react-project-8d1a4.firebaseio.com/'
})

export default instance