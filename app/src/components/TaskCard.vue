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
  computed: {},
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    deleteTask() {
      console.log("delete tast")
    },
    updateTask(value, key) {
      console.log(value, key, "value")
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