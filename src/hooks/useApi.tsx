import { useState } from 'react'
import type { AxiosResponse } from 'axios'

type ApiService<T extends unknown[] = unknown[]> = (
    ...args: T
) => Promise<AxiosResponse<unknown>>

const useApi = <T extends unknown[]>(serviceFunction: ApiService<T>) => {
    const [data, setData] = useState<unknown>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const request = async (...args: T) => {
        setLoading(true)
        setError(null)
        try {
            const response = await serviceFunction(...args)
            setData(response.data)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unknown error occurred.')
            }
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, request }
}

export default useApi
