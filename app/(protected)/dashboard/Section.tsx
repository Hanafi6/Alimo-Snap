'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

function Section() {
    const queryClient = useQueryClient();


    const { data } = useQuery({
        queryKey: ['users'], queryFn: async () => {
            const res = await fetch('https://6a2157b4b1d0aaf32b4f4137.mockapi.io/users')
            const data = await res.json()
            return data
        }
    });



    return (
        <div>Section</div>
    )
}

export default Section