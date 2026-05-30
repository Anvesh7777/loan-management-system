import api from "@/lib/axios";

export const getLeads = () =>
  api.get("/sales/leads");