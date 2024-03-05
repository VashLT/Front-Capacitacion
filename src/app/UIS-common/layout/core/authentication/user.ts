import { defaultAvatar } from "../../constants/default-avatar";
import { User } from "./interface";

export const admin: User = {
  id: 1,
  name: "Zongbin",
  email: "nzb329@163.com",
  avatar: "./assets/images/avatar.jpg",
};

export const guest: User = {
  id: null,
  name: "Usuario",
  email: "correo@uis.edu.co",
  // eslint-disable-next-line max-len
  avatar: defaultAvatar,
};
