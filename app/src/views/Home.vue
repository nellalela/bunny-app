<template lang="pug">
  #Home
    Header
    b-container.py-5
    b-row.d-flex.justify-content-around
      b-col.mb-5(md="4")
        UserList
      b-col.mb-5(md="6")
        TaskList
</template>

<script>
import Header from "@/components/Header.vue";
import UserList from "@/components/UserList.vue";
import TaskList from "@/components/TaskList.vue";
export default {
  name: "Home",
  components: {
    Header,
    UserList,
    TaskList
  }
}
</script>
<style lang="scss"></style>