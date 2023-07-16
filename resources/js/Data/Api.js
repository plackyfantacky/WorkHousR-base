import { create } from 'apisauce'

const Api = create({
    baseURL: 'http://localhost:8081/api/v1/',
})

export default Api