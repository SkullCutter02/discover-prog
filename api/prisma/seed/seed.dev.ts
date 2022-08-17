import { PrismaClient } from "@prisma/client";

import users from "./data/users.seed";
import infos from "./data/info.seed";
import genres from "./data/genre.seed";

const prisma = new PrismaClient();

async function runSeeders() {
  await Promise.all(
    genres.map((genre) =>
      prisma.genre.upsert({
        where: { id: genre.id },
        update: {},
        create: genre,
      })
    )
  );

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      })
    )
  );

  await Promise.all(
    infos.map((info) =>
      prisma.info.upsert({
        where: { id: info.id },
        update: {},
        create: info,
      })
    )
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });
