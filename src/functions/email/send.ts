import { ReactNode } from "react";
import { Resend } from "resend";

export const sendEmail = async ({
    from,
    to,
    subject,
    template
}: {
    from: string,
    to: string,
    subject: string,
    template: ReactNode
}) => {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        react: template
    });

    return { data, error };
}