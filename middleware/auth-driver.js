export default async function ({ app, $auth, redirect, store }) {
  console.log("in driver middleware", $auth);
  let user = $auth.user;

  if (user && user.user_role.slug !== "driver") {
    return redirect("/");
  }
}
