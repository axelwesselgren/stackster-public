import { Key as KeyType } from "@/types/key";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Key as KeyIcon, File, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKeyFunctions } from "@/functions/client/key-functions";

function KeyRow({ 
  keyItem, 
  updateKey,
  removeKey
}: { 
  keyItem: KeyType;
  updateKey: (key: KeyType) => void;
  removeKey: (key: KeyType) => void;
}) {
  const { 
    toggleKeyVisibility,
    deleteSecret 
  } = useKeyFunctions();

  return (
    <TableRow>
      <TableCell>
        {keyItem.type === "api" ? (
          <KeyIcon className="h-4 w-4 text-blue-500 ml-2" />
        ) : (
          <File className="h-4 w-4 text-green-500 ml-2" />
        )}
      </TableCell>
      <TableCell className="font-medium">{keyItem.name}</TableCell>
      <TableCell>
        <Input
          type={keyItem.visibility ? "text" : "password"}
          value={keyItem.value || ""}
          readOnly
          className="bg-muted"
        />
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleKeyVisibility(keyItem, updateKey)}
        >
          {keyItem.visibility ? (
            <Eye className="h-4 w-4 text-blue-500" />
          ) : (
            <EyeOff className="h-4 w-4 text-blue-500" />
          )}
        </Button> 
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteSecret(keyItem, removeKey)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export { KeyRow };