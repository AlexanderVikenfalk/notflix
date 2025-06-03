import axiosInstance from '@/utils/axiosInstance'
import type { AxiosResponse } from 'axios'
import type { MovieSearchResponse, MovieDetails } from '@/types/interfaces'

export const getMovies = (
    page: number
): Promise<AxiosResponse<MovieSearchResponse>> =>
    axiosInstance.get(`/movies?page=${page}`)

export const getMovieById = (
    id: string
): Promise<AxiosResponse<MovieDetails>> => axiosInstance.get(`/movie/${id}`)

export const searchMovies = (
    query: string,
    page = 1
): Promise<AxiosResponse<MovieSearchResponse>> =>
    axiosInstance.get(`/search?q=${query}&page=${page}`)
