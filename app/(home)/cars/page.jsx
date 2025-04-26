'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Loading from '../loading'

function Page() {
    const router = useRouter()
    useEffect(() => {
        router.push("/cars/all")
    }, [])
    return <Loading />  

}

export default Page