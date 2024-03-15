import axios from "axios";

const productionURL = 'https://json-server-pi-orcin.vercel.app/';
const localURL = 'http://localhost:8000';

const BASE_URL = process.env.NODE_ENV === 'production' ? productionURL : localURL

export default axios.create({
    baseURL: BASE_URL
})