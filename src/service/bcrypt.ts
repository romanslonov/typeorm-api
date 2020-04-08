import bcrypt from 'bcrypt';
const salt = 10;

const password = (pw: string) => bcrypt.hash(pw, salt);

const comparePassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);

export default { password, comparePassword };
