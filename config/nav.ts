export const links = [
  {
    link: "/dashboard",
    name: "Dashboard",
  },
  {
    link: "/dashboard/users",
    name: "Users",
    isNotAllowed: ["MANAGER"],
  },
]
