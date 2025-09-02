import { Client } from '@elastic/elasticsearch'

// Configura la conexión a Elasticsearch
const elasticClient = new Client({
  node: process.env.ELS_HOST,
})

export default elasticClient
