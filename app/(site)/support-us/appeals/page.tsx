"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AppealsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Current Appeals</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Join us in responding to urgent needs in our community and around the world.
            </p>
          </div>
        </section>

        {/* Appeals Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Ongoing Appeals</h2>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-6">
                  Your generous support helps us respond to urgent needs in our community and around 
                  the world. Each appeal represents an opportunity to demonstrate Christ's love in action.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle>Local Community Outreach</CardTitle>
                      <CardDescription>
                        Supporting families in crisis in our local community
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        Providing counseling services and practical support to families facing financial hardship.
                      </p>
                      <div className="mt-auto">
                        <Button className="w-full">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle>Disaster Relief Fund</CardTitle>
                      <CardDescription>
                        Emergency response to natural disasters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        Providing immediate counseling and soul-care to communities affected by natural disasters.
                      </p>
                      <div className="mt-auto">
                        <Button className="w-full">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle>Training Program Expansion</CardTitle>
                      <CardDescription>
                        Equipping more counselors with biblical principles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        Expanding our training programs to equip more counselors with Christ-centered approaches.
                      </p>
                      <div className="mt-auto">
                        <Button className="w-full">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/5 rounded-lg p-6 my-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">How You Can Help</h3>
                  <p className="text-muted-foreground mb-4">
                    Your support makes a difference in real lives and communities. Here are several ways 
                    you can partner with us in our appeals:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Make a financial contribution to a specific appeal</li>
                    <li>Volunteer your time and skills</li>
                    <li>Pray for those affected by these situations</li>
                    <li>Share information about our appeals with your network</li>
                    <li>Organize a fundraising event in your community</li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button asChild>
                  <Link href="/support-us">Back to Support Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}