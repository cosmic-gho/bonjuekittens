"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, Star, Plus, Eye, Edit, Bell, BarChart3, PawPrint } from "lucide-react"
import Link from "next/link"
import AdminKittensTab from '@/components/admin-kittens-tab';
import AdminBreedsTab from '@/components/admin-breeds-tab';
import AdminInquiriesTab from '@/components/admin-inquiries-tab';
import AdminTestimonialsTab from '@/components/admin-testimonials-tab';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  const stats = {
    totalKittens: 12,
    availableKittens: 8,
    reservedKittens: 3,
    soldKittens: 1,
    pendingInquiries: 5,
    publishedTestimonials: 15,
    pendingTestimonials: 3,
  }

  const recentInquiries = [
    { id: 1, name: "John Smith", kitten: "Luna", date: "2024-01-15", status: "new" },
    { id: 2, name: "Sarah Johnson", kitten: "Max", date: "2024-01-14", status: "responded" },
    { id: 3, name: "Mike Chen", kitten: "Bella", date: "2024-01-13", status: "new" },
  ]

  const recentKittens = [
    { id: 1, name: "Luna", breed: "Persian", status: "available", price: "$1,200" },
    { id: 2, name: "Max", breed: "Maine Coon", status: "available", price: "$800" },
    { id: 3, name: "Oliver", breed: "Ragdoll", status: "reserved", price: "$1,100" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-background border-b shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Bonjuekittens
                </span>
              </Link>
              <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/50">
                Admin Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-50 dark:bg-red-900/200 rounded-full"></span>
              </Button>
              <Link href="/">
                <Button variant="outline" className="hover:bg-purple-50 dark:bg-purple-900/20 hover:border-purple-200 dark:border-purple-800/50">
                  View Website
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="hover:bg-red-50 dark:bg-red-900/20 hover:text-red-600 dark:text-red-400"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {session?.user?.name || 'Admin'}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your cattery today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/90">Total Kittens</CardTitle>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <PawPrint className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalKittens}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.availableKittens} available, {stats.reservedKittens} reserved
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/90">Pending Inquiries</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.pendingInquiries}</div>
              <p className="text-xs text-muted-foreground mt-1">Require response</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/90">Testimonials</CardTitle>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.publishedTestimonials}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.pendingTestimonials} pending approval</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/90">This Month</CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <BarChart3 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$3,200</div>
              <p className="text-xs text-muted-foreground mt-1">Revenue from sales</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-secondary/40 p-1 rounded-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="kittens" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Kittens
            </TabsTrigger>
            <TabsTrigger value="breeds" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Breeds
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Inquiries */}
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground">Recent Inquiries</CardTitle>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/20 transition-colors duration-200">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground">Interested in {inquiry.kitten}</p>
                          <p className="text-xs text-muted-foreground mt-1">{inquiry.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={inquiry.status === "new" ? "default" : "secondary"}
                            className={inquiry.status === "new" ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/50" : "bg-secondary/40 text-foreground border-border"}
                          >
                            {inquiry.status}
                          </Badge>
                          <Button size="sm" variant="ghost" className="hover:bg-blue-50 dark:bg-blue-900/20 hover:text-blue-600 dark:text-blue-400">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Kittens */}
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground">Recent Kittens</CardTitle>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Kitten
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentKittens.map((kitten) => (
                      <div key={kitten.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/20 transition-colors duration-200">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{kitten.name}</p>
                          <p className="text-sm text-muted-foreground">{kitten.breed}</p>
                          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">{kitten.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={kitten.status === "available" ? "default" : "secondary"}
                            className={kitten.status === "available" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/50" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50"}
                          >
                            {kitten.status}
                          </Badge>
                          <Button size="sm" variant="ghost" className="hover:bg-purple-50 dark:bg-purple-900/20 hover:text-purple-600 dark:text-purple-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kittens">
            <AdminKittensTab />
          </TabsContent>

          <TabsContent value="breeds">
            <AdminBreedsTab />
          </TabsContent>

          <TabsContent value="inquiries">
            <AdminInquiriesTab />
          </TabsContent>

          <TabsContent value="testimonials">
            <AdminTestimonialsTab />
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Site Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">General Settings</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-foreground/90 mb-1">Site Name</label>
                          <input type="text" defaultValue="Bonjuekittens" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground/90 mb-1">Contact Email</label>
                          <input type="email" defaultValue="admin@bonjuekittens.com" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground/90 mb-1">Phone Number</label>
                          <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Notification Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground/90">Email notifications for new inquiries</span>
                          <input type="checkbox" defaultChecked className="rounded border-border text-purple-600 dark:text-purple-400 focus:ring-purple-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground/90">SMS notifications for urgent matters</span>
                          <input type="checkbox" className="rounded border-border text-purple-600 dark:text-purple-400 focus:ring-purple-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground/90">Weekly summary reports</span>
                          <input type="checkbox" defaultChecked className="rounded border-border text-purple-600 dark:text-purple-400 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
