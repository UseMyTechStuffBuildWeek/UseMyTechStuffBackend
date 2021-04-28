const request = require('supertest')
const server = require('../server')

let token;

beforeAll((done) => {
  request(server)
    .post('/login')
    .send({
        username: "user",
        password: "1234"
    })
    .end((err, response) => {
        token = response.body.token;
        done()
    })
})

it('sanity check', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

//equipment tests
describe("[GET] / ", () => {
    it("responds with 404 because not authorized", () =>{
        return request(server)
        .get('/')
        .then((response) => {
            expect(response.status).toBe(404)
        })
    })
//     it("responds with JSON", async () =>{
//         return request(server)
//             .get("/")
//             .set('Authorization', `Bearer ${token}`)
//             .then((response) => {
//                 expect(response.status).toBe(200)

//             })
//       })
    })

