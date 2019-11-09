const { RESTDataSource } = require('apollo-datasource-rest');

class QuakeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://earthquake.usgs.gov/fdsnws/event/1/';
  }
  async getAllQuakes() {
    const query = 'query?format=geojson&starttime=2019-01-01&endtime=2019-01-02';
    const data = await this.get(query);
    return Array.isArray(data.features)
    ? data.features.map(quake=>this.quakeReducer(quake)) : []
  }
  quakeReducer(quake){
      return {
          id : quake.id,
          magnitude :  quake.properties.mag,
          time : quake.properties.time,
          place : quake.properties.place 
      }
  }
}

module.exports = QuakeAPI ;