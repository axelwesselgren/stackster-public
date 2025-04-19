import { Key, KeyCreate } from "@/types/key";
import { executeQuery } from "@/helper/execute";

export const insertKey = async ({
  name,
  type,
  value,
  orgId,
}: KeyCreate) => {

  return executeQuery(async (sql) => {
    const [key] = await sql`
      INSERT INTO "keys"
      ("value", "encryptMethod", "name", "type", "orgId")
      VALUES (
          pgp_sym_encrypt(${value}, ${process.env.ENCRYPT_KEY}),
          ${process.env.ENCRYPT_METHOD},
          ${name},
          ${type},
          ${orgId}
      )
      RETURNING "id", "createdAt", "updatedAt", "name", "type", "description";
    `;

    return key as Key;
  });
};

export const getKeysComponent = async (componentId: string) => {

  return executeQuery(async (sql) => {
    const keys = await sql`
      SELECT "keys"."id", "keys"."name", "keys"."type", "keys"."description", "keys"."createdAt", "keys"."updatedAt", "keys"."orgId"
      FROM "keys"
      JOIN "links" ON "keys"."id" = "links"."keyId"
      JOIN "stack_component" ON "links"."componentId" = "stack_component"."id"
      WHERE "stack_component"."id" = ${componentId};
    `;

    return keys as Key[];
  });
};

export const getKeysOrganization = async (orgId: string) => {
  return executeQuery(async (sql) => {
    const keys = await sql`
      SELECT "id", "name", "type", "description", "createdAt", "updatedAt", "orgId"
      FROM "keys"
      WHERE "orgId" = ${orgId};
    `;

    return keys as Key[];
  });
};

export const decryptKey = async (id: string) => {
  return executeQuery(async (sql) => {
    const [value] = await sql`
      SELECT pgp_sym_decrypt("value", ${process.env.ENCRYPT_KEY}) AS "value"
      FROM "keys"
      WHERE "id" = ${id};
    `;

    return value;
  });
};

export const removeKey = async (id: string) => {
  return executeQuery(async (sql) => {
    await sql`
      DELETE FROM "keys"
      WHERE "id" = ${id};
    `;
  });
};

export const linkKeyComponent = async (keyId: string, componentId: string) => {
  return executeQuery(async (sql) => {
    await sql`
      INSERT INTO "links"
      ("keyId", "componentId")
      VALUES (${keyId}, ${componentId});
    `;
  });
};