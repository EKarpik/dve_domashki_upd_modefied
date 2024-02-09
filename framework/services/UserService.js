import supertest from 'supertest'
import config from '../config/config'

const { url } = config

// созадние аккаунта юзера
const createUser = ({ userName, password }) => {
  //console.log(`${url}/Account/v1/User`)
  //console.log('этот лоигн передан в функци createUser', userName)
  //console.log('этот пароль передан в функци createUser', password)
  return supertest(url)
    .post(`/Account/v1/User`)
    .set('Accept', 'application/json')
    .send({ userName, password })
}

// получение информации о юзере
const userInfo = async ({ userId, token }) => {
  //console.log('uuid, который был передан userInfo', userId)
  //console.log('token, внутри userInfo', token)
  return supertest(url)
    .get(`/Account/v1/User/${userId}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
}

// удаление юзера
const delUser = async ({ userId, token }) => {
  //console.log('uuid, который был передан delUser', userId)
  //console.log('token, внутри delUser', token)
  return supertest(url)
    .delete(`/Account/v1/User/${userId}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
}

export default {
  delUser,
  userInfo,
  createUser
}
