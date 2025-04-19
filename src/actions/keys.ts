"use server";

import { Key, KeyCreate } from "@/types/key";
import {
  insertKey,
  decryptKey,
  removeKey,
  getKeysOrganization,
  linkKeyComponent,
  getKeysComponent,
} from "@/functions/db/keys";
import { APIResponse } from "@/types/response";
import { withAuth } from "@/helper/with-auth";

const createKey = async ({
  name,
  type,
  value,
}: KeyCreate): Promise<APIResponse<Key>>  =>
  withAuth<Key>(async (orgId) => {
    if (!name || !type || !value) {
      return {
        key: null,
        message: "Missing required fields",
        code: 400,
      };
    }

    const key = await insertKey({
      name,
      type,
      value,
      orgId,
    });

    return {
      data: key,
      message: "Key created successfully",
      code: 200,
    };
  });

const showKey = async (keyId: string): Promise<APIResponse<string>> =>
  withAuth<string>(async (orgId) => {
    if (!keyId) {
      return {
        data: null,
        message: "Missing required fields",
        code: 400,
      };
    }

    const decryptedValue = await decryptKey(keyId);

    return {
      data: decryptedValue.value,
      message: "Key decrypted successfully",
      code: 200,
    };
  });

const deleteKey = async (keyId: string): Promise<APIResponse<null>> =>
  withAuth<null>(async (orgId) => {
    if (!keyId) {
      return {
        data: null,
        message: "Missing required fields",
        code: 400,
      };
    }

    await removeKey(keyId);

    return {
      data: null,
      message: "Key deleted successfully",
      code: 200,
    };
  });

const fetchKeys = async (): Promise<APIResponse<Key[]>> =>
  withAuth<Key[]>(async (orgId) => {
    const keys = await getKeysOrganization(orgId);

    return {
      data: keys,
      message: "Keys fetched successfully",
      code: 200,
    };
  });

const linkKey = async (keyId: string, componentId: string): Promise<APIResponse<null>> =>
  withAuth<null>(async (orgId) => {
    if (!keyId || !componentId) {
      return {
        data: null,
        message: "Missing required fields",
        code: 400,
      };
    }

    await linkKeyComponent(keyId, componentId);

    return {
      data: null,
      message: "Key linked successfully",
      code: 200,
    };
  });

const fetchKeysComponent = async (componentId: string): Promise<APIResponse<Key[]>> =>
  withAuth<Key[]>(async (ordId) => {
    if (!componentId) {
      return {
        data: [],
        message: "Missing required fields",
        code: 400,
      }
    }

    const keys = await getKeysComponent(componentId);

    return {
      data: keys,
      message: "Keys retrieved successfully",
      code: 200
    }
  });

export {
  createKey,
  showKey,
  deleteKey,
  fetchKeys,
  linkKey,
  fetchKeysComponent
}