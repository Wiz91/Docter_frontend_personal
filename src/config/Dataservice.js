import axios from 'axios'

let baseURL = 'https://sagar.pythonanywhere.com/'

const DataService = axios.create({
    baseURL: baseURL
})



export default DataService;
