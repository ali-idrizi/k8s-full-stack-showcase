import { axiosConfig } from '@/configs'
import axios from 'axios'

const axiosClient = axios.create(axiosConfig)

export { axiosClient as axios }

export * from './user'
