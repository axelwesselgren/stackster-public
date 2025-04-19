import { APIError } from "better-auth/api";

export const beforeHook = async (ctx: any) => {
    if (ctx.path !== "/sign-up/email") {
        return;
    }
    
}

export const afterHook = async (ctx: any) => {
    if (ctx.path === "/sign-up/email" || ctx.path === "/sign-up/social") {
        
    }

    if (ctx.path === "/sign-up/email") {
        ctx.redirect("/dashboard");
    }
}