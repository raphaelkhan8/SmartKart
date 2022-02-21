import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to SmartKart',
    description: 'High quality products at unbeatable prices!',
    keywords: 'electronics, cheap, cheap electronics, buy electronics, buy cheap, deals, clearance'
}

export default Meta
