export default async function ({ app, $auth, redirect, store }) {
  // console.log("in middleware", $auth);
  let user = $auth.user;
  if (user && user.user_role.slug !== "admin") {
    return redirect("/");
  }
}
