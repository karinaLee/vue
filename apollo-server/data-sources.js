const QuakeAPI = require('./datasources/quake');

export default function() {
  return {
    quakeAPI : new QuakeAPI()
  };
}
