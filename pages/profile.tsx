import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen-minus-header-footer py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Profile Information</CardTitle>
            <CardDescription className="mt-2">Update your account details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" defaultValue="Demo" />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" defaultValue="User" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user.username} disabled />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" placeholder="+1 (555) 000-0000" />
            </div>

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold">Change Password</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
