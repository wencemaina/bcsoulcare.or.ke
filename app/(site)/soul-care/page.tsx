"use client"

import { useState } from "react"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingForm } from "@/components/booking-form"
import { Heart, Shield, Clock, Phone, ArrowRight, Calendar } from "lucide-react"

export default function SoulCarePage() {
  const [showBookingForm, setShowBookingForm] = useState(false)

  const services = [
    {
      title: "Individual Counseling",
      description: "One-on-one sessions with licensed therapists who integrate faith and professional practice.",
      features: ["Depression & Anxiety", "Trauma Recovery", "Life Transitions", "Relationship Issues"],
      duration: "50-minute sessions",
      availability: "Weekdays & Evenings",
    },
    {
      title: "Couples Counseling",
      description: "Strengthen your relationship with faith-based couples therapy and communication tools.",
      features: ["Communication Skills", "Conflict Resolution", "Intimacy & Connection", "Pre-marital Preparation"],
      duration: "75-minute sessions",
      availability: "Weekdays & Weekends",
    },
    {
      title: "Family Therapy",
      description: "Whole-family approach to healing and building stronger family relationships.",
      features: ["Parenting Support", "Teen Counseling", "Family Dynamics", "Blended Family Issues"],
      duration: "60-minute sessions",
      availability: "After School Hours",
    },
    {
      title: "Spiritual Direction",
      description: "Explore your relationship with God and discern His calling on your life.",
      features: ["Prayer Life", "Spiritual Discernment", "Life Purpose", "Faith Questions"],
      duration: "60-minute sessions",
      availability: "Flexible Scheduling",
    },
  ]

  const counselors = [
    {
      id: "1",
      name: "Dr. Mary Njeri", // Updated to Kenyan name
      title: "Clinical Director",
      specialties: ["Trauma", "Anxiety", "Depression"],
      credentials: "PhD, LMFT, EMDR Certified",
      image: "/professional-therapist-woman.png",
    },
    {
      id: "2",
      name: "Dr. Samuel Mwangi", // Updated to Kenyan name
      title: "Marriage & Family Therapist",
      specialties: ["Couples", "Family", "Addiction"],
      credentials: "PsyD, LMFT, CSAT",
      image: "/professional-therapist-man.png",
    },
    {
      id: "3",
      name: "Ruth Akinyi", // Updated to Kenyan name
      title: "Spiritual Director",
      specialties: ["Spiritual Formation", "Discernment", "Prayer"],
      credentials: "MDiv, Certified Spiritual Director",
      image: "/spiritual-director-woman.png",
    },
  ]

  if (showBookingForm) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Appointment</h1>
              <p className="text-lg text-muted-foreground">
                Schedule your soul care session with one of our experienced counselors.
              </p>
              <Button variant="outline" onClick={() => setShowBookingForm(false)} className="mt-4 bg-transparent">
                ← Back to Soul Care Services
              </Button>
            </div>
            <BookingForm counselors={counselors} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Soul Care Services</h1>
            <p className="text-xl text-muted-foreground text-pretty mb-8">
              Professional counseling and spiritual care in a safe, confidential environment where faith and healing
              intersect.
            </p>
            <Button size="lg" onClick={() => setShowBookingForm(true)} className="flex items-center gap-2 mx-auto">
              <Calendar className="h-5 w-5" />
              Book an Appointment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Emergency Support Banner */}
        <section className="bg-destructive/10 border-l-4 border-destructive py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-destructive" />
                <span className="font-medium text-foreground">Crisis Support Available 24/7</span>
              </div>
              <Button variant="destructive" size="sm">
                Call +254 712 911 111 {/* Updated crisis hotline to Kenyan format */}
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Areas of Focus:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium">Available:</span> {service.availability}
                      </div>
                    </div>
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Schedule Appointment
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Counselors */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Care Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {counselors.map((counselor, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      <img
                        src={counselor.image || "/placeholder.svg"}
                        alt={counselor.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto"
                      />
                    </div>
                    <CardTitle className="text-lg">{counselor.name}</CardTitle>
                    <CardDescription>{counselor.title}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-1">{counselor.credentials}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {counselor.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Book with {counselor.name.split(" ")[0]}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Confidentiality */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/5 rounded-lg p-8 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Your Privacy is Protected</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                All counseling sessions are completely confidential and conducted by licensed professionals. We adhere
                to strict ethical guidelines and HIPAA regulations to ensure your privacy and safety.
              </p>
              <Button variant="outline" onClick={() => setShowBookingForm(true)} className="bg-transparent">
                Schedule Your Confidential Session
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
