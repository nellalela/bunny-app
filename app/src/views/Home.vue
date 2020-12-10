<template lang="pug">
  #Home
    Header
    b-container.py-5
    b-row.d-flex.justify-content-around
      b-col(md="4")
        UserList
      b-col(md="6")
        UserList
</template>

<script>
import Header from "@/components/Header.vue";
import UserList from "@/components/UserList.vue";
export default {
  name: "Home",
  components: {
    Header,
    UserList
  }
}
</script>
<style lang="scss"></style>