import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `/dcim`,
  auth: {
    username: 'apc',
    password: 'apc'
  }
})
