import GraphQLJSON from 'graphql-type-json'
import shortid from 'shortid'


export default {
  JSON: GraphQLJSON,
  Query: {
    quakes : (_,__,{dataSources}) => dataSources.quakeAPI.getAllQuakes()
  }
}
