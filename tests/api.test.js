const request = require('supertest')
const app = require('../server')

describe('GET board with invalid characters and length', () => {
  it('should return a 400 error', async () => {
    const board = 'abc1234'
    const res = await request(app)
    .get(`/?board=${board}`)
    .expect(400)
  })
})
