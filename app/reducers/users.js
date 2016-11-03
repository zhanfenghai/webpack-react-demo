export default function users(state = [],action){
  switch (action.type) {
    case "ADD_USER":
      return [...state,{name:action.name,age:action.age}]
      break;
    default:
      return state
  }
}
