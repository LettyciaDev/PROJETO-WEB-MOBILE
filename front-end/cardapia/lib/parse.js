import Parse from "parse";

if (!Parse.applicationId) {
  Parse.initialize(
    "mmdgUUMfzBrInhwWfSDp3oFJW3gJGHyoXE4smW0Y",
    "E5v7T9NIy5N7rFWxE82e3RFooyN8EG7HfIgXeR03",
  );

  Parse.serverURL = "https://parseapi.back4app.com/";

  Parse.User.enableUnsafeCurrentUser();
}

export default Parse;
