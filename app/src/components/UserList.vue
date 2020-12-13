<template lang="pug">
  #Users
    b-container.d-flex.justify-content-between
      h2.secondary__color Users
      b-button.add-btn(size ="sm" variant="link" @click="addUser()")
        b-icon.mr-1(icon="plus-circle-fill")
        | Add
    section(v-if="users.length == 0")
      h3 No users yet
      p Click add to create
    b-container(v-for="user in users")
      UserCard(:user="user")
      
</template>
<script>
import UserCard from "@/components/UserCard.vue";

export default {
  name: "Users",
  components: { UserCard },
  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    async getUsers() {
      await this.$store.dispatch("getUsers");
    },
    async addUser() {
      this.$store.state.users.push({ ...this.$store.state.user });
    },
  },
  async mounted() {
    await this.getUsers();
  },
};
</script>

<style lang="scss"></style>
