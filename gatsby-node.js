const path = require("path");

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;

    const actuTemplate = path.resolve(`src/templates/actuTemplate.js`);

    return graphql(`
    {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "post"}}}) {
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
      const {allMarkdownRemark} = data;
      const {edges} = allMarkdownRemark;
        if (errors) {
            return Promise.reject(errors);
        }
console.log(edges);
        edges.forEach(({node}) => {
            console.log(node);
            createPage({
                path: `posts/${node.fileAbsolutePath.substring(node.fileAbsolutePath.lastIndexOf('/')+1).slice(0, -3)}`,
                component: actuTemplate,
                context: {id: node.id}, // additional data can be passed via context
            })
        });
    })
};