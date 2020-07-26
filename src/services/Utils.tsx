export function getPropertyName(propertyFunction: Function): string {
  return (
    propertyFunction
      .toString()
      .split(".")
      .pop()
      ?.split(" ")[0]
      .split(";")[0]
      .split("}")[0] || ""
  );
}

export function centsToReal(cents: number) {
  return "R$ " + (cents / 100).toFixed(2);
}
