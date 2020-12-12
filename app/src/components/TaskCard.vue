<template lang="pug">
    li.list-group-item.mt-2.d-flex.align-items-center
      b-form-checkbox.mr-auto(
        @change="updateTask($event, 'status')"
        v-model="status"
        name="checkbox-1"
        value="done"
        unchecked-value="pending"
      ) 
        b-form-input(
          @change="updateTask($event, 'description')"
          v-if="isEditing || !task.id "
          v-model="task.description"
          placeholder="Enter task"
        )
        span(v-if="!isEditing && task.id") {{task.description}}
      b-avatar(
        v-if="taskOwner"
        size="sm"
        :text="taskOwner.nameInitials"
      )
      b-button(
            @click="toggleEditing"
            size="sm"
            variant="link")
          b-icon(
              icon="pencil-fill"
              font-scale="1")
      b-button(
        @click="deleteTask"
            size="sm"
            variant="link")
        b-icon(
              icon="trash-fill"
              font-scale="1")
      
</template>
<script>
export default {
  name: "TaskCard",
  props: { task: Object },
  data() {
    return {
      status: this.task.status,
      isEditing: false,
    };
  },
  computed: {
    selectedUser: {
      get() {
        return this.$store.state.selectedUser;
      },
      set(value) {
        this.$store.commit("setSelectedUser", value);
      },
    },
    users() {
      return this.$store.state.users;
    },
    taskOwner() {
      return this.users.find(user => user.id == this.task.userId)
    },
    filteredTasks: {
      get() {
        return this.$store.state.filteredTasks;
      },
      set(value) {
       this.$store.commit("setfilteredTasks", value);
      },
    },
  },
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    getTaskUser() {
      const userName = this.users.filter((user) => user.id == this.task.userId);
      return userName.name;
    },
    async deleteTask() {
      const params = this.task.id;
      const deleted = await this.$store.dispatch("deleteTask", params);
      if (deleted.status == 200) {
        this.$store.dispatch("getTasks");
      }
    },
    async updateTask(value, key) {
      if (this.task.id) {
        const params = { toUpdate: value, id: this.task.id, key: key };
        const update = await this.$store.dispatch("updateTask", params);
        if (update.status == 200) {
          this.isEditing = false;
          this.$store.dispatch("getTasks");
        }
      } else {
        const params = { description: value, userId: this.selectedUser.id };
        const update = await this.$store.dispatch("createTask", params);
        if (update.status == 200) {
          console.log("create get task")
          this.$store.dispatch("getTasks");
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
