import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

// Route.group(() => {
//   Route.post("/users", "UsersController.create");
//   Route.get("/users", "UsersController.index");
//   Route.get("/users/:id", "UsersController.show");
// }).prefix("/api");

Route.group(() => {
  Route.resource("users", "UsersController");
})
  .prefix("api")
  .as("api")
  .middleware("auth");
