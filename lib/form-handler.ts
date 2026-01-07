export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface PrayerRequestData {
  name?: string
  email?: string
  requestType: string
  request: string
  isPrivate: boolean
}

export interface NewsletterData {
  email: string
  preferences?: string[]
}

export interface VolunteerApplicationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  opportunity: string
  experience: string
  motivation: string
  availability: string
  backgroundCheck: boolean
}

export class FormHandler {
  static async submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful submission
      console.log("Contact form submitted:", data)

      return {
        success: true,
        message: "Thank you for your message! We will get back to you within 24 hours.",
      }
    } catch (error) {
      return {
        success: false,
        message: "There was an error sending your message. Please try again or call us directly.",
      }
    }
  }

  static async submitPrayerRequest(data: PrayerRequestData): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Prayer request submitted:", data)

      return {
        success: true,
        message: data.isPrivate
          ? "Your private prayer request has been received. Our pastoral team will pray for you."
          : "Your prayer request has been received and shared with our prayer team.",
      }
    } catch (error) {
      return {
        success: false,
        message: "There was an error submitting your prayer request. Please try again.",
      }
    }
  }

  static async subscribeNewsletter(data: NewsletterData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        return {
          success: true,
          message: result.message || "Thank you for subscribing!",
        };
      }

      return {
        success: false,
        message: result.error || "There was an error with your subscription. Please try again.",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error with your subscription. Please try again.",
      };
    }
  }

  static async submitVolunteerApplication(
    data: VolunteerApplicationData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Volunteer application submitted:", data)

      return {
        success: true,
        message: "Thank you for your volunteer application! We will review it and contact you within one week.",
      }
    } catch (error) {
      return {
        success: false,
        message: "There was an error submitting your application. Please try again.",
      }
    }
  }
}
