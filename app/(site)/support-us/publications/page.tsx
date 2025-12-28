"use client"



import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PublicationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Publications</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Resources to support your journey of faith and spiritual growth.
            </p>
          </div>
        </section>

        {/* Publications Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Ministry Resources</h2>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-6">
                  Our publications are designed to support your journey of faith and spiritual growth. 
                  Whether you're seeking personal encouragement or resources for counseling and discipleship, 
                  we have materials to meet your needs.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                  <Card className="flex flex-col">
                    <div className="aspect-[2/3] bg-muted rounded-t-lg mx-6 mt-6" />
                    <CardHeader>
                      <CardTitle>Soul Care Journal</CardTitle>
                      <CardDescription>Quarterly publication</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        Articles on biblical counseling, spiritual formation, and practical wisdom.
                      </p>
                      <Button variant="outline" className="w-full">Subscribe</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="flex flex-col">
                    <div className="aspect-[2/3] bg-muted rounded-t-lg mx-6 mt-6" />
                    <CardHeader>
                      <CardTitle>Training Manuals</CardTitle>
                      <CardDescription>Educational resources</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        Comprehensive guides for counselors and ministry leaders.
                      </p>
                      <Button variant="outline" className="w-full">View Collection</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="flex flex-col">
                    <div className="aspect-[2/3] bg-muted rounded-t-lg mx-6 mt-6" />
                    <CardHeader>
                      <CardTitle>Digital Resources</CardTitle>
                      <CardDescription>Free downloads</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">
                        Bible studies, prayer guides, and counseling resources.
                      </p>
                      <Button variant="outline" className="w-full">Browse Resources</Button>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Featured Publications</h3>
                
                <div className="grid md:grid-cols-2 gap-8 my-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>"Healing Through Christ" Study Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        A 12-week study guide exploring how biblical principles can bring healing 
                        to common life struggles.
                      </p>
                      <Button variant="outline">Download Sample</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>"Biblical Counseling Essentials" Handbook</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        A practical handbook for counselors and lay leaders on applying Scripture 
                        to life situations.
                      </p>
                      <Button variant="outline">Download Sample</Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/5 rounded-lg p-6 my-8">
                  <h4 className="font-semibold text-foreground mb-4">Order Publications</h4>
                  <p className="text-muted-foreground mb-4">
                    Most of our publications are available for free download. Printed copies of 
                    select resources can be ordered through our office.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Order Printed Publications</Link>
                  </Button>
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