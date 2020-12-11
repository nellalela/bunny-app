<template lang="pug">
  #TaskCard
    b-list-group-item.mt-2.d-flex.align-items-center
      b-form-checkbox.mr-auto(
        @change="updateTask($event, 'status')"
        v-model="status"
        name="checkbox-1"
        value="done"
        unchecked-value="pending"
      ) 
        b-form-input(
          @change="updateTask($event, 'description')"
          v-if="isEditing || !task.description "
          v-model="name"
          placeholder="Enter task"
        )
        span(v-if="!isEditing") {{task.description}}
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
      name: "",
      isEditing: false,
    };
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser;
    },
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    getTaskUser() {
      const userName = this.users.filter(user => user.id == this.task.userId)
        return userName.name
    },
   async deleteTask() {
      console.log("delete task")
      const params = this.task.id;
      const deleted = await this.$store.dispatch("deleteTask", params);
      if (deleted.status == 200) {
        this.$store.dispatch("getTasks");
      }
    },
    async updateTask(value, key) {
      console.log(value, key, "value")
      if (this.task.id) {
        const params = { toUpdate: value, id: this.task.id, key: key};
        const update = await this.$store.dispatch("updateTask", params);
        if (update.status == 200) {
          this.isEditing = false;
          this.$store.dispatch("getTasks");
        }
      } else {
        const params = { description: value, userId: this.selectedUser.id };
        const update = await this.$store.dispatch("createTask", params);
        if (update.status == 200) {
          this.$store.dispatch("getTasks");
        }
      }
    },
  }
};
</script>


<style lang="scss">
#TaskCard {
  .list-group-item {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
}
</style>