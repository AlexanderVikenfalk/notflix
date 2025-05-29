import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useTitle } from '../hooks/useTitle'
import { Card } from '../components/Card'
import testPoster from '@/assets/posters/test.webp'
import type { MovieSearchResponse } from '@/types/interfaces'

export const SearchResultsPage = ({ apiPath }: { apiPath: string }) => {
    const [searchParams] = useSearchParams()
    const queryTerm = searchParams.get('q') ?? ''

    const { data } = useFetch<MovieSearchResponse>(apiPath, queryTerm)

    const movies = data?.results ?? []

    const testMovies = [
            {
                adult: false,
                backdrop_path: '/mockBackdrop1.jpg',
                genre_ids: [28, 12, 878],
                id: 1000001,
                original_language: 'en',
                original_title: 'Galaxy Rangers',
                overview:
                    'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
                popularity: 501.2,
                poster_path: testPoster,
                release_date: '2025-05-20',
                title: 'Galaxy Rangers',
                video: false,
                vote_average: 7.8,
                vote_count: 987,
            },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/mockBackdrop1.jpg',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: testPoster,
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
        {
            adult: false,
            backdrop_path: '/assets/test.webp',
            genre_ids: [28, 12, 878],
            id: 1000001,
            original_language: 'en',
            original_title: 'Galaxy Rangers',
            overview:
                'A team of elite space rangers embarks on a mission to recover a lost artifact before it falls into the hands of an intergalactic warlord.',
            popularity: 501.2,
            poster_path: '/assets/test.webp',
            release_date: '2025-05-20',
            title: 'Galaxy Rangers',
            video: false,
            vote_average: 7.8,
            vote_count: 987,
        },
            {
                adult: false,
                backdrop_path: '/mockBackdrop2.jpg',
                genre_ids: [35, 10749],
                id: 1000002,
                original_language: 'en',
                original_title: 'Love at First Swipe',
                overview:
                    'Two tech-averse singles accidentally match on a dating app and must navigate love in a digital world they barely understand.',
                popularity: 399.8,
                poster_path: '/mockPoster2.jpg',
                release_date: '2025-04-25',
                title: 'Love at First Swipe',
                video: false,
                vote_average: 6.9,
                vote_count: 432,
    }]

    useTitle(`Search result for ${queryTerm}`)

    return (
        <main className="bg-blue-950">
            <section className="py-7">
                <p className="text-3xl text-gray-700 dark:text-white">
                    {movies.length === 0
                        ? `No result found for '${queryTerm}'`
                        : `Result for '${queryTerm}'`}
                </p>
            </section>
            <section className="max-w-7xl mx-auto py-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                    {testMovies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    )
}
