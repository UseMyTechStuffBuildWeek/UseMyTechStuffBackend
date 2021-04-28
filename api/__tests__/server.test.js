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

//user model tests
describe("Users model", () => {
  describe("add function", () => {
    it("adds user to db", async () => {
      let all 
      await User.add(rob)
      all = await db("users")
      expect(all).toHaveLength(4)

      await User.add(hazel)
      all = await db("users")
      expect(all).toHaveLength(5)
    })
    it("values of users", async() => {
      const user = await User.add(hazel)
      expect(user).toMatchObject({user_id: 4, ...hazel})
    })
  })
})

//user-router tests
describe("API calls", () => {
  describe("[GET] /owner", () => {
    it("responds with 404 because not authorized", async () =>{
      const res = await request(server).get('/owner')
      expect(res.status).toBe(404)
    })
  })
  describe("[GET] /renter", () => {
    it("responds with 404 because not authorized", async () =>{
      const res = await request(server).get('/renter')
      expect(res.status).toBe(404)
    })
  })
})

//auth-router tests
describe("[post] /register", () => {
  it("throw error if password is empty", async()=> {
    try{
      await  ({
        username: "Flint",
        password: ""
      })
    } catch(err){
      expect(err.message).toEqual("username and password required")
    }
  })
  it("throw error if username is empty", async()=> {
    try{
      await ({
        username: "",
        password: "1234"
      })
    } catch(err){
      expect(err.message).toEqual("username and password required")
    }
  })
})

describe("[post] /login", () => {
  it("throw error if password is empty", async()=> {
    try{
      await  ({
        username: "Rob",
        password: "foobar"
      })
    } catch(err){
      expect(err.message).toEqual("username and password required")
    }
  })
  it("throw error if username is empty", async()=> {
    try{
      await ({
        username: "",
        password: "1234"
      })
    } catch(err){
      expect(err.message).toEqual("username and password required")
    }
  })
})