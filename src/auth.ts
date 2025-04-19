import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { openAPI, organization, admin } from "better-auth/plugins";
import { afterHook, beforeHook } from "@/functions/auth/auth-logic";
import { sendEmail } from "@/functions/email/send";
import { InviteTemplate } from "@/components/email/invitation";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        },
        google: { 
            clientId: process.env.AUTH_GOOGLE_ID as string, 
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string, 
        },
    },
    hooks: {
        before: createAuthMiddleware(beforeHook),
        after: createAuthMiddleware(afterHook),
    },
    advanced: {
        cookiePrefix: "auth"
    },
    plugins: [
        openAPI(),
        admin(),
        organization({
            async sendInvitationEmail(data, request) {
                const inviteLink = `http://localhost:3000/invitation/${data.id}`;

                const { data: emailData, error } = await sendEmail({
                    from: "invitation@updates.stackster.dev",
                    to: data.email,
                    subject: `Team Invitation from ${data.organization.name}`,
                    template: InviteTemplate({
                        userImage: data.inviter.user.image,
                        invitedByEmail: data.inviter.user.email,
                        teamName: data.organization.name,
                        teamImage: data.organization.logo,
                        inviteLink,
                    }),
                });

                console.log(emailData, error);
            },
        }),
    ]
});