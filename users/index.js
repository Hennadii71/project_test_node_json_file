import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const usersPath = path.resolve("users", "users.json");

export const getAllUsers = async () => {
  const data = await fs.readFile(usersPath);
  return JSON.parse(data);
};

export const getUserById = async (id) => {
  const allUsers = await getAllUsers();
  const userId = allUsers.find((user) => user.id === id);
  return userId || null;
};

export const addUser = async (data) => {
  const allUsers = await getAllUsers();
  const newUser = { id: nanoid(5), ...data };
  allUsers.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(allUsers, null, 2));
  return newUser;
};

export const updateUserById = async (id, data) => {
  const allUsers = await getAllUsers();
  const userIndex = allUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  const updateUser = { ...allUsers[userIndex], ...data };

  allUsers[userIndex] = updateUser;
  await fs.writeFile(usersPath, JSON.stringify(allUsers, null, 2));
  return updateUser;
};

export const deleteUserById = async (id) => {
  const allUsers = await getAllUsers();
  const userIndex = allUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  const [deleteUser] = allUsers.splice(userIndex, 1);
  await fs.writeFile(usersPath, JSON.stringify(allUsers, null, 2));
  return deleteUser;
};
