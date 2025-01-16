'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use this for client-side routing

function Page() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /user/dashboard
        router.push('/user/dashboard');
    }, [router]); // Ensure the effect re-runs only when `router` changes

    return null; // Return null since the component is used for redirection
}

export default Page;
