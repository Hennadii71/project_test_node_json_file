// import yargs from "yargs";
import { Command, program } from "commander";
// import { program } from "commander";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./users/index.js";

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      const allUsers = await getAllUsers();
      return console.log(allUsers);
      break;
    case "getById":
      const userById = await getUserById(id);
      console.log(userById);
      break;
    case "add":
      const newUser = await addUser(data);
      console.log(newUser);
      break;
    case "updateUser":
      const updateUser = await updateUserById(id, data);
      console.log(updateUser);
      break;
    case "deleteById":
      const deleteUser = await deleteUserById(id);
      return console.log(deleteUser);
  }
};

// invokeAction({ action : "list"});

// invokeAction({action: "getById", id: "1"});

// invokeAction({
//   action: "add",
//   firstname: "Jane",
//   lastname: "Smith",
//   email: "jane.smith@example.com",
//   username: "janesmith",
//   address: "456 Oak Avenue",
//   city: "Austin",
//   state: "TX",
//   zipcode: "73301",
//   country: "USA",
//   phone: "555-5678",
// });

// invokeAction({ action: "updateUser", id: "1", city: "Lviv" });

// invokeAction({ action: "deleteById", id: "2" });

// const { argv } = yargs(process.argv.slice(2));
// invokeAction(argv);
program
  .option("--action <type>")
  .option("--id <type>")
  .option("--firstname <type>")
  .option("--lastname <type>")
  .option("--email <type>")
  .option("--username <type>")
  .option("--address <type>")
  .option("--city <type>")
  .option("--state <type>")
  .option("--zipcode <type>")
  .option("--country <type>")
  .option("--phone <type>");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);
console.log(options);
