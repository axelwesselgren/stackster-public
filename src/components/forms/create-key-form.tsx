import { Input } from "@/components/ui/input";
import {
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useKeyFunctions } from "@/functions/client/key-functions";
import { Key } from "@/types/key";

enum KeyTypeEnum {
  API = "api",
  ENV = "env",
}

const formSchema = z.object({
  name: z.string().nonempty().max(25),
  value: z.string().nonempty().max(50),
  type: z.nativeEnum(KeyTypeEnum),
});

function CreateKeyForm({ updateKey }: { updateKey: (key: Key) => void }) {
  const [loading, setLoading] = useState(false);

  const { createSecret } = useKeyFunctions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
      type: KeyTypeEnum.API,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    await createSecret({
      name: values.name,
      type: values.type,
      value: values.value,
      updateKey
    });

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add New Secret</DialogTitle>
          <DialogDescription>
            Enter the details of your API key or env
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} required placeholder="Name of the key"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input {...field} required placeholder="Value of the key"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full col-span-3">
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="api">API</SelectItem>
                        <SelectItem value="env">Environment Variable</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin" size={24} />
            ) : (
              "Add Secret"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export { CreateKeyForm };