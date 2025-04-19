import { getSession } from "@/functions/session/get-session";
import { APIResponse } from "@/types/response";
import { handleError } from "@/helper/error";

const withAuth = async <T>(
  callback: (orgId: string) => Promise<APIResponse<T>>
): Promise<APIResponse<T>> => {
  try {
    const session = await getSession();
    const orgId = session?.session?.activeOrganizationId;

    if (!session || !orgId) {
      return { 
        data: null, 
        message: "Unauthorized",
        code: 401 
      } as APIResponse<T>;
    }

    return callback(orgId);
  } catch (error) {
    return handleError(error) as APIResponse<T>;
  }
};

export { withAuth };