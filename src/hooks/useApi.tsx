import { useState } from 'react'
import { useLoading } from '@/context/LoadingContext'
import type { AxiosResponse } from 'axios'

type ApiService<T extends unknown[] = unknown[]> = (
    ...args: T
) => Promise<AxiosResponse<unknown>>

const useApi = <T extends unknown[]>(serviceFunction: ApiService<T>) => {
    const [data, setData] = useState<unknown>(null)
    const [error, setError] = useState<string | null>(null)
    const { setLoading } = useLoading()

    const request = async (...args: T) => {
        setLoading(true)
        setError(null)
        try {
            const response = await serviceFunction(...args)
            setData(response.data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    return { data, error, request }
}

export default useApi
