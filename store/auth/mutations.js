const mutations = {
  SET_USER: (state, { authUser }) => {
    if (!authUser) {
      state.user.id = null;
      state.user.username = null;
      state.user.email = null;
      state.user.emailVerified = null;
    } else {
      state.user.id = authUser.uid;
      state.user.username = authUser.displayName;
      state.user.email = authUser.email;
      state.user.emailVerified = authUser.emailVerified;
    }
  },
  SET_USERNAME: (state, username) => {
    if (username) {
      state.user.username = username;
    }
  },
  SET_EMAIL: (state, email) => {
    if (email) {
      state.user.email = email;
    }
  },
};
export default mutations;
