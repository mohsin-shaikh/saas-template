export const siteConfig = {
  name: "SaaS Template",
  description: "",
  dateFormate: "MM/dd/yyyy",
  links: {
    github: "https://github.com/mohsin-shaikh/saas-template",
  },
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://zuupee.com",
}

export type SiteConfig = typeof siteConfig
