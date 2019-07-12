require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const fetch = require("node-fetch");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const server = process.env.API_URL;

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest  }
) => {
  const { createNode,createParentChildLink } = actions

  // create nodes for each project
  const processProject = project => {

    const nodeId = createNodeId(`project-${project.id}`);
    
    // cache the project data so we can mutate it
    let projectData = project;
    // reset project media object to clean up the query
    const medias = project.medias;
    projectData.medias=[];
    // reset project blocks object to clean up the query
    const blocks = project.blocks;
    projectData.blocks=[];
  
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

    // add the node
    createNode(nodeData);

    // procress the medias and the blocks at the top level
    processMedias(medias,nodeData,nodeId);
    processBlocks(blocks,nodeData,nodeId);
  }

  // go through the medias object
  const processMedias = (medias,parentNode,parentnNodeId) => {
    // go through the project to get media, download and convert
    medias !=null && medias.length > 0 && medias.forEach(media=> {
      const MediaNodeData = processMedia(media, parentnNodeId)
      createNode(MediaNodeData);
      createParentChildLink({ parent: parentNode, child: MediaNodeData })
    })
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

  // go through the medias object
  const processBlocks = (blocks,parentNode,parentnNodeId) => {
    // go through the project to get media, download and convert
   blocks !=null && blocks.length > 0 && blocks.forEach(block=> {
      const BlockNodeData = processBlock(block, parentnNodeId)
      createNode(BlockNodeData);
      createParentChildLink({ parent: parentNode, child: BlockNodeData })
    })
  }

  // process  blocks
  const processBlock =( block, nodeParent) => {

    // cache the project data so we can mutate it
    let blockData = block;
    // reset project media object to clean up the query
    const medias = block.medias;
    blockData.medias=[];
    
    const nodeId = createNodeId(`block-${block.id}`)
    const nodeContent = JSON.stringify(blockData)
    const nodeData = Object.assign({}, blockData, {
      id: nodeId,
      parentNodeId: nodeParent,
      children: [],
      internal: {
        type: `Block`,
        content: nodeContent,
        contentDigest: createContentDigest(blockData),
      },
      media: null
    })

    processMedias(medias,nodeData,nodeId);

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

  // Create media file nodes 
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