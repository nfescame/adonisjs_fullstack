import Route from "@ioc:Adonis/Core/Route";

//  login

Route.post("login", "AuthController.login").namespace(
  "App/Controllers/Http/ApiV1"
);

// views

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

// api
Route.group(() => {
  Route.resource("users", "UsersController");
})
  .prefix("api")
  .as("api")
  .namespace("App/Controllers/Http/ApiV1");
