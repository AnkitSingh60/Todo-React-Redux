import axios from "axios"


export const GET_TODO = "GET_TODO"


const getTodos = (payload) => ({

    type : GET_TODO ,
    payload : payload
})

export const getTodosData = () => (dispatch) => {

    axios.get("http://localhost:8080/todos").then((res)=> dispatch(getTodos(res.data)))
}