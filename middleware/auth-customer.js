export default async function ({ app, $auth, redirect, store }) {
  console.log("in customer middleware");
  let user = $auth.user;

  if (user && user.user_role.slug !== "customer") {
    return redirect("/");
  }
}
