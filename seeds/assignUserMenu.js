
import models from "../models/index.js";
const {UserMenu}= models
export const assignUserMenu = async (userId, menuId) => {
  console.log(menuId);
  const userMenu = new UserMenu({
    user: userId,
    menu: menuId,
    assignedBy: userId,
  });

  await userMenu.save();
};