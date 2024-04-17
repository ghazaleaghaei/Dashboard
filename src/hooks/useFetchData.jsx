import { useEffect, useState } from "react"
import axios from "axios"

function useFetchData(url, query) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
                setIsLoading(true)
                const { data } = await axios.get(`${url}?${query}`, { signal: controller.signal })
                setData(data)
            }
            catch (err) {
                if (axios.isCancel) {
                    console.log('Request canceled');
                } else {
                    setData([])
                    setError(err.response.data.error)
                }

            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
        return () => {
            controller.abort()
        }
    }, [query, url])
    return { isLoading, data, error }
}

export default useFetchData
