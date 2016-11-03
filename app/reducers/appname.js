export default function appname(state = 'nothing',action){
  switch (action.type) {
    case "SET_APPNAME":
      return action.text;
      break;
    default:
      return state;
  }
}
