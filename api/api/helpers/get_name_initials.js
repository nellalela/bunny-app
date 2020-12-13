module.exports = {

  friendlyName: 'get name initials for user',


  description: 'retunr string initials used in avatars',


  inputs: {

    name: {
      type: 'string',
      example: 'Ami',
      description: 'The name of the user',
      required: true
    }

  },

  fn: async function (inputs, exits) {
    let nameArray = inputs.name.trim().split(" ");
    let nameInitials;
        if (nameArray.length === 1) {
          nameInitials = `${nameArray[0].charAt(0).toUpperCase()}`;
        } else {
          nameInitials = `${nameArray[0].charAt(0).toUpperCase()}${nameArray[
            nameArray.length - 1
          ].charAt(0).toUpperCase()}`;
        }
    console.log(nameInitials, "nameIn")
    return exits.success(nameInitials);
  }

};
