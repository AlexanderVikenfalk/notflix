import { useState } from 'react'
import type { AxiosResponse } from 'axios'
import { useLoading } from '@/contexts/LoadingContext'

type ApiService<TData, TArgs extends unknown[] = unknown[]> = (
    ...args: TArgs
) => Promise<AxiosResponse<TData>>

const useApi = <TData, TArgs extends unknown[] = unknown[]>(
    serviceFunction: ApiService<TData, TArgs>
) => {
    const [data, setData] = useState<TData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { loading, setLoading } = useLoading()

    const request = async (...args: TArgs) => {
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

    return { data, error, loading, request }
}

export default useApi
