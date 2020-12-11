<template lang="pug">
  #Tasks
    .container.d-flex.justify-content-between
      h2.main-text {{taskOwner}} Tasks
      b-button.add-btn( 
        v-if="selectedUser" 
        size ="sm" 
        variant="link" 
        @click="addTask()"
        )
        b-icon.mr-1(icon="plus-circle-fill")
        | Add
    section(v-if="tasks.length == 0")
      h3 No tasks yet
      p Select a user to add new task 
    b-container(v-for="task in filteredTasks")
      TaskCard(:task="task")

</template>
<script> 
import TaskCard from "@/components/TaskCard.vue";

export default {
  name: "Tasks",
  components: { TaskCard },
  data() {
    return {
      filteredTasks: [],
      taskOwner: ""
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    selectedUser() {
      return this.$store.state.selectedUser;
    }
  },
  watch: {
    selectedUser(){
      const filteredTasks = this.tasks.filter( task => task.userId == this.selectedUser.id)
      this.taskOwner = Object.keys(this.selectedUser).length > 0 ? this.selectedUser.name.split(" ")[0] : "";
      this.filteredTasks = Object.keys(this.selectedUser).length > 0 ? filteredTasks : this.tasks;
    }
  },
  methods: {
    async getTasks() {
      await this.$store.dispatch("getTasks");
    },
    addTask() {
      this.$store.state.tasks.push({...this.$store.state.task});
    }
  },
  async mounted() {
    await this.getTasks();
    this.filteredTasks = this.tasks;
  }
};
</script>


<style lang="scss"></style>