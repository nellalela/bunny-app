<template lang="pug">
  #UserCard
      b-list-group-item.mt-2.d-flex.align-items-center(button
        @click="setUser()"
      )
        b-avatar.mr-3(
          :badge="getUsersTasks()"
          :text="getUserInitials()")
        b-form-input(
          @change="updateUser($event)"
          v-if="isEditing || !user.name "
          v-model="name"
          placeholder="Enter name"
        )
        span.mr-auto(v-if="!isEditing") {{user.name}}
        b-button(
          @click="toggleEditing"
          size="sm"
          variant="link")
          b-icon(
            icon="pencil-fill"
            font-scale="1")
        b-button(
          @click="deleteUser"
          size="sm"
          variant="link")
          b-icon(
            icon="trash-fill"
            font-scale="1")
    

</template>
<script>
export default {
  name: "UserCard",
  props: { user: Object },
  data() {
    return {
      name: "",
      userInitials: "",
      isEditing: false,
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    tasks() {
      return this.$store.state.tasks;
    },
    selectedUser: {
      get() {
        return this.$store.state.selectedUser;
      },
      set(value) {
        this.$store.commit("setSelectedUser", value);
      }
    }
  },
  methods: {
    getUserInitials() {
      if (this.user) {
        let nameArray = this.user["name"].trim().split(" ");
        if (nameArray.length === 1)
          this.userInitials = `${nameArray[0].charAt(0)}`;
        else
          this.userInitials = `${nameArray[0].charAt(0)}${nameArray[
            nameArray.length - 1
          ].charAt(0)}`;
        return this.userInitials.toUpperCase();
      }
    },
    getUsersTasks() {
      let tasks = this.tasks.filter(task => task.userId == this.user.id)
      tasks = tasks.length.toString();
      return tasks
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    async updateUser(value) {
      if (this.user.id) {
        const params = { name: value, id: this.user.id };
        const update = await this.$store.dispatch("updateUser", params);
        if (update.status == 200) {
          this.isEditing = false;
          this.$store.dispatch("getUsers");
        }
      } else {
        const update = await this.$store.dispatch("createUser", value);
        if (update.status == 200) {
          this.$store.dispatch("getUsers");
        }
      }
    },
    async deleteUser() {
      const params = this.user.id;
      const deleted = await this.$store.dispatch("deleteUser", params);
      if (deleted.status == 200) {
        this.$store.dispatch("getUsers");
        this.$store.dispatch("getTasks");
      }
    },
    setUser() {
      console.log("set user", this.selectedUser)
      
      if (!Object.keys(this.selectedUser).length || this.selectedUser !== this.user) {
        this.selectedUser = this.user;
        return;
      }
      else {
        this.selectedUser = {}
        return;
      }
    }
  },
};
</script>

<style lang="scss"></style>
