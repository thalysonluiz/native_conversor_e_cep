import axios from 'axios';

export const apicep = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})
