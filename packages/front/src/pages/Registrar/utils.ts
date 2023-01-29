export function notNullAndEquals(password: string, confirmedPassword: string) {
  return (
    password !== "" &&
    confirmedPassword !== "" &&
    password === confirmedPassword
  );
}
