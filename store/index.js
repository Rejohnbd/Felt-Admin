export const state = () => ({
  authUser: {},
  test: "Rejohn",
});

export const mutations = {
  ADD_AUTH_USER(state, data) {
    state.authUser = {
      userName:
        data.user.user_details.first_name +
        " " +
        data.user.user_details.last_name,
      userEmail: data.user.email,
      userEmailOptional: data.user.user_details.email_optional,
      userRole: data.user.user_role.slug,
      userCompany: data.user.user_details.company_name,
      userDesignation: data.user.user_details.designation,
      userPhoneNumber: data.user.user_details.phone_number,
      userPhoneOptional: data.user.user_details.phone_optional,
      userNote: data.user.user_details.notes,
      userReference: data.user.user_details.reference,
      userImage: data.user.user_details.image,
      createdBy: data.user.created_by,
      accessToken: data.access_token,
      loggedIn: true,
    };
  },
  REMOVE_AUTH_USER(state) {
    console.log("logout store", state.authUser);
    state.authUser = {};
  },
};

export const actions = {
  login(context, data) {
    context.commit("ADD_AUTH_USER", data);
  },
  logout(context) {
    context.commit("REMOVE_AUTH_USER", data);
  },
};

export const getters = {
  authUser: (state) => {
    console.log("in getters");
    return state.authUser;
  },
};
