export default async function ({ app, $auth, redirect, store }) {
  console.log("in admin middleware");
  let user = $auth.user;
  console.log("in middleware", $auth);
  if (user && user.user_role.slug !== "admin") {
    return redirect("/");
  }
}
