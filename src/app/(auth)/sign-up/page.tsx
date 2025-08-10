"use client";

import { SignUp } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck } from "lucide-react";

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<"interviewer" | "candidate" | null>(null);

  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Join VirtueHire
            </h1>
            <p className="text-muted-foreground">Choose your account type to get started</p>
          </div>

          <div className="grid gap-4">
            <Card 
              className="cursor-pointer hover:border-primary transition-colors group"
              onClick={() => setSelectedRole("interviewer")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">I'm an Interviewer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Conduct interviews, manage candidates, and evaluate performance
                </p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary transition-colors group"
              onClick={() => setSelectedRole("candidate")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">I'm a Candidate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Join interviews, showcase your skills, and land your dream job
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Button
            variant="ghost"
            onClick={() => setSelectedRole(null)}
            className="mb-4"
          >
            ← Back to role selection
          </Button>
          <h1 className="text-2xl font-bold">
            Sign up as {selectedRole === "interviewer" ? "an Interviewer" : "a Candidate"}
          </h1>
        </div>

        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              card: "shadow-lg",
            },
          }}
          unsafeMetadata={{ role: selectedRole }}
          afterSignUpUrl="/dashboard"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}