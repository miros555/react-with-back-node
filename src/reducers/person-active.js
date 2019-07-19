export default function (state = null, action){

switch (action.type) {
  case 'SELECTED':
    return action.payload;
    //break;
  default:
     return state;
   }
}
