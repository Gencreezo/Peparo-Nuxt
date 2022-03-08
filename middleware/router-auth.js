import firebase from "firebase/app";

export default function ({ store, redirect, route }) {
  const user = firebase.auth().currentUser;
  if (!!user) {
    // logged in
    if (isPrivateRoute(route) && !user.emailVerified) {
      window.$nuxt.$emit(
        "alert-error",
        `Please verify your email first. To resend the email visit your profile settings`
      );
      redirect("/");
    }
    if (isLoginOrRegisterRoute(route)) {
      redirect("/");
    }
  } else {
    // not logged in
    if (isPrivateRoute(route)) {
      redirect("/login");
    }
  }
}

function isPrivateRoute(route) {
  const privateRoutes = ["/library"];

  if (privateRoutes.includes(route.path)) {
    return true;
  }
  return false;
}

function isLoginOrRegisterRoute(route) {
  const routes = ["/login", "/register"];
  if (routes.includes(route.path)) {
    return true;
  }
  return false;
}
