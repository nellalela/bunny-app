<template lang="pug">
  #Tasks
    .container.mt-5.d-flex.justify-content-between
      h2.main-text Tasks
      b-button.add-btn( size ="sm" variant="link" @click="addTask()")
        b-icon.mr-1(icon="plus-circle-fill")
        | Add
    b-container(v-for="task in tasks")
      TaskCard(:task="task")

</template>
<script> 
import TaskCard from "@/components/TaskCard.vue";

export default {
  name: "Tasks",
  components: { TaskCard },
  data() {
    return {
      tasks: [
        {
          description: "taskakakakakak",
          status: "done",
          user_id: "123"
        },
        {
          description: "taskakakakakak",
          status: "pending",
          user_id: "123"
        }
      ],
      task: {
        description: "",
        status: "pending"
      }
    }
  },
  computed: {},
  methods: {
    addTask() {
      console.log("users")
      this.tasks.push({...this.task});
    }
  },
};
</script>


<style lang="scss"></style>