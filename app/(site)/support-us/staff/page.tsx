"use client"



import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function StaffPage() {
  return (
    <>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Support Our Staff</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Our dedicated team serves with excellence through your partnership.
            </p>
          </div>
        </section>

        {/* Staff Support Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Partnering with Our Team</h2>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-6">
                  Our staff members are dedicated to serving our community with excellence through 
                  Christ-centered counseling and soul-care. Your support enables them to continue 
                  this vital ministry.
                </p>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Sponsor a Staff Member</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Provide ongoing support for our counselors, administrators, and support staff.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">$50</div>
                        <div className="text-sm">Covers 2 hours of counseling</div>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">$100</div>
                        <div className="text-sm">Supports staff training</div>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">$250</div>
                        <div className="text-sm">Funds continuing education</div>
                      </div>
                    </div>
                    <Button className="w-full">Sponsor a Staff Member</Button>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <Card>
                    <CardHeader>
                      <CardTitle>Staff Care Fund</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Supporting the personal and professional needs of our team.
                      </p>
                      <Button variant="outline" className="w-full">Contribute to Staff Care</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Ministry Supplies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Providing resources and materials for our programs.
                      </p>
                      <Button variant="outline" className="w-full">Donate Supplies</Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/5 rounded-lg p-6 my-8">
                  <h4 className="font-semibold text-foreground mb-4">Meet Our Team</h4>
                  <p className="text-muted-foreground mb-4">
                    Our staff members come from diverse backgrounds but share a common passion for 
                    providing Christ-centered care to those in need. Each team member is carefully 
                    selected for their professional qualifications and spiritual maturity.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/about#team">Learn About Our Leadership</Link>
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
     
    </div>
  )
}