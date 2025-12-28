"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MapPin, Users, Search, Filter, ArrowRight } from "lucide-react"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "All Events" },
    { value: "workshop", label: "Workshops" },
    { value: "retreat", label: "Retreats" },
    { value: "fellowship", label: "Fellowship" },
    { value: "service", label: "Service Projects" },
    { value: "study", label: "Bible Studies" },
  ]

  const events = [
    {
      id: 1,
      title: "Spring Spiritual Retreat",
      category: "retreat",
      date: "2024-04-15",
      time: "9:00 AM - 5:00 PM",
      location: "Ngong Hills Retreat Center", // Updated to Kenyan location
      description: "A day of reflection, prayer, and spiritual renewal in a beautiful mountain setting.",
      spots: 25,
      registered: 18,
      price: "Ksh 3,600",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Marriage Enrichment Workshop",
      category: "workshop",
      date: "2024-03-22",
      time: "7:00 PM - 9:00 PM",
      location: "CCMWA Main Building", // Updated organization name to CCMWA
      description: "Strengthen your marriage with practical tools and biblical wisdom.",
      spots: 20,
      registered: 12,
      price: "Free",
      image: "/couple-workshop.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Community Service Day",
      category: "service",
      date: "2024-03-30",
      time: "8:00 AM - 4:00 PM",
      location: "Kibera Community Center", // Updated to Kenyan location
      description: "Join us in serving our community by volunteering at the local food bank.",
      spots: 30,
      registered: 22,
      price: "Free",
      image: "/community-service.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "Young Adults Fellowship Night",
      category: "fellowship",
      date: "2024-03-28",
      time: "6:30 PM - 9:00 PM",
      location: "CCMWA Youth Center", // Updated organization name to CCMWA
      description: "Connect with other young adults through games, food, and meaningful conversation.",
      spots: 40,
      registered: 35,
      price: "Ksh 800",
      image: "/young-adults.jpg",
      featured: false,
    },
    {
      id: 5,
      title: "Women's Bible Study Intensive",
      category: "study",
      date: "2024-04-05",
      time: "9:00 AM - 12:00 PM",
      location: "CCMWA Conference Room", // Updated organization name to CCMWA
      description: "Deep dive into the book of Philippians with discussion and application.",
      spots: 15,
      registered: 8,
      price: "Ksh 2,000",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: 6,
      title: "Men's Prayer Breakfast",
      category: "fellowship",
      date: "2024-03-25",
      time: "7:00 AM - 8:30 AM",
      location: "CCMWA Fellowship Hall", // Updated organization name to CCMWA
      description: "Start your Saturday with fellowship, prayer, and a hearty breakfast.",
      spots: 25,
      registered: 20,
      price: "Ksh 640",
      image: "/mens-breakfast.jpg",
      featured: false,
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredEvents = events.filter((event) => event.featured)

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: "bg-blue-100 text-blue-800",
      retreat: "bg-green-100 text-green-800",
      fellowship: "bg-purple-100 text-purple-800",
      service: "bg-orange-100 text-orange-800",
      study: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Upcoming Events</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Join us for workshops, retreats, fellowship, and service opportunities that strengthen our community and
              deepen our faith.
            </p>
          </div>
        </section>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Featured Events</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={event.image || "/placeholder.svg?height=200&width=400"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-4 left-4 ${getCategoryColor(event.category)}`}>
                        {categories.find((c) => c.value === event.category)?.label}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.registered}/{event.spots} registered
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-primary">{event.price}</span>
                        <Button className="flex items-center gap-2">
                          Register Now
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-8 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* All Events */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">All Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(event.category)}>
                        {categories.find((c) => c.value === event.category)?.label}
                      </Badge>
                      <span className="text-sm font-semibold text-primary">{event.price}</span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.registered}/{event.spots} spots
                        </span>
                      </div>
                    </div>
                    <Button className="w-full flex items-center justify-center gap-2">
                      Register
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
