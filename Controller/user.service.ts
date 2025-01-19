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
  password
}: {
  name: string;
  email: string;
  password:string
}) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password
    },
  });
  return user;
};

export { getUserByEmail, postCreateUser };
