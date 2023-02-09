function ensureIdentification(user: string, callback: () => Object) {
  if (user == null) throw new Error("User not identified");
  return callback();
}
