interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  banned?: boolean | null;
  role?: string | null;
  banReason?: string | null;
  banExpires?: Date | null;
};

interface SessionData {
  user: User;
  session: {
    activeOrganizationId?: string | null;
  };
};

interface UserOrg {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface Member {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  user: UserOrg;
  createdAt: Date;
}

interface Invitation {
  id: string;
  email: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  expiresAt: Date;
  organizationId: string;
  role: string;
  inviterId: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  createdAt: Date;
  metadata: any | null;
  invitations: Invitation[];
  members: Member[];
}

export type {
  User,
  SessionData,
  UserOrg,
  Member,
  Invitation,
  Organization
}