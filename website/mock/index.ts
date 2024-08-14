import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { DEFAULT_PROJECT_LIST } from './project.mock'

const handlers = [
  http.get('http://localhost:8000/api/v1/projects/:id', ({ params }) => {
    if (params.id) {

    }
    return HttpResponse.json(DEFAULT_PROJECT_LIST)
  }),
]

export const server = setupServer(...handlers)

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})