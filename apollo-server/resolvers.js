import GraphQLJSON from 'graphql-type-json'

const todos = [
  {
    task : 'study vue',
    completed : false
  },
  {
    task : 'study apollo',
    completed : false
  }  
]

export default {
  JSON: GraphQLJSON,
  Query: {
    quakes : (_,__,{dataSources}) => dataSources.quakeAPI.getAllQuakes(),
    tasks :  (_,__,{dataSources}) => dataSources.taskAPI.getTasks(),
    todos :  () => todos 
  },
  Mutation : {
    addTodo : (_,{task,completed}) =>{
      const todo = { task, completed };
      todos.push(todo);
      return todo;  
    }
  }
}
