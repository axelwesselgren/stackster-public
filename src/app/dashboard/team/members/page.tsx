"use client"

import { Trash2, UserPlus, Send, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authClient } from "@/auth-client"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function UserManagement() {
  const [organization, setOrganization] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"member" | "admin" | "owner">("member");

  const { toast } = useToast();

  useEffect(() => {
    authClient.organization
      .getFullOrganization()
      .then((response) => {
        setOrganization(response.data) 
        console.log(response.data)
      })
      .catch((error) => setError(error));
  }, []);

  async function inviteMember() {
    setLoading(true);

    const { data, error } = await authClient.organization.inviteMember({
      email,
      role,
    });

    setEmail("");
    setRole("member");
    setLoading(false);
  }

  async function removeMember(email: string) {
    const { data, error } = await authClient.organization.removeMember({
      memberIdOrEmail: email,
    });

    if (error) {
      toast({
        title: "Something went wrong",
        description: error.message,
      });
      return;
    }

    setOrganization((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.user.email !== email),
    }));
    toast({
      title: "Member removed",
      description: "The member has been removed from the organization",
    });
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Manage your team members and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite member
                </Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>Invite new member</DialogTitle>
                  <DialogDescription>
                    Invite a new member to help you collobrate on your projects.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      onValueChange={(value) => setRole(value as "member" | "admin" | "owner")} 
                      value={role}
                    >
                        <SelectTrigger className="w-full col-span-3">
                            <SelectValue placeholder="Choose type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="owner">Owner</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={inviteMember}>
                    {loading ? (
                      <LoaderCircle className="animate-spin" size={24} />
                    ) : (
                      "Invite"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organization?.members?.map((member) => (
                <TableRow key={member.user.name}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={member.user.avatar} alt={member.user.name} />
                      <AvatarFallback>{member.user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.user.name}</TableCell>
                  <TableCell>{member.user.email}</TableCell>
                  <TableCell>
                    <Select defaultValue={member.role}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="owner">Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => removeMember(member.user.email)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
          <CardDescription>Invited users who haven&apos;t accepted their invitation yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organization?.invitations?.map((user) => (
                user.status === "pending" && (
                  <TableRow key={user.email}>
                    <TableCell>
                      <Avatar>
                        <AvatarFallback className={cn("text-white")}>
                          {user.email.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        <Send className="mr-2 h-4 w-4" />
                        Resend invite
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove {user.email}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

