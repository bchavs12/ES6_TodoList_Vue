import axios from '../utils/axios'

export default class Todo {
  async index() {
    const { data } = await axios.get('/todos')
    return data;
  }
  
  async store({text, done}) {
    const { data } = await axios.post("/todos", {text,done});
    return data;
  }

  async update({id, text, done}) {
    const { data } = await axios.put(`/todos/${id}`, {text,done});
    return data;
  }

  async delete({id}) {
    const { data } = await axios.delete(`/todos/${id}`)
    return data
  }
}