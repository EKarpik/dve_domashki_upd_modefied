import { faker } from '@faker-js/faker'

export function generateUser({ userName = true, password = true } = {}) {
  return {
    userName: userName === true ? faker.internet.userName() : userName,
    password:
      password === true
        ? faker.internet.password({ prefix: '!@0dD', length: 8 })
        : password
  }
}
