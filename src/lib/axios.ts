
import { CoreApiConfig } from '#/configs/core-api'
import axios from 'axios'

export const coreAxios = axios.create({
  baseURL: CoreApiConfig.baseUrl
})