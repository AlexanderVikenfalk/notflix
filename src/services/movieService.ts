import axiosInstance from '@/utils/axiosInstance'

export const getMovies = () => axiosInstance.get('/movies')

export const getMovieById = (id: string) => axiosInstance.get(`/movie/${id}`)

export const searchMovies = (query: string) => {
    return axiosInstance.get(`/search/?q=${query}`)
}