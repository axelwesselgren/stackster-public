"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  feedbackType: z.enum(["suggestion", "issue", "compliment", "other"]),
  rating: z.number().min(1).max(5).nullable(),
  feedback: z
    .string()
    .min(10, {
      message: "Feedback must be at least 10 characters.",
    })
    .max(500),
  email: z.string().email().optional().or(z.literal("")),
});
function FeedbackForm({
  className,
  children,
  onSubmit,
}: {
  className?: string;
  children?: React.ReactNode | ((formState: any) => React.ReactNode);
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedbackType: "suggestion",
      rating: null,
      feedback: "",
      email: "",
    },
  });

  const formState = form.formState;

  return (
    <Form {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="feedbackType"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="feedback-type">
                What kind of feedback do you have?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="feedback-type">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="issue">Issue or Problem</SelectItem>
                  <SelectItem value="compliment">Compliment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>How would you rate your experience?</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-10 w-10 rounded-full",
                        field.value === value &&
                          "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                      onClick={() => field.onChange(value)}
                    >
                      <Star
                        className={cn(
                          "h-5 w-5",
                          field.value === value ? "fill-current" : "fill-none"
                        )}
                      />
                      <span className="sr-only">Rate {value} stars</span>
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="feedback-message">Your feedback</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Textarea
                    id="feedback-message"
                    placeholder="Please share your thoughts, ideas, or concerns..."
                    rows={4}
                    {...field}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {field.value.length} / 500 characters
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="email" className="flex items-center gap-1">
                Email{" "}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Provide your email if you&apos;d like us to follow up with you.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        {typeof children === "function" ? children(formState) : children}
      </form>
    </Form>
  );
}

export { FeedbackForm };
