'use client'

import React, { useEffect, useState } from 'react'
import slugify from 'slugify'

import { getStrollerImgs } from 'lib/data'
import Carousel from './strollerina/carousel/carousel'

interface TitleProps {
    level: number
    className?: string
    children: React.ReactNode
    id?: string
}

const Title = ({ level, className, children, id }: TitleProps) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return (
        <Tag id={id} className={className}>
            {children}
        </Tag>
    )
}

const Challenge = ({
    title,
    level = 2,
    id
}) => {
    
    const [imgs, setImgs] = useState([])
    

    useEffect(() => {
       
        const getProductImages = async () => {
            try {
                console.log(id)
                getStrollerImgs(id).then(setImgs);
            } catch (error) {
                console.log(error)
            }
        }

        getProductImages()
    }, [id])

    const titleId = slugify(title, { lower: true })

    return (
        <div className="my-6 overflow-hidden rounded-lg ">
            {imgs && imgs.length > 0 &&
            <>
            <div className="px-6 py-3">
                <Title level={level} className="!m-0 text-xl" id={titleId}>
                    {title}
                </Title>
            </div>

            <div>
                <Carousel slides={imgs} />
            </div>
            </>
        }
        </div>
    )
}

export default Challenge
