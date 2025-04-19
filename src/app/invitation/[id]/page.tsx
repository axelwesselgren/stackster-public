"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/auth-client";
import { toast, useToast } from "@/hooks/use-toast";

export default function InvitePage() {
  const [invite, setInvite] = useState<any>(null);

  const params = useParams<{ id: string }>();

	const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    async function fetchInvite() {
      const { data: fetchedInvite, error } = await authClient.organization.getInvitation({
        query: {
          id: params.id,
        }
      });

      if (error) {
        switch (error.status) {
          default:
            toast({
              title: "Something went wrong",
              description: error.message
            });
        }

        return;
      }
      
      setInvite(fetchedInvite);
    }

    fetchInvite();
  }, [params.id]);

  if (isPending) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="h-full items-center justify-center flex min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Invitation</CardTitle>
            <CardDescription>
              You&apos;ve been invited to join our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            {session ? (
              <AuthenticatedView inviteId={params.id} />
            ) : (
              <NonAuthenticatedView inviteId={params.id} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AuthenticatedView({ inviteId }: { inviteId: string }) {
  const { toast } = useToast();

  const handleAccept = async () => {
		const { data, error } = await authClient.organization.acceptInvitation({
			invitationId: inviteId,
		});

    if (error) {
      toast({
        title: "Something went wrong",
        description: error.message,
      })
      return;
    }

    toast({
      title: "Invitation accepted",
      description: "You've joined the team successfully",
    });
	};
  const handleReject = () => {};

  return (
    <div className="space-y-4">
      <p className="text-lg">Join now to begin colaborating on projects</p>
      <div className="flex justify-center space-x-4">
        <Button onClick={handleAccept} className="w-full">
          Accept
        </Button>
        <Button onClick={handleReject} variant="outline" className="w-full">
          Reject
        </Button>
      </div>
    </div>
  );
}

function NonAuthenticatedView({ inviteId }: { inviteId: string }) {
  return (
    <div className="space-y-4">
      <p className="text-lg">
				Join now to begin colaborating on projects
      </p>
      <p className="text-sm text-gray-500">
				Please log in or create an account to accept this invitation
			</p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline">Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="h-full items-center justify-center flex min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <Skeleton className="h-4 w-4/6 mt-2" />
            <div className="flex justify-center space-x-4 mt-6">
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
