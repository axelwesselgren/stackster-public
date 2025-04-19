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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  projectName: z
    .string()
    .nonempty()
    .max(25),
  description: z
    .string()
    .max(50),
});

export function ProjectForm({
  createProject,
}: {
  createProject: (values: { name: string; description: string }) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>)  {
    setLoading(true);

    await createProject({ 
      name: values.projectName, 
      description: values.description 
    });

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center h-full p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Create a New Project</CardTitle>
            <CardDescription>Fill in the details to set up your new project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} required placeholder="The name of your project"/>
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
                      placeholder="A brief description of your project"
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
                "Create Project"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      </form>
    </Form>
  );
}
