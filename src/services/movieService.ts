import axiosInstance from '@/utils/axiosInstance'

export const getMovies = (page: number) =>
    axiosInstance.get(`/movies?page=${page}`)

export const getMovieById = (id: string) => axiosInstance.get(`/movie/${id}`)

export const searchMovies = (query: string) => {
    return axiosInstance.get(`/search/?q=${query}`)
}
