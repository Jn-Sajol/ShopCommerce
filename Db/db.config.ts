import { PrismaClient } from "@prisma/client"


export const prisma = new PrismaClient({
    log:['query']
})
// (async () => {
//     try {
//       await prisma.$connect();
//       console.log('Database connected successfully!');
//     } catch (error) {
//       console.error('Database connection failed:', error);
//     }
//   })();