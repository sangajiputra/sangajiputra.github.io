"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, subject, message } = formData
    const phoneNumber = "6282264117438" // WhatsApp number without "+"
    const text = `Hello, I'm ${name} \nEmail: ${email}\n\n*${subject}*\n${message}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ready to start your next project? Let's work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Let's Connect</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              I'm always interested in new opportunities and exciting projects. Whether you have a question or just want
              to say hi, feel free to reach out!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Email</p>
                  <p className="text-gray-600 dark:text-gray-300">sangajiputra04@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Phone</p>
                  <a
                    href="https://wa.me/6282264117438"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:underline"
                  >
                    +62 822 6411 7438 (WhatsApp)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Location</p>
                  <p className="text-gray-600 dark:text-gray-300">Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-white">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </div>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
