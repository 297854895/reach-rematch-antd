import { fromJS } from 'immutable'

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const todos = {
  state: fromJS([]),
  reducers: {
    addTodos(state, newtodos) {
      return state.unshift(
        fromJS({ ...newtodos, id: guid() })
      )
    },
    editTodos(state, action) {
      let idx = state.findIndex((item, idx) => item.get('id') === action.id)
      let oldTodos = state.find((item, idx) => item.get('id') === action.id)
      return typeof idx === 'number' ? state.set(idx, fromJS({
        ...oldTodos.toJS(),
        ...action
      })) : state
    }
  }
}

export default todos
