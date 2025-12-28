"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function JobsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Explore career opportunities and volunteer roles to serve with us.
            </p>
          </div>
        </section>

        {/* Jobs Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Current Opportunities</h2>
              
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-6">
                  CCMWA is always looking for dedicated individuals who share our vision of providing 
                  Christ-centered counseling and soul-care to our community. We offer both full-time 
                  positions and volunteer opportunities.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Full-Time Positions</h3>
                
                <div className="space-y-6 my-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>Licensed Professional Counselor</span>
                        <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">Full-Time</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        We are seeking a licensed professional counselor to join our clinical team. 
                        The ideal candidate will have experience in faith-based counseling and a heart 
                        for serving others through Christ-centered care.
                      </p>
                      <h4 className="font-semibold text-foreground mb-2">Responsibilities:</h4>
                      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                        <li>Provide individual and family counseling services</li>
                        <li>Collaborate with other team members to develop treatment plans</li>
                        <li>Maintain client records and documentation</li>
                        <li>Participate in team meetings and supervision</li>
                      </ul>
                      <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                        <li>Master's degree in Counseling or related field</li>
                        <li>Valid professional license</li>
                        <li>Experience with faith-based counseling approaches</li>
                        <li>Strong commitment to our Statement of Faith</li>
                      </ul>
                      <Button>Apply Now</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>Administrative Assistant</span>
                        <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">Full-Time</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        We are looking for an organized and detail-oriented administrative assistant 
                        to support our office operations. This role is essential to keeping our ministry 
                        running smoothly.
                      </p>
                      <h4 className="font-semibold text-foreground mb-2">Responsibilities:</h4>
                      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                        <li>Manage phone calls and correspondence</li>
                        <li>Maintain client scheduling system</li>
                        <li>Process donations and financial transactions</li>
                        <li>Coordinate office supplies and maintenance</li>
                      </ul>
                      <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                        <li>Associate degree or equivalent experience</li>
                        <li>Proficiency in Microsoft Office Suite</li>
                        <li>Excellent communication skills</li>
                        <li>Ability to maintain confidentiality</li>
                      </ul>
                      <Button>Apply Now</Button>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Volunteer Opportunities</h3>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Office Volunteer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Assist with administrative tasks, data entry, and general office support.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Time commitment:</strong> 10-15 hours per week
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Help with setup, registration, and coordination of our community events.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Time commitment:</strong> As needed for events
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Prayer Ministry</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Join our prayer team to support our counseling ministry through intercession.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Time commitment:</strong> Flexible schedule
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Greet visitors and provide assistance during our community events and workshops.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Time commitment:</strong> As needed for events
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/5 rounded-lg p-6 my-8">
                  <h4 className="font-semibold text-foreground mb-4">How to Apply</h4>
                  <p className="text-muted-foreground mb-4">
                    To apply for any position, please send your resume and a brief cover letter 
                    explaining your interest in our ministry to:
                  </p>
                  <p className="text-muted-foreground font-medium">
                    hr@ccmwa.org
                  </p>
                  <p className="text-muted-foreground mt-4">
                    For volunteer opportunities, please fill out our volunteer interest form and 
                    we'll contact you about upcoming opportunities that match your interests and 
                    availability.
                  </p>
                  <div className="mt-6">
                    <Button variant="outline">Volunteer Interest Form</Button>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button asChild>
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