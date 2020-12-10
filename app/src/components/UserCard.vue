<template lang="pug">
  #UserCard
      b-list-group-item.mt-2.d-flex.align-items-center(button
        @click="setUser('set')"
      )
        b-avatar.mr-3(
          badge="8"
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
      selectedUser: {}
    };
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
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    deleteUser() {
      console.log("to be deleted")
    },
    setUser() {
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
