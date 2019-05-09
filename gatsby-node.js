const path = require("path");

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;

    const actuTemplate = path.resolve(`src/templates/actuTemplate.js`);
    const postsByCategoryTemplate = path.resolve(`src/templates/postsByCategoryTemplate.js`);

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
        blogPosts.edges.forEach(({node}) => {
            createPage({
                path: `posts/${node.fileAbsolutePath.substring(node.fileAbsolutePath.lastIndexOf('/')+1).slice(0, -3)}`,
                component: actuTemplate,
                context: {id: node.id}, // additional data can be passed via context
            })
        });

        createPage({
            path: "/blog/films/",
            component: postsByCategoryTemplate,
            context: {category: "movies", title: "Films"}
        });
        createPage({
            path: "/blog/jeux-video/",
            component: postsByCategoryTemplate,
            context: {category: "gaming", title: "Jeux vidéo"}
        });
        createPage({
            path: "/blog/series-tv/",
            component: postsByCategoryTemplate,
            context: {category: "tv", title: "Séries TV"}
        });
        createPage({
            path: "/blog/litterature/",
            component: postsByCategoryTemplate,
            context: {category: "books", title: "Littérature"}
        });
        createPage({
            path: "/blog/musique/",
            component: postsByCategoryTemplate,
            context: {category: "music", title: "Musique"}
        });

    })
};