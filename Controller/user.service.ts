import { prisma } from "../Db/db.config";

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return user;
};

const postCreateUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return user;
};

export { getUserByEmail, postCreateUser };
