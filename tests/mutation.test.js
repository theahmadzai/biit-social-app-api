const gql = require('graphql-tag')
const createTestServer = require('./helper')

const LOGIN = gql`
  mutation {
    login(input: { username: "javed", password: "123" }) {
      token
      user {
        username
      }
    }
  }
`

describe('queries', () => {
  test('courses', async () => {
    const { mutate } = createTestServer({
      db: {
        models: {
          User: {
            findOne: () => ({
              username: 'javed',
              password:
                '$2b$10$OGsUmtSzxGfTzK0yAS8bh.ZQ0rqnCua.cyvVZG6iBI2T96I2Fg20m',
            }),
          },
        },
      },
    })

    const res = await mutate({ query: LOGIN })
    expect(res).toMatchSnapshot()
  })
})
