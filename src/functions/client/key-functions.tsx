import { createKey, deleteKey, linkKey, showKey } from "@/actions/keys";
import { useAPIHandler } from "@/hooks/use-api-handler";
import { useToast } from "@/hooks/use-toast";
import { StackComponent } from "@/types/component";
import { Key } from "@/types/key";

function useKeyFunctions() {
  const { toast } = useToast();
  const { handleFetch, defaultError } = useAPIHandler();

  async function createSecret({
    name,
    type,
    value,
    updateKey
  }: {
    name: string;
    type: string;
    value: string;
    updateKey: (key: Key) => void;
  }) {
    const { data } = await handleFetch({
      fn: async () =>
        await createKey({
          name,
          type,
          value,
        }),
      onSuccess: (data) => { if (data) updateKey(data) },
    });

    return data;
  }

  async function deleteSecret(key: Key, removeKey: (key: Key) => void) {
    await handleFetch({
      fn: async () => await deleteKey(key.id),
      onSuccess: () => removeKey(key),
    });
  }

  async function toggleKeyVisibility(key: Key, updateKey: (key: Key) => void) {
    if (!key.visibility && !key.value) {
      await handleFetch({
        fn: async () => await showKey(key.id),
        onSuccess: (data) => {
          key.visibility = true;
          key.value = data;

          updateKey(key);
        },
      });
    } else {
      key.visibility = !key.visibility;
      return updateKey(key);
    }
  }

  async function handleLinking({
    keyId,
    component,
  }: {
    keyId: string;
    component: StackComponent;
  }) {
    if (!keyId || !component) {
      toast({
        title: defaultError,
        description: "Key or component not supplied",
      });

      return false;
    }

    await handleFetch({ fn: async () => await linkKey(keyId, component.id) });
  }

  return {
    toggleKeyVisibility,
    handleLinking,
    createSecret,
    deleteSecret,
  };
}

/*
function updateKeys(keys: Key[], index: number, updatedKey: Partial<Key>): Key[] {
  const updatedKeys = [...keys];

  updatedKeys[index] = {
    ...updatedKeys[index],
    ...updatedKey
  };

  return updatedKeys;
}
*/

export { useKeyFunctions };
