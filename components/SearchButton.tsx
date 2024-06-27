'use client'

import siteMetadata from '@/data/siteMetadata'
import { useKBar } from 'kbar'
import { Search } from 'lucide-react'
import { FaSearch } from "react-icons/fa";

import { Button } from './shadcn/button'

const fallback = <div style={{ background: '#000', width: 24, height: 24 }}/>

const SearchButton = () => {
    const { query } = useKBar()

    if (
        siteMetadata.search &&
        (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
    ) {
        return (
            <Button
                aria-label="Search"
                variant="ghost"
                className="px-2"
                title="Search"
                onClick={() => query.toggle()}
            >
                {/* <FaSearch /> */}
                {/* <div className="absolute top-3 left-3 items-center" > */}
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                {/* </div> */}
                {/* <Search {...props}/> */}
            </Button>
        )
    }
}

export default SearchButton
