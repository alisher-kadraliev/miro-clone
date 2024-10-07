
import { useMutation } from 'convex/react'
import { useState } from 'react'
export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false)
    const apiMutation = useMutation(mutationFunction)
    const mutation = async (payload: any) => {
        setPending(true)
        return apiMutation(payload)
        .finally(() => {
            setPending(false)
        })
        .then((res: any) => {
            return res
        })
        .catch((err: any) => {
            throw err
        })
    }
    return {
        mutation,
        pending
    }
}