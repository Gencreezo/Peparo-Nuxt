import firebase from "firebase/app";
import "firebase/auth";

const actions = {
  onAuthStateChangedAction(ctx, { authUser, claims }) {
    if (!authUser) {
      // logged out
      this.$fireAuth.signOut().catch((err) => console.log(err));
      ctx.commit("adventureData/removeAdventureData", ctx, { root: true });
      ctx.commit("adventure/removeAdventures", ctx, { root: true });
    } else {
      // logged in
    }
  },

  async refreshUserData({ commit }) {
    await firebase.auth().currentUser.reload();
    const user = firebase.auth().currentUser;
    commit("SET_USER", { authUser: user });
  },

  signOut({ commit }) {
    this.$fireAuth
      .signOut()
      .then(() => {
        commit("SET_USER", { authUser: null });
      })
      .catch((err) => console.log(err));
  },

  registerWithEmail({ commit }, { username, email, password }) {
    const auth = this.$fireAuth;
    return new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCred) => {
          userCred.user.updateProfile({ displayName: username }).then(() => {
            commit("SET_USER", { authUser: userCred.user });
            userCred.user
              .sendEmailVerification()
              .then(() => {
                return resolve();
              })
              .catch((err) => {
                return reject(err);
              });
          });
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  signInWithEmail({ commit }, { email, password }) {
    const auth = this.$fireAuth;
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCred) => {
          commit("SET_USER", { authUser: userCred.user });
          return resolve();
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  resendEmailVerification() {
    const user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      user
        .sendEmailVerification()
        .then(() => {
          return resolve();
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  sendPasswordResetEmail({ commit }, email) {
    const auth = this.$fireAuth;
    return new Promise((resolve, reject) => {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          return resolve();
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },

  async changeUserSettings({ commit }, { user, password }) {
    const currentUser = this.$fireAuth.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    let updatedFields = 0;

    if (user.username !== currentUser.displayName) {
      if (!password) throw new Error("Please verify with password");
      try {
        await currentUser.reauthenticateWithCredential(credentials);
        await currentUser.updateProfile({ displayName: user.username });
        await firebase.auth().currentUser.reload();
        updatedFields++;
        commit("SET_USERNAME", user.username);
      } catch (err) {
        throw new Error(err);
      }
    }
    if (user.email !== currentUser.email) {
      if (!password) throw new Error("Please verify with password");
      try {
        await currentUser.reauthenticateWithCredential(credentials);
        await currentUser.SET_EMAIL(user.email);
        await firebase.auth().currentUser.reload();
        updatedFields++;
        commit("SET_EMAIL", currentUser.email);
      } catch (err) {
        throw new Error(err);
      }
    }
    if (updatedFields === 0) {
      throw new Error("No Fields were updated");
    }
  },
};
export default actions;
