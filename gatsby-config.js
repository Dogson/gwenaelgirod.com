module.exports = {
    siteMetadata: {
        siteUrl: `https://www.gwenaelgirod.com`,
    },
    plugins: [
        `gatsby-plugin-netlify-cms`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content/posts`,
                name: "posts",
            },
        },
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-sass`
            // options: {
            //     includePaths: ["src/styles"]
            // }
        },
        `gatsby-plugin-sitemap`
    ]
};