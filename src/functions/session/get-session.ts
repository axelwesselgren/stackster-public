import { NextRequest } from "next/server";
import { authClient } from "@/auth-client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { SessionData } from "@/types/session";

export const getSessionRequest = async (request: NextRequest) => {
    const { data: session } = await authClient.getSession({
        fetchOptions: {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        }
    });
    
    return session;
}

export const getSessionCookie = async (cookie: string) => {
    if (!cookie) {
        return null;
    }

    const { data: session } = await authClient.getSession({
        fetchOptions: {
            headers: {
                cookie: cookie,
            },
        }
    });
    
    return session;
}

export const encodeCookie = (cookie: RequestCookie | undefined) => {
    if (!cookie) {
        return "";
    }

    return encodeURIComponent(cookie.value);
}

export const getAuthCookie = async (): Promise<string> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("auth.session_token");
  const encodedCookie = encodeCookie(cookie);

  return `auth.session_token=${encodedCookie}`;
};

export const getSession = async (): Promise<SessionData | null> => {
  const cookie = await getAuthCookie();
  return getSessionCookie(cookie);
};