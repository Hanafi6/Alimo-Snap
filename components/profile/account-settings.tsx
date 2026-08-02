"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Shield, Bell, Key, Settings, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SessionData } from "@/components/navbar/NavBarClient";

interface PropsProfile {
    session: SessionData | null;
}

export default function ProfilePage({ session }: PropsProfile) {
    const user = session?.user;

    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        securityAlerts: true,
    });

    return (
        <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
            {/* 🚀 PAGE HEADER */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-border">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
                        User Profile
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        View your personal information and quick options.
                    </p>
                </div>

                {/* زر التوجيه للإعدادات الرئيسية */}
                <Button asChild className="gap-2 font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/settings">
                        <Settings className="w-4 h-4" />
                        Edit Profile in Settings
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 👤 LEFT COLUMN: AVATAR CARD */}
                <div className="space-y-6">
                    <Card className="border-border bg-card shadow-sm">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto relative group w-24 h-24 mb-3">
                                <Avatar className="w-24 h-24 border-2 border-border shadow-md">
                                    <AvatarImage src={user?.image || undefined} alt={user?.name || "User Avatar"} />
                                    <AvatarFallback className="bg-accent text-foreground font-bold text-xl">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle className="text-xl font-bold text-foreground">
                                {user?.name || "Anonymous User"}
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground">
                                {user?.email || "No email provided"}
                            </CardDescription>

                            <div className="pt-3">
                                <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/10 text-primary font-semibold capitalize">
                                    <Shield className="w-3 h-3" /> {user?.role || "User"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <Button asChild variant="outline" className="w-full text-xs font-semibold border-border gap-2">
                                <Link href="/settings">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Manage Account Settings
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* ⚙️ RIGHT COLUMN: INFORMATION & QUICK TOGGLES */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 1. PERSONAL INFORMATION (READ ONLY - TIE TO SETTINGS) */}
                    <Card className="border-border bg-card shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <div>
                                <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                                    <User className="w-5 h-5 text-purple-600" />
                                    <span>Personal Information</span>
                                </div>
                                <CardDescription className="text-xs mt-1">
                                    Your identity details linked to your active account session.
                                </CardDescription>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="text-xs text-purple-600 hover:text-purple-700">
                                <Link href="/settings">Edit</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full-name">Full Name</Label>
                                    <Input
                                        id="full-name"
                                        value={user?.name || ""}
                                        disabled
                                        className="border-border bg-muted/50 text-foreground cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            value={user?.email || ""}
                                            disabled
                                            className="border-border bg-muted/50 text-foreground pl-9 cursor-not-allowed"
                                        />
                                        <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. NOTIFICATIONS PREFERENCES */}
                    <Card className="border-border bg-card shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                                <Bell className="w-5 h-5 text-purple-600" />
                                <span>Preferences & Notifications</span>
                            </div>
                            <CardDescription className="text-xs">
                                Control how and when you receive system alerts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-semibold">Email Notifications</Label>
                                    <p className="text-xs text-muted-foreground">Receive updates about orders and features.</p>
                                </div>
                                <Switch
                                    checked={notifications.emailNotifications}
                                    onCheckedChange={(val) => setNotifications((prev) => ({ ...prev, emailNotifications: val }))}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-semibold">Security Alerts</Label>
                                    <p className="text-xs text-muted-foreground">Get notified about logins from new devices.</p>
                                </div>
                                <Switch
                                    checked={notifications.securityAlerts}
                                    onCheckedChange={(val) => setNotifications((prev) => ({ ...prev, securityAlerts: val }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. SECURITY */}
                    <Card className="border-border bg-card shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                                <Key className="w-5 h-5 text-purple-600" />
                                <span>Security</span>
                            </div>
                            <CardDescription className="text-xs">
                                Manage authentication and password updates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-foreground">Password & Auth Options</p>
                                <p className="text-xs text-muted-foreground">Update your passkey or authentication credentials.</p>
                            </div>
                            <Button asChild variant="outline" size="sm" className="border-border">
                                <Link href="/settings">Security Settings</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}