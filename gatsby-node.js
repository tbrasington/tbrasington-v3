require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
    const fetch = require("node-fetch")
const queryString = require("query-string")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const server = process.env.API_URL;
console.log(process.env.API_URL)
exports.sourceNodes = (
  { actions, createNodeId, createContentDigest  }
) => {
  const { createNode,createParentChildLink } = actions

  // create nodes for each project
  const processProject = project => {
    const nodeId = createNodeId(`project-${project.id}`);
   
    const medias = project.medias
    let projectData = project;
    projectData.medias=[];
  
  
    // prep
    const nodeContent = JSON.stringify(projectData)
    const nodeData = Object.assign({}, projectData, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Projects`,
        content: nodeContent,
        contentDigest: createContentDigest(project),
      },
      medias: null
    })
    
    return {node : nodeData, medias : medias}
  }

  // process media blocks
  const processMedia =( media, nodeParent) => {
    const nodeId = createNodeId(`media_${media.id}`)
    const nodeContent = JSON.stringify(media)
    const nodeData = Object.assign({}, media, {
      id: nodeId,
      parentNodeId: nodeParent,
      children: [],
      internal: {
        type: `Media`,
        content: nodeContent,
        contentDigest: createContentDigest(media),
      },
      media: null,
    })
    return nodeData
  }

  // Join apiOptions with the Pixabay API URL
  const apiUrl = `${server}projects`
  // Gatsby expects sourceNodes to return a promise
  return (
    // Fetch a response from the apiUrl
    fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.forEach(project => {
            
            // create a project node
            const projectNode = processProject(project);
            createNode(projectNode.node);

            // go through the project to get media, download and convert
            projectNode.medias.length > 0 && projectNode.medias.forEach(media=> {
                const MediaNodeData = processMedia(media, projectNode.node.id)
                createNode(MediaNodeData);
                createParentChildLink({ parent: projectNode.node, child: MediaNodeData })
            })
                
        })
      })
  )
}

// create pages
exports.createPages = async ({ actions: { createPage }, graphql }) => {
    const results = await graphql(`
      {
        allProjects {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
  
    results.data.allProjects.edges.forEach(edge => {
      const project = edge.node
  
      createPage({
        path: `/${project.slug}/`,
        component: require.resolve("./src/templates/project.js"),
        context: {
          slug: project.slug,
        },
      })
    })
  }

  exports.onCreateNode = async ({ node, actions, store, cache }) => {
    const { createNode } = actions

    if (node.internal.type === 'Media' || node.internal.type === 'Cover') {

        const fileNode = await createRemoteFileNode({
          url:  server + node.uuid,
          store,
          cache,
          parentNodeId: node.id,
          createNode,
          createNodeId: media_id => `block-files-image-sharp-${media_id}`,
        })
        if (fileNode) {
          // at field image
          node.media___NODE = fileNode.id
        }
      }

  }