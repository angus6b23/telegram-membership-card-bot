import { addRole, getRoleById, removeRole, UserRole } from "./auth-helper";
import { openDb } from "./init-db";

describe("Auth Tests", () => {
  beforeAll(async () => {
    await openDb();
  });
  const restructedUserId = Math.floor(Math.random() * 100000);
  const userId = Math.floor(Math.random() * 100000);
  const adminId = Math.floor(Math.random() * 100000);
  const nonExistenceId = Math.floor(Math.random() * 100000);

  it("Should able to create user with the correct role", async () => {
    await addRole(restructedUserId, UserRole.RestrictedUser);
    await addRole(userId, UserRole.User);
    await addRole(adminId, UserRole.Admin);
    const newRestructedUser = await getRoleById(restructedUserId);
    const newUser = await getRoleById(userId);
    const newAdmin = await getRoleById(adminId);
    const nonExistenceUser = await getRoleById(nonExistenceId);

    expect(nonExistenceUser).toEqual(-1);
    expect(newRestructedUser).toEqual(UserRole.RestrictedUser);
    expect(newUser).toEqual(UserRole.User);
    expect(newAdmin).toEqual(UserRole.Admin);
  });

  it("Should able to delete user", async () => {
    await removeRole(restructedUserId);
    await removeRole(userId);
    await removeRole(adminId);

    const newUser = await getRoleById(userId);
    const newAdmin = await getRoleById(adminId);
    const restructedUser = await getRoleById(restructedUserId);

    expect(newUser).toEqual(-1);
    expect(newAdmin).toEqual(-1);
    expect(restructedUser).toEqual(-1);
  });
});
