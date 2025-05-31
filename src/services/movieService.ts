import axiosInstance from '@/utils/axiosInstance'

export const getMovies = () => axiosInstance.get('/movies')

export const getMovieById = (id: number) => axiosInstance.get(`/movies/${id}`)
