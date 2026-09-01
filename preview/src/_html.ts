/** Safely serializes data for assignment inside an inline browser script. */
export function serializeForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function scriptAssignment(name: string, value: unknown): string {
  if (!/^[A-Za-z_$][\w$]*$/.test(name)) {
    throw new Error('Invalid browser variable name: ' + name);
  }
  return 'var ' + name + ' = ' + serializeForScript(value) + ';';
}