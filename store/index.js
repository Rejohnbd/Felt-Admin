export const state = () => ({
  authUser: {},
  test: "Rejohn",
});

export const mutations = {
  ADD_AUTH_USER(state, data) {
    state.authUser = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      user_role_name: data.user.user_role.name,
      user_role_slug: data.user.user_role.slug,
      created_by: data.user.created_by,
      access_token: data.access_token,
      loggedIn: true,
    };
  },
};

export const actions = {
  login(context, data) {
    context.commit("ADD_AUTH_USER", data);
  },
};

export const getters = {
  authUser: (state) => {
    console.log("in getters");
    return state.authUser;
  },
};
