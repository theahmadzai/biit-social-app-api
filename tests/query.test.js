const gql = require('graphql-tag')
const createTestServer = require('./helper')

const COURSES = gql`
  query {
    courses {
      code
      title
      description
    }
  }
`

describe('queries', () => {
  test('courses', async () => {
    const { query } = createTestServer({
      db: {
        models: {
          Course: {
            findAll: jest.fn(() => [
              {
                code: 'CS-100',
                title: 'Some Course',
                description: 'Some Course Description',
              },
            ]),
          },
        },
      },
    })

    const res = await query({ query: COURSES })
    expect(res).toMatchSnapshot()
  })
})
