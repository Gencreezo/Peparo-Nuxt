/** returns an imutable user */
const getters = {
  GET_USER: (state) => {
    return { ...state.user };
  },
  getEmailVerified: (state) => {
    return state.user?.emailVerified;
  },
};
export default getters;
