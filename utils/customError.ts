// src/utils/customError.ts
export function createError(message: string, statusCode: number) {
    return { message, statusCode };
  }
  
  export interface CustomError {
    message: string;
    statusCode: number;
  }
  