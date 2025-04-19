"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useKeys } from "@/hooks/use-keys";
import { LoadingScreen } from "@/components/states/loading-screen";
import { CreateKeyDialog } from "@/components/dialogs/create-key-dialog";
import { KeyRow } from "@/components/items/key-row";

export default function Vault() {
  const { 
    keys,
    updateKey,
    isPending,
    removeKey
  } = useKeys();

  return (
    <div>
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Secure Vault
        </h1>
        <div className="flex justify-end mb-4">
          <CreateKeyDialog updateKey={updateKey} />
        </div>

        <div className="bg-card overflow-hidden">
          {isPending ? (
            <LoadingScreen />
          ) : (
            <ScrollArea className="h-[400px] border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="text-right">Show</TableHead>
                    <TableHead className="text-right">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                  <TableBody>
                    {keys.map((key) => (
                      <KeyRow 
                        keyItem={key} 
                        key={key.id} 
                        updateKey={updateKey}
                        removeKey={removeKey}
                      />
                    ))}
                  </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  )
}