export function getPrimaryRole(roles: string[]) {
  if (roles.includes("admin")) {
    return "Admin";
  } else if (roles.includes("debugger")) {
    return "Developer";
  } else if (roles.includes("contributor")) {
    return "Contributor";
  } else {
    return "User";
  }
}
