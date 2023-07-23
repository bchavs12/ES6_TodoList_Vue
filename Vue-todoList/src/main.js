import { createApp } from "vue";
import Todos from "./api/todos";
import "./assets/css/main.css";

const apiTodos = new Todos();

const app = createApp({
  data() {
    return {
      todos: [],
      form: {
        text: "",
        done: false,
      },
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      // list todos on interface
      this.todos = await apiTodos.index();
    },
    async createTodo() {
      // create new todos
      const data = await apiTodos.store(this.form);
      this.todos.push(data);
      this.form.text = "";
      this.form.done = false;
    },
    async toggleTodoStatus(todo) {
      // update todos completed or uncompleted
      const data = await apiTodos.update({
        ...todo,
        done: !todo.done,
      });

      const index = this.todos.findIndex(({ id }) => id == data.id);
      this.todos[index] = data;
    },
    async deleteTodo(id) {
      // Delete todos
      await apiTodos.delete({ id });

      const index = this.todos.findIndex((todo) => todo.id == id);
      this.todos.splice(index, 1)
    },
  },
});

app.mount("#app");
