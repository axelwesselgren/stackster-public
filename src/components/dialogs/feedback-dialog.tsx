"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Send, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeedbackForm } from "@/components/forms/feedback-form";

function FeedbackDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "w-full cursor-pointer",
          buttonVariants({ variant: "ghost", size: "sm" })
        )}
      >
        <div className="flex flex-row gap-2 h-full w-full items-center justify-start">
          <Send className="h-4 w-4" />
          <span>Feedback</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Share your feedback</DialogTitle>
          <DialogDescription>
            Help us improve our product by sharing your thoughts and
            suggestions.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-2">
              <ThumbsUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">
              Thank you for your feedback!
            </h3>
            <p className="text-muted-foreground">
              Your input helps us improve our product and services.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setIsSubmitted(false)}
            >
              Submit another feedback
            </Button>
          </div>
        ) : (
          <FeedbackForm onSubmit={handleSubmit} className="space-y-4">
            {(formState) => (
              <DialogFooter className="pt-2">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || !formState.isValid || formState.isSubmitting
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Submit feedback
                    </span>
                  )}
                </Button>
              </DialogFooter>
            )}
          </FeedbackForm>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { FeedbackDialog };
