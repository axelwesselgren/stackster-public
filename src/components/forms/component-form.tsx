"use client";

import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z
    .string()
    .nonempty()
    .max(25),
  description: z
    .string()
    .max(50),
  instructions: z
    .string()
    .max(500),
});

export function ComponentForm({
  createComponent,
}: {
  createComponent: (values: { name: string; description: string, instructions: string }) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>)  {
    setLoading(true);
    
    await createComponent(values);

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center h-full p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Create a New Component</CardTitle>
            <CardDescription>Fill in the details to set up your new component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} required placeholder="The name of your component eg. Redis, PostgresSQL"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      placeholder="A brief description of your component"
                      className="min-h-[100px] max-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      placeholder="Some instructions for your component eg. how to set it up, how to use it"
                      className="min-h-[100px] max-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                >
                  <LoaderCircle />
                </motion.div>
              ) : (
                "Create Component"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      </form>
    </Form>
  );
}