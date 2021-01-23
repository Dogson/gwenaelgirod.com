module.exports = {
    siteMetadata: {
        siteUrl: `https://www.gwenaelgirod.com`,
    },
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-netlify-cms`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content/posts`,
                name: "posts",
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/comments`,
                name: 'comments',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/tv`,
                name: 'avatars_tv',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/movies`,
                name: 'avatars_movies',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/gaming`,
                name: 'avatars_gaming',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content/avatars/music`,
                name: 'avatars_music',
            },
        },
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-sass`
            // options: {
            //     includePaths: ["src/styles"]
            // }
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-gtag`,
            options: {
                // your google analytics tracking id
                trackingId: `UA-177949352-1`,
                // Puts tracking script in the head instead of the body
                head: false,
                // enable ip anonymization
                anonymize: true,
            },
        },
    ]
};