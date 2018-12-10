const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const POSTS_QUERY = `
    {
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        slug
                    }
                }
            }
        }
    }`;

    return new Promise((resolve) => {
        graphql(POSTS_QUERY)
            .then(results => {
                results.data.allMarkdownRemark.edges.forEach(({node}) => {
                    createPage({
                        path: `/posts${ node.frontmatter.slug }`,
                        component: path.resolve('./src/components/postLayout.js'),
                        context: {
                            slug: node.frontmatter.slug
                        }
                    })
                });
                resolve();
            });
    });
};