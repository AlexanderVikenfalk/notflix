import type { MovieSearchResponse } from '@/types/interfaces'

export const dummyData: MovieSearchResponse = {
    dates: { maximum: '2025-06-04', minimum: '2025-04-23' },
    page: 1,
    results: [
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
            poster_path: '/mockPoster1.jpg',
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
        },
    ],
    total_pages: 1,
    total_results: 2,
}
