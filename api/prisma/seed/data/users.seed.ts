import { Role, User } from "@prisma/client";

const users: User[] = [
  {
    id: "f1bdf45e-1b1c-11ec-9621-0242ac130002",
    createdAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    updatedAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    name: "SkullCutter",
    email: "example1@gmail.com",
    role: Role.EDITOR,
  },
  {
    id: "9d89eedb-687d-4f5b-a6f2-dd4f723edf8e",
    createdAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    updatedAt: new Date("Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)"),
    name: "Alan Au",
    email: "example2@gmail.com",
    role: Role.MEMBER,
  },
];

export default users;
