import { delay, http, HttpResponse } from 'msw'
import { movieDetails, movieSearchResponse } from './data'

export const handlers = [
    // All movies
    http.get('http://localhost:3000/movies', async ({ request }) => {
        await delay(800)

        const url = new URL(request.url)
        const pageParam = url.searchParams.get('page')
        const page = parseInt(pageParam ?? '1', 10)
        const limit = 20
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        const paginatedResults = movieSearchResponse.results.slice(
            startIndex,
            endIndex
        )
        const totalResults = movieSearchResponse.results.length
        const totalPages = Math.ceil(totalResults / limit)

        return HttpResponse.json(
            {
                ...movieSearchResponse,
                results: paginatedResults,
                total_results: totalResults,
                total_pages: totalPages,
                page,
            },
            { status: 200 }
        )
    }),

    // Movie details
    http.get('http://localhost:3000/movie/:id', async ({ params }) => {
        await delay(800)
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
    http.get('http://localhost:3000/search', async ({ request }) => {
        await delay(800)
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
