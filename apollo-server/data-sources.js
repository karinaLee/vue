const QuakeAPI = require('./datasources/quake');
 const TaskAPI = require('./datasources/task');


export default function() {
  return {
    quakeAPI : new QuakeAPI(),
    taskAPI : new TaskAPI()
  };
}
