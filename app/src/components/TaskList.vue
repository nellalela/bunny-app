<template lang="pug">
  #TaskList
    .container.d-flex.justify-content-between
      h2.main-text Tasks
      b-button.add-btn( 
        v-if="Object.keys(this.selectedUser).length > 0"
        size ="sm" 
        variant="link" 
        @click="addTask()"
        )
        b-icon.mr-1(icon="plus-circle-fill")
        | Add
    section(v-if="filteredTasks.length == 0")
      h3 No tasks yet
      p Select a user to add new task 
    ul.list-group.list-group-flush
      TaskCard(v-for="task in filteredTasks" :task="task")

</template>
<script>
import TaskCard from "@/components/TaskCard.vue";

export default {
  name: "Tasks",
  components: { TaskCard },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    selectedUser() {
      return this.$store.state.selectedUser;
    },
    filteredTasks: {
      get() {
        return this.$store.state.filteredTasks;
      },
      set(value) {
        this.$store.state.filteredTasks = value;
      },
    },
  },
  methods: {
    async getTasks() {
      await this.$store.dispatch("getTasks");
    },
    addTask() {
      this.$store.state.filteredTasks.push({ ...this.$store.state.task });
    }
  },
  async mounted() {
    await this.getTasks();
    this.filteredTasks = this.tasks;
  },
};
</script>

<style lang="scss">
#TaskList {
  .list-group {
    height: 65vh;
    overflow: scroll;
  }
}
</style>
