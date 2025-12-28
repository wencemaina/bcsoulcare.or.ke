"use client"



import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function RelayWorkerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Support a Relay Worker</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Partner with us in supporting missionaries and ministry workers around the world.
            </p>
          </div>
        </section>

        {/* Relay Worker Support Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Global Ministry Partnership</h2>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-6">
                  CCMWA partners with missionaries and ministry workers around the world to extend 
                  Christ-centered counseling and soul-care to communities in need. Your support 
                  enables these workers to serve with excellence in challenging environments.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Partnership</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Provide ongoing support for missionaries in the field.
                      </p>
                      <ul className="space-y-2 mb-4 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span><strong>$30/month</strong> - Basic support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span><strong>$50/month</strong> - Standard support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span><strong>$100/month</strong> - Full partnership</span>
                        </li>
                      </ul>
                      <Button className="w-full">Become a Partner</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Special Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Support specific initiatives and outreach efforts.
                      </p>
                      <ul className="space-y-2 mb-4 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>Medical missions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>Disaster relief</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>Church planting</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Support a Project</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="my-12">
                  <CardHeader>
                    <CardTitle className="text-center">Current Missionaries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="text-center">
                          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold text-xl">M</span>
                            </div>
                          </div>
                          <h3 className="font-semibold">Missionary Name</h3>
                          <p className="text-sm text-muted-foreground">Location, Country</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Serving in counseling and discipleship ministry
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-8">
                      <Button variant="outline">View All Missionaries</Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-primary/5 rounded-lg p-6 my-8">
                  <h4 className="font-semibold text-foreground mb-4">Impact of Your Support</h4>
                  <p className="text-muted-foreground mb-4">
                    Your partnership with our relay workers enables them to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Provide counseling services in remote communities</li>
                    <li>Train local leaders in biblical counseling principles</li>
                    <li>Distribute Christian literature and resources</li>
                    <li>Support families in crisis situations</li>
                    <li>Plant and strengthen local churches</li>
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