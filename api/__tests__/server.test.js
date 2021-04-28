const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

const User = require("../users/users-model")

const rob = {username: "Rob", password: "foobar", role: "renter"}
const hazel = {username: "Hazel", password: "1234", role: "owner"}


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
  
})

it('sanity check', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})
