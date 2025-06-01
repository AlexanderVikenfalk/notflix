import { http, HttpResponse } from 'msw'
import { movieDetails, movieSearchResponse } from './data'

export const handlers = [
    // All movies
    http.get('http://localhost:3000/movies', () => {
        return HttpResponse.json(movieSearchResponse.results, { status: 200 })
    }),

    // Movie details
    http.get('http://localhost:3000/movie/:id', ({ params }) => {
        const { id } = params

        if (id === '404') {
            return new HttpResponse('Movie not found', { status: 404 })
        }

        const movie = movieDetails.find((m) => String(m.id) === id)

        if (!movie) {
            return new HttpResponse('Movie not found', { status: 404 })
        }

        return HttpResponse.json(movie, { status: 200 })
    }),

    // Search results
    http.get('http://localhost:3000/search', ({ request }) => {
        const url = new URL(request.url)
        const query = url.searchParams.get('q')?.toLowerCase() ?? ''

        if (!query) {
            return HttpResponse.json(
                { message: 'Query required' },
                { status: 400 }
            )
        }

        const filteredResults = movieSearchResponse.results.filter((movie) =>
            movie.title.toLowerCase().includes(query)
        )

        return HttpResponse.json(
            {
                ...movieSearchResponse,
                results: filteredResults,
                total_results: filteredResults.length,
                total_pages: 1,
            },
            { status: 200 }
        )
    }),
]
