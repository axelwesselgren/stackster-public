import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LifeBuoy,
  Mail,
  MessageSquare,
  FileText,
  ExternalLink,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

function SupportDialog() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <Dialog>
      <DialogTrigger className={cn("w-full cursor-pointer", buttonVariants({ variant: "ghost", size: "sm" }))}>
        <div className="flex flex-row gap-2 h-full w-full items-center justify-start">
          <LifeBuoy className="h-4 w-4" />
          <span>Support</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">How can we help you?</DialogTitle>
          <DialogDescription>Get support from our team or browse through our resources.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="contact" className="mt-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-2">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium">Message Sent</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <Button variant="outline" className="mt-2" onClick={() => setIsSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    How can we help?
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or question..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <button className="flex w-full items-center justify-between font-medium">
                  <span>How do I reset my password?</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="mt-2 text-sm text-muted-foreground">
                  Go to the login page and click on "Forgot password?" to receive a password reset link via email.
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <button className="flex w-full items-center justify-between font-medium">
                  <span>How do I upgrade my subscription?</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="mt-2 text-sm text-muted-foreground">
                  Navigate to Settings → Billing to view and manage your subscription options.
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <button className="flex w-full items-center justify-between font-medium">
                  <span>Can I cancel my subscription anytime?</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="mt-2 text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time from the Settings → Billing page. Your access will
                  continue until the end of your billing period.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="#" className="inline-flex items-center text-sm font-medium text-primary">
                View all FAQs
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="#"
                className="flex flex-col items-center rounded-lg border p-4 text-center hover:bg-muted/50 transition-colors"
              >
                <BookOpen className="mb-2 h-6 w-6" />
                <h3 className="text-sm font-medium">Documentation</h3>
                <p className="text-xs text-muted-foreground mt-1">Browse our detailed guides and documentation</p>
              </Link>

              <Link
                href="#"
                className="flex flex-col items-center rounded-lg border p-4 text-center hover:bg-muted/50 transition-colors"
              >
                <FileText className="mb-2 h-6 w-6" />
                <h3 className="text-sm font-medium">Tutorials</h3>
                <p className="text-xs text-muted-foreground mt-1">Step-by-step tutorials for common tasks</p>
              </Link>

              <Link
                href="#"
                className="flex flex-col items-center rounded-lg border p-4 text-center hover:bg-muted/50 transition-colors"
              >
                <HelpCircle className="mb-2 h-6 w-6" />
                <h3 className="text-sm font-medium">Knowledge Base</h3>
                <p className="text-xs text-muted-foreground mt-1">Find answers to common questions</p>
              </Link>

              <Link
                href="#"
                className="flex flex-col items-center rounded-lg border p-4 text-center hover:bg-muted/50 transition-colors"
              >
                <Mail className="mb-2 h-6 w-6" />
                <h3 className="text-sm font-medium">Email Support</h3>
                <p className="text-xs text-muted-foreground mt-1">Contact our support team via email</p>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="text-xs text-muted-foreground">
            Need urgent help? Contact us at{" "}
            <a href="mailto:support@example.com" className="text-primary hover:underline">
              support@example.com
            </a>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { SupportDialog };
