import  axios  from 'axios';

//get user token and parsing it to object
const user = JSON.parse(localStorage.getItem('todoapp'))

//default auth header for all requests form axios
axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`


//sends a POST request to backend to createtodo
// data is payload (data you are sending) to backend
const createTodo = (data)=>{
    //sends frontend data to backend
    return axios.post('/todo/create',data)
}
const getAllTodo = (id) => {
  //sends frontend data to backend
  return axios.get(`/todo/getAll/${id}`);
};
const updateTodo = (id,data) => {
  //sends frontend data to backend
  return axios.patch("/todo/update/" + id , data);
};
const deleteTodo = (id)=>{
  return axios.delete("/todo/delete/" + id);
}
const TodoServices = {createTodo ,getAllTodo ,updateTodo , deleteTodo}
export default TodoServices
