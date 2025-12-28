"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnnualReportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Annual Report</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              View our comprehensive annual report to see how we've served our community and advanced our mission.
            </p>
          </div>
        </section>

        {/* Annual Report Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">2024 Annual Report</h2>
              
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Executive Summary</h3>
                <p className="text-muted-foreground mb-6">
                  This annual report highlights the significant impact CCMWA has made in our community through 
                  Christ-centered counseling and soul-care ministries. Our commitment to biblical principles 
                  and compassionate service continues to transform lives and strengthen families.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Ministry Highlights</h3>
                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                  <li>Provided counseling services to over 500 individuals and families</li>
                  <li>Trained 25 new biblical counselors through our certification program</li>
                  <li>Hosted 12 community workshops on mental wellness and spiritual growth</li>
                  <li>Expanded our outreach to underserved communities</li>
                  <li>Published 4 issues of our Soul Care Journal</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Financial Overview</h3>
                <p className="text-muted-foreground mb-6">
                  Our ministry operates with complete transparency and accountability. 85% of funds go directly 
                  to program services, while 10% supports administration and 5% supports fundraising efforts.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">85%</div>
                    <div className="text-foreground font-medium">Program Services</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">10%</div>
                    <div className="text-foreground font-medium">Administration</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5%</div>
                    <div className="text-foreground font-medium">Fundraising</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Looking Forward</h3>
                <p className="text-muted-foreground mb-6">
                  As we move into the next year, we're excited to expand our training programs, launch new 
                  community initiatives, and continue providing Christ-centered care to those in need.
                </p>
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