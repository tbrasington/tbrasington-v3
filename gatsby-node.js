require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const fetch = require("node-fetch")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const server = process.env.API_URL;
const aws_url = process.env.AWS_BUCKET_URL;

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions

  // create nodes for each section
  const processSection = (section, type) => {
    const nodeId = createNodeId(`${type}-${section.id}`)

    // cache the section data so we can mutate it
    let sectionData = section
    // reset section media object to clean up the query
    const medias = section.medias
    sectionData.medias = []
    // reset section blocks object to clean up the query
    const blocks = section.blocks
    sectionData.blocks = []

    // prep
    const nodeContent = JSON.stringify(sectionData)
    const nodeData = Object.assign({}, sectionData, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: type,
        content: nodeContent,
        contentDigest: createContentDigest(section),
      },
      medias: null,
    })

    // add the node
    createNode(nodeData)

    // procress the medias and the blocks at the top level
    processMedias(medias, nodeData, nodeId)
    processBlocks(blocks, nodeData, nodeId)
  }

  // go through the medias object
  const processMedias = (medias, parentNode, parentnNodeId) => {
    // go through the section to get media, download and convert
    medias != null &&
      medias.length > 0 &&
      medias.forEach(media => {
        const MediaNodeData = processMedia(media, parentnNodeId)
        createNode(MediaNodeData)
        createParentChildLink({ parent: parentNode, child: MediaNodeData })
      })
  }

  // process media blocks
  const processMedia = (media, nodeParent) => {
    const nodeId = createNodeId(`media-${media.id}`)
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
      type: media.pivot.role,
    })
    return nodeData
  }

  // go through the medias object
  const processBlocks = (blocks, parentNode, parentnNodeId) => {
    // go through the section to get media, download and convert
    blocks != null &&
      blocks.length > 0 &&
      blocks.forEach(block => {
        const BlockNodeData = processBlock(block, parentnNodeId)
        createNode(BlockNodeData)
        createParentChildLink({ parent: parentNode, child: BlockNodeData })
      })
  }

  // process  blocks
  const processBlock = (block, nodeParent) => {
    // cache the section data so we can mutate it
    let blockData = block
    // reset section media object to clean up the query
    const medias = block.medias
    blockData.medias = []
    // reset section blocks object to clean up the query
    const blocks = block.blocks
    block.blocks = []

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
      media: null,
      type: blockData.type,
    })

    processMedias(medias, nodeData, nodeId)
    processBlocks(blocks, nodeData, nodeId)

    return nodeData
  }

  const fetchSection = type => {
    // Join apiOptions with the Pixabay API URL
    const apiUrl = `${server + type}`
    // Fetch a response from the apiUrl
    const query = fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.forEach(section => {
          // create a section node
          processSection(section, type)
        })
      })
    return query
  }

  // what pages to all (arguably could be further extracted or itself queries and end point)
  const calls = [fetchSection("projects"), fetchSection("pages")]

  // Gatsby expects sourceNodes to return a promise
  return Promise.all(calls).then(function(results) {
    return results
  })
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
      allPages {
        edges {
          node {
            slug
            isHomepage
          }
        }
      }
    }
  `)
  //extract this
  // project files
  results.data.allProjects.edges.forEach(edge => {
    const project = edge.node
    
    createPage({
      path: `/project/${project.slug}/`,
      component: require.resolve("./src/templates/project.js"),
      context: {
        slug: project.slug,
      },
    })
  })

  // pages
  results.data.allPages.edges.forEach(edge => {
    const projects = edge.node
    if(!projects.isHomepage) {
      createPage({
        path: `/${projects.slug}/`,
        component: require.resolve("./src/templates/page.js"),
        context: {
          slug: projects.slug,
        },
      })
    }
  })
}

// Create media file nodes
exports.onCreateNode = async ({ node, actions, store, cache }) => {
  const { createNode } = actions

  if (node.internal.type === "Media" || node.internal.type === "Cover") {
    let fileNode;
    try {
        fileNode = await createRemoteFileNode({
          url: aws_url + node.uuid,
          store,
          cache,
          parentNodeId: node.id,
          createNode,
          createNodeId: media_id => `block-files-image-sharp-${media_id}`,
        })
      } catch (e) {
        // Ignore
        console.log(e)
      }
    if (fileNode) {
      // at field image
      node.media___NODE = fileNode.id
    }
  }
}
