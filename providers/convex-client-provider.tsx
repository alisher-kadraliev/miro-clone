"use client";
import { ClerkProvider, SignInButton, SignOutButton, useAuth, UserButton } from "@clerk/nextjs";

import { ConvexProviderWithClerk } from "convex/react-clerk";

import { ConvexReactClient, AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import Loading from "@/components/auth/loading";
interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return <ClerkProvider>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Authenticated>
                {children}
                <UserButton />
                <SignOutButton />
            </Authenticated>
            <Unauthenticated>
                <SignInButton />
            </Unauthenticated>
            <AuthLoading>
                <Loading />
            </AuthLoading>
        </ConvexProviderWithClerk>
    </ClerkProvider>
}