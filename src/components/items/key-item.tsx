import { useKeyFunctions } from "@/functions/client/key-functions";
import { useNativeFunctions } from "@/functions/client/native-functions";
import { Key } from "@/types/key";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";

function KeyItem({
  keyItem,
  updatedKey
}: {
  keyItem: Key;
  keys: Key[];
  updatedKey: (key: Key) => void;
}) {
  const [loading, setLoading] = useState(false);

  const { copyToClipboard } = useNativeFunctions();
  const { toggleKeyVisibility } = useKeyFunctions();

  return (
    <div key={keyItem.id} className="p-3 border rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{keyItem.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type={keyItem.visibility ? "text" : "password"}
          value={keyItem.value || ""}
          readOnly
          className="bg-muted"
        />
        <Button
          variant="ghost"
          size="sm"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await toggleKeyVisibility(keyItem, updatedKey);
            setLoading(false);
          }}
        >
          {keyItem.visibility ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={loading || !keyItem.value}
          onClick={() => copyToClipboard(keyItem.value)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export { KeyItem };
