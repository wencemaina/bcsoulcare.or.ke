"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function UncoverPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Uncover</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Discover inspiring stories of transformation, healing, and hope from our community.
            </p>
          </div>
        </section>

        {/* Uncover Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Stories of Hope and Transformation</h2>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-6">
                  At CCMWA, we witness incredible stories of healing and transformation every day. These 
                  stories reflect the power of Christ-centered counseling and the resilience of the human spirit.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <Card>
                    <CardHeader>
                      <CardTitle>A Journey from Darkness to Light</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        "When I first came to CCMWA, I was in a dark place. I had lost hope and didn't see 
                        a way forward. Through counseling grounded in Scripture and the compassionate care 
                        of my counselor, I began to see God's love for me in a new way..."
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        - Sarah M., Nairobi
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Restoring a Marriage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        "Our marriage was on the brink of collapse. We had tried everything, but nothing 
                        seemed to work. CCMWA's marriage counseling helped us understand each other better 
                        and most importantly, helped us both grow in our relationship with Christ..."
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        - David and Mary, Mombasa
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Community Impact</h3>
                <p className="text-muted-foreground mb-6">
                  Beyond individual stories, we're seeing transformation in entire communities through our 
                  outreach programs and training initiatives.
                </p>

                <div className="bg-primary/5 rounded-lg p-6 my-8">
                  <h4 className="font-semibold text-foreground mb-4">Recent Community Transformations</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Trained 50 lay counselors in rural communities</li>
                    <li>Established support groups in 12 local churches</li>
                    <li>Provided crisis counseling to families affected by natural disasters</li>
                    <li>Launched a mentorship program for at-risk youth</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Share Your Story</h3>
                <p className="text-muted-foreground mb-6">
                  We believe your story matters. If CCMWA has impacted your life, we'd love to hear from you.
                </p>
              </div>

              <div className="mt-12 text-center">
                <Button asChild>
                  <Link href="/contact">Share Your Story</Link>
                </Button>
                <Button variant="outline" asChild className="ml-4">
                  <Link href="/about">Back to About Us</Link>
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