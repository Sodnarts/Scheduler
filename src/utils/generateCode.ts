const characters = '0123456789ABCDEFGHJIKLMNOPQRSTUVWXYZ';

export const generateCode = (length: number = 6) => {
  let code = '';

  for (let i = 0; i < length; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }

  return code;
};
