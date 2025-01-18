const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient({
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
module.exports = prisma