"use strict";

const minimist = require("minimist");

// import env variables
require("dotenv").config();
// connect db
const connectDb = require("./functions/server/configs/mongoose");

// models
const User = require("./functions/server/models/user");

// operations
const OPERATIONS = ["create-user", "collections", "drop-collection"];

// process variables
const args = minimist(process.argv.slice(2));
const command = args._.shift();

if (!command || args.help || args.h) {
  console.log("command list:");
  for (let cmd of OPERATIONS) {
    console.table("- " + cmd);
  }
  return process.exit();
}
if (!OPERATIONS.includes(command)) {
  console.warn("command not recognized: run --help for list of commands");
  return process.exit();
}

console.log(args);

async function exec() {
  switch (command) {
    case "create-user":
      await createUser();
      break;

    case "collections":
      await listCollections();
      break;

    case "drop-collection":
      await dropCollection();
      break;

    default:
      console.log("coming soon...");
      break;
  }
}
(async () => {
  console.log("Starting admin wizard...");
  await exec();
  console.log("Thank you... Bye");
  process.exit();
})();

// utils
function validateSchema(schema) {
  let params = {};
  let errors = [];
  for (let param of schema) {
    const entry = args[param];
    if (!entry || !entry.length) {
      errors.push(param);
    } else {
      params[param] = args[param];
    }
  }
  if (Object.keys(errors).length) {
    const errorFields = errors.join(", ");
    const message = `invalid params -- ${errorFields} not provided`;
    throw new Error(message);
  }
  return params;
}

async function createUser() {
  try {
    const params = validateSchema(["email", "password", "role"]);

    await connectDb();

    // check if user already exists
    const doesExist = await User.findOne({ email: params.email });
    if (doesExist) throw new Error("Email already registered");

    // create new user with already verified email
    const user = new User({
      ...params,
      firstName: args.firstName || "A",
      lastName: args.lastName || "D",
      meta: { isEmailVerified: true },
    });

    const savedUser = await user.save();
    console.log(savedUser);
  } catch (e) {
    console.warn(e.message);
    return process.exit();
  }
}

async function listCollections() {
  try {
    const db = await connectDb();

    const collections = await db.listCollections().toArray();
    console.log(collections.map((col) => col.name));
  } catch (e) {
    console.warn(e.message);
    return process.exit();
  }
}

async function dropCollection() {
  try {
    const params = validateSchema(["collection"]);

    const db = await connectDb();

    const collection = await db.dropCollection(params.collection);

    console.log(collection);
    console.log(`${params.collection}'s collection dropped successfully`);
  } catch (e) {
    if (e.code === 26) {
      console.warn("Collection not found");
    } else {
      console.log(e.message);
    }
    return process.exit();
  }
}
