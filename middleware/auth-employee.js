export default async function ({ app, $auth, redirect, store }) {
  console.log("in employee middleware");
  let user = $auth.user;

  if (user && user.user_role.slug !== "employee") {
    return redirect("/");
  }
}
