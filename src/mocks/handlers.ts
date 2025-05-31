import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://localhost:3000/movies', () => {
        return HttpResponse.json(
            [
                {
                    id: 1,
                    title: 'Inception',
                    release_date: '2010',
                    poster_path: '/inception.jpg',
                },
                {
                    id: 2,
                    title: 'The Matrix',
                    release_date: '1999',
                    poster_path: '/matrix.jpg',
                },
            ],
            { status: 200 }
        )
    }),

    http.get('http://localhost:3000/movies/:id', ({ params }) => {
        const { id } = params

        if (id === '404') {
            return new HttpResponse('Movie not found', { status: 404 })
        }

        return HttpResponse.json({
            id,
            title: 'Inception',
            director: 'Christopher Nolan',
            plot: 'A mind-bending thriller...',
            cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
            genres: ['Sci-Fi', 'Thriller'],
            release_date: '2010',
            poster_path: '/inception.jpg',
        })
    }),
]
