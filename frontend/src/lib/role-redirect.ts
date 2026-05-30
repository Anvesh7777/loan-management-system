import { Role } from "@/types";

export const getRoleRoute = (
  role: Role
) => {
  switch (role) {
    case Role.BORROWER:
      return "/borrower";

    case Role.SALES:
      return "/sales";

    case Role.SANCTION:
      return "/sanction";

    case Role.DISBURSEMENT:
      return "/disbursement";

    case Role.COLLECTION:
      return "/collection";

    case Role.ADMIN:
      return "/admin";

    default:
      return "/login";
  }
};