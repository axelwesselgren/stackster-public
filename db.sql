CREATE TABLE IF NOT EXISTS "account" (
    "id" TEXT NOT NULL PRIMARY KEY, 
    "accountId" TEXT NOT NULL, 
    "providerId" TEXT NOT NULL, 
    "userId" TEXT NOT NULL REFERENCES "user" ("id"), 
    "accessToken" TEXT, 
    "refreshToken" TEXT, 
    "idToken" TEXT, 
    "accessTokenExpiresAt" TIMESTAMP, 
    "refreshTokenExpiresAt" TIMESTAMP, 
    "scope" TEXT, 
    "password" TEXT, 
    "createdAt" TIMESTAMP NOT NULL, 
    "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "invitation" (
    "id" TEXT NOT NULL PRIMARY KEY, 
    "organizationId" TEXT NOT NULL REFERENCES "organization" ("id") ON DELETE CASCADE, 
    "email" TEXT NOT NULL, 
    "role" TEXT, 
    "status" TEXT NOT NULL, 
    "expiresAt" TIMESTAMP NOT NULL, 
    "inviterId" TEXT NOT NULL REFERENCES "user" ("id")
);

CREATE TABLE IF NOT EXISTS "member" (
    "id" TEXT NOT NULL PRIMARY KEY, 
    "organizationId" TEXT NOT NULL REFERENCES "organization" ("id") ON DELETE CASCADE, 
    "userId" TEXT NOT NULL REFERENCES "user" ("id"), 
    "role" TEXT NOT NULL, 
    "createdAt" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "organization" (
    "id" TEXT NOT NULL PRIMARY KEY, 
    "name" TEXT NOT NULL, 
    "slug" TEXT NOT NULL UNIQUE, 
    "logo" TEXT, 
    "createdAt" TIMESTAMP NOT NULL, 
    "metadata" TEXT
);

CREATE TABLE IF NOT EXISTS "session" (
    "id" TEXT NOT NULL PRIMARY KEY, 
    "expiresAt" TIMESTAMP NOT NULL, 
    "token" TEXT NOT NULL UNIQUE, 
    "createdAt" TIMESTAMP NOT NULL, 
    "updatedAt" TIMESTAMP NOT NULL, 
    "ipAddress" TEXT, 
    "userAgent" TEXT, 
    "userId" TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE, 
    "impersonatedBy" TEXT, 
    "activeOrganizationId" TEXT
);

CREATE TABLE IF NOT EXISTS "user" (
    "id" TEXT NOT NULL PRIMARY KEY, 
    "name" TEXT NOT NULL, 
    "email" TEXT NOT NULL UNIQUE, 
    "emailVerified" BOOLEAN NOT NULL, 
    "image" TEXT, 
    "createdAt" TIMESTAMP NOT NULL, 
    "updatedAt" TIMESTAMP NOT NULL, 
    "role" TEXT, 
    "banned" BOOLEAN, 
    "banReason" TEXT, 
    "banExpires" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "verification" (
    "id" TEXT NOT NULL PRIMARY KEY, 
    "identifier" TEXT NOT NULL, 
    "value" TEXT NOT NULL, 
    "expiresAt" TIMESTAMP NOT NULL, 
    "createdAt" TIMESTAMP, 
    "updatedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "project" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orgId" TEXT NOT NULL REFERENCES "organization" ("id") ON DELETE CASCADE,
    "isPublic" BOOLEAN NOT NULL DEFAULT FALSE,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "stack_component" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "projectId" TEXT NOT NULL REFERENCES "project" ("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "setup" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "discover_component" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "keys" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orgId" UUID NOT NULL REFERENCES "organization" ("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "value" BYTEA NOT NULL,
    "encryptMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "links" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "componentId" UUID NOT NULL REFERENCES "stack_component" ("id") ON DELETE CASCADE,
    "keyId" UUID NOT NULL REFERENCES "keys" ("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_project_updated_at
BEFORE UPDATE ON "project"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE TRIGGER update_stack_component_updated_at
BEFORE UPDATE ON "stack_component"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE EXTENSION IF NOT EXISTS pgcrypto;