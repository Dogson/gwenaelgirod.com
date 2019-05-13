const MEDIA_CATEGORIES = {
    movies: {
        name: "Films",
        path: "/blog/films/",
    },
    gaming: {
        name: "Jeux vidéo",
        path: "/blog/jeux-video/",
    },
    tv: {
        name: "Séries TV",
        path: "/blog/series-tv/",
    },
    books: {
        name: "Littérature",
        path: "/blog/litterature/",
    },
    music: {
        name: "Musique",
        path: "/blog/musique/",
    },
    all: {
        name: "Blog",
        path: "/blog/",
    }
};

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
        frontmatter {
            category
        }
      }
    }
  }
  }`).then(result => {
        const {errors, data} = result;
        if (errors) {
            throw errors;
        }
        const {blogPosts} = data;
        const postsPerPage = 6;
        let nbPostsByCategory = {
            movies: 0,
            gaming: 0,
            tv: 0,
            music: 0,
            books: 0,
        };
        blogPosts.edges.forEach(({node}) => {
            nbPostsByCategory[node.frontmatter.category]++;
            createPage({
                path: `/posts/${node.fileAbsolutePath.substring(node.fileAbsolutePath.lastIndexOf('/') + 1).slice(0, -3)}`,
                component: actuTemplate,
                context: {id: node.id}, // additional data can be passed via context
            })
        });

        const numPages = {
            all: Math.ceil(blogPosts.edges.length / postsPerPage),
            movies: Math.ceil(nbPostsByCategory.movies / postsPerPage),
            gaming: Math.ceil(nbPostsByCategory.gaming / postsPerPage),
            tv: Math.ceil(nbPostsByCategory.tv / postsPerPage),
            music: Math.ceil(nbPostsByCategory.music / postsPerPage),
            books: Math.ceil(nbPostsByCategory.books / postsPerPage),
        };

        Object.keys(numPages).forEach((key) => {
            const category = MEDIA_CATEGORIES[key];
            const nbPages = numPages[key];
            Array.from({length: nbPages}).forEach((_, i) => {
                createPage({
                    path: i === 0 ? category.path : `${category.path}${i + 1}`,
                    component: blogTemplate,
                    context: {
                        limit: postsPerPage,
                        skip: i * postsPerPage,
                        numPages: nbPages,
                        currentPage: i + 1,
                        category: key,
                        title: category.name
                    },
                });
            });
            if (nbPages === 0) {
                createPage({
                    path: category.path,
                    component: blogTemplate,
                    context: {
                        limit: 0,
                        skip: 0,
                        numPages: 1,
                        currentPage: 1,
                        category: key,
                        title: category.name
                    },
                });
            }
        });
    })
};