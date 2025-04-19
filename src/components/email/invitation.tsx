import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface InviteProps {
  userImage?: string | null | undefined;
  invitedByEmail: string;
  teamName: string;
  teamImage?: string | null | undefined;
  inviteLink: string;
}

const baseUrl = 'https://localhost:3000';

export const InviteTemplate = ({
  userImage,
  invitedByEmail,
  teamName,
  teamImage,
  inviteLink,
}: InviteProps) => {
  const previewText = `Join ${teamName} on Stackster`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/images/logo.png`}
                width="56.25"
                height="56.25"
                alt="Stackster"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{teamName}</strong> on <strong>Stackster</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              {' '}has invited you to the <strong>{teamName}</strong> team on{' '}
              <strong>Stackster</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  {userImage ? (
                    <Img
                      className="rounded-full"
                      src={userImage}
                      width="64"
                      height="64"
                    />
                  ) : (
                    <div className="bg-[#f3f4f6] w-[64px] h-[64px] rounded-full" />
                  )}
                </Column>
                <Column align="center">
                  <Img
                    src={`${baseUrl}/images/arrow.png`}
                    width="12"
                    height="9"
                    alt=">"
                  />
                </Column>
                <Column align="left">
                  {teamImage ? (
                    <Img
                      className="rounded-full"
                      src={teamImage}
                      width="64"
                      height="64"
                    />
                  ) : (
                    <div className="bg-[#f3f4f6] w-[64px] h-[64px] rounded-full" />
                  )}
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#E86A2F] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser{' '}
              <br/>
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              You are receiving this email because you were invited to join a
              team on Stackster. If you did not request this, please ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};