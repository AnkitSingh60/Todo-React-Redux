import { GET_TODO } from "./action"


const initialState = {
    todos: []
}

export const todoReducer = (store = initialState , {type , payload}) => {

    switch(type){
        
        case GET_TODO :
            return {...store , todos : payload}

        default :
            return store 
    }


}