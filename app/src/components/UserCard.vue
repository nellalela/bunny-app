<template lang="pug">
#UserCard
  b-list-group-item.user.mt-2.d-flex.align-items-center(
    button
    @click="setUser()"
    v-bind:class="{ 'active' : isSelected }"
  )
    b-avatar.mr-3(
      :badge="getUsersTasks()"
      :text="user.nameInitials")
    b-form-input(
      @change="updateUser($event)"
      v-if="isEditing || !user.id"
      v-model="user.name"
      :placeholder="!user.id ? '' : 'Enter name'"
    )
    span.mr-auto(v-if="!isEditing && user.id") {{user.name}}
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
      isEditing: false,
      isSelected: false,
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
      },
    },
    filteredTasks: {
      get() {
        return this.$store.state.filteredTasks;
      },
      set(value) {
        this.$store.commit("setfilteredTasks", value);
      },
    },
  },
  watch: {
    tasks() {
      this.filterTasks();
    },
  },
  methods: {
    getUsersTasks() {
      let tasks = this.tasks.filter((task) => task.userId == this.user.id);
      tasks = tasks.length.toString();
      return tasks;
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
          console.log("sillego")
          this.selectedUser = {};
          this.filterTasks();
          this.isSelected = !this.isSelected;
          this.$store.dispatch("getUsers");
        }
        
      }
    },
    async deleteUser() {
      const params = this.user.id;
      const deleted = await this.$store.dispatch("deleteUser", params);
      if (deleted.status == 200) {
        this.selectedUser = {};
        this.filterTasks();
        this.$store.dispatch("getUsers");
        this.$store.dispatch("getTasks");
      }
    },
    setUser() {
      let el = document.querySelector(".active");
      if (el) {
        el.classList.remove("active");
      }
      this.isSelected = !this.isSelected;
      console.log(this.isSelected, this.selectedUser,"set user")
      if(Object.keys(this.selectedUser).length == 0 || this.selectedUser !== this.user || this.isEditing ) {
        this.selectedUser = this.user;
      } else {
        console.log("aqui")
        this.selectedUser = {};
      }
      this.filterTasks();
    }, 
    filterTasks() {
      if(Object.keys(this.selectedUser).length == 0) {
        console.log("no filtar")
        this.filteredTasks = this.tasks;
        return;
      } else {
         console.log("filtar")
          this.filteredTasks = this.tasks.filter(
          (task) => task.userId == this.selectedUser.id
        );
        return;
      }
    }
  },
};
</script>

<style lang="scss">
#UserCard {
  .list-group-item.active {
    background-color: #f6f6f6;
    color:  #232b42;
  }
}
</style>
