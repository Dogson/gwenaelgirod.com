module.exports = {
    plugins: [
        `gatsby-plugin-netlify-cms`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content/posts`,
                name: "posts",
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content/pages`,
                name: "pages",
            },
        },
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-sass`
            // options: {
            //     includePaths: ["src/styles"]
            // }
        }
    ]
};