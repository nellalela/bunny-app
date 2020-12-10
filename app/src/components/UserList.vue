<template lang="pug">
  #Users
    b-container.d-flex.justify-content-between
      h2.secondary__color Users
      b-button.add-btn(size ="sm" variant="link" @click="addUser()")
        b-icon.mr-1(icon="plus-circle-fill")
        | Add
    b-container(v-for="user in users")
      UserCard(:user="user")
      
</template>
<script> 
import UserCard from "@/components/UserCard.vue";
import * as _ from "lodash";

export default {
  name: "Users",
  components: { UserCard },
  data() {
    return {
      users: [
        {
        name: "Nelly Ram",
        id: "123"
        },
        {
        name: "Diana Ram",
        id: "456"
        }
      ],
      user: {
      name: "",
      }
    }
  },
  methods: {
    async addUser() {
      console.log("users")
      this.users.push(_.cloneDeep(this.user));
    }
  },
  mounted() {}
};
</script>


<style lang="scss"></style>