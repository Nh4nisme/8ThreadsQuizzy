export function getDefaultRouteForRole(role) {
  return role === "student" ? "/QuizzForStudent" : "/dashboard";
}
