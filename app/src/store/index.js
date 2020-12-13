import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    host: "https://bunny-app.herokuapp.com/",
    users: [],
    tasks: [],
    filteredTasks: [],
    selectedUser:{},
    user: {
      name: "",
    },
    task: {
      description: "",
      status: "",
      userId: ""
    },
  },
  mutations: {
    setSelectedUser(state, value) {
      state.selectedUser = value;
    },
    setfilteredTasks(state, value) {
      state.filteredTasks = value;
    }
  },
  actions: {
    async getUsers({ state }) {
      const url = state.host + "users";
      const users = await axios.get(url);
      state.users = users.data
      return users
    },
    async createUser({ state }, name) {
      const url = state.host + "user";
      const params = { name: name }
      const user = await axios.post(url, params)
      return user
    },
    async updateUser({ state }, fields) {
      const url = state.host + "user/" + fields.id;
      const params = { name: fields.name }
      const user = await axios.put(url, params)
      return user
    },
    async deleteUser({ state }, id) {
      const url = state.host + "user/" + id;
      const user = await axios.delete(url)
      return user
    },
    async getTasks({ state }) {
      const url = state.host + "tasks";
      const tasks = await axios.get(url);
      state.tasks = tasks.data
      return tasks
    },
    async deleteTask({ state }, id) {
      const url = state.host + "task/" + id;
      const task = await axios.delete(url)
      return task
    },
    async updateTask({ state }, fields) {
      const url = state.host + "task/" + fields.id;
      const params = { toUpdate: fields.toUpdate, key: fields.key}
      const task = await axios.put(url, params)
      return task
    },
    async createTask({ state }, fields) {
      const url = state.host + "task";
      const params = { description: fields.description, userId: fields.userId, status:"pending" }
      const task = await axios.post(url, params)
      return task
    },
  },
  modules: {},
});
