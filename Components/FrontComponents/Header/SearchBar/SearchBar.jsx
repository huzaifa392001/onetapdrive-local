import React from 'react'
import Form from 'next/form'
import CustomInput from '@/components/CustomInput/CustomInput'

function SearchBar() {
    return (
        <Form>
            <CustomInput
                searchInput
            />
        </Form>
    )
}

export default SearchBar