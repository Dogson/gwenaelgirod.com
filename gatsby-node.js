const path = require("path");

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;

    const actuTemplate = path.resolve(`src/templates/actuTemplate.js`);
    const blogTemplate = path.resolve(`src/templates/blogTemplate.js`);

    return graphql(`
    {
  blogPosts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "post"}}}) {
    edges {
      node {
        id
        fileAbsolutePath
      }
    }
  }
}

  `).then(result => {
        const {errors, data} = result;
        if (errors) {
            return Promise.reject(errors);
        }
        const {blogPosts} = data;
        const postsPerPage = 3;
        const numPages = Math.ceil(blogPosts.edges.length / postsPerPage);
        blogPosts.edges.forEach(({node}) => {
            createPage({
                path: `/posts/${node.fileAbsolutePath.substring(node.fileAbsolutePath.lastIndexOf('/') + 1).slice(0, -3)}`,
                component: actuTemplate,
                context: {id: node.id}, // additional data can be passed via context
            })
        });
        Array.from({length: numPages}).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
                component: blogTemplate,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    category: "all",
                    title: "Blog"
                },
            });
            createPage({
                path: i === 0 ? `/blog/films/` : `/blog/films/${i + 1}`,
                component: blogTemplate,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    category: "movies",
                    title: "Films"
                },
            });
            createPage({
                path: i === 0 ? `/blog/jeux-video/` : `/blog/jeux-video/${i + 1}`,
                component: blogTemplate,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    category: "gaming",
                    title: "Jeux vidéo"
                }
            });
            createPage({
                path: i === 0 ? `/blog/series-tv/` : `/blog/series-tv/${i + 1}`,
                component: blogTemplate,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    category: "tv",
                    title: "Séries TV"
                }
            });
            createPage({
                path: i === 0 ? `/blog/litterature/` : `/blog/litterature/${i + 1}`,
                component: blogTemplate,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    category: "books",
                    title: "Littérature"
                }
            });
            createPage({
                path: i === 0 ? `/blog/musique/` : `/blog/musique/${i + 1}`,
                component: blogTemplate,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    category: "music",
                    title: "Musique"
                }
            });
        })
    })
};