"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Rocket } from "lucide-react"

const pricingTiers = [
  {
    name: "Developer",
    price: "Free",
    description: "Perfect for testing and small projects",
    icon: <Zap className="h-6 w-6" />,
    features: [
      "100 verifications/month",
      "Basic lie detection",
      "Community support",
      "Standard response time",
      "Public API access"
    ],
    buttonText: "Start Beta",
    buttonVariant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For serious AI developers and teams",
    icon: <Crown className="h-6 w-6" />,
    features: [
      "2,500 verifications/month",
      "Advanced semantic analysis",
      "Priority support",
      "Faster response times",
      "Usage analytics",
      "Team collaboration",
      "API webhooks"
    ],
    buttonText: "Start Beta",
    buttonVariant: "default" as const,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations with serious AI accountability needs",
    icon: <Rocket className="h-6 w-6" />,
    features: [
      "25,000 verifications/month",
      "Custom AI models",
      "Dedicated support",
      "99.9% SLA guarantee",
      "Advanced reporting",
      "Custom integrations",
      "On-premise deployment",
      "Compliance certifications"
    ],
    buttonText: "Start Beta",
    buttonVariant: "outline" as const,
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SW</span>
              </div>
              <span className="font-bold text-xl">SlopWatch</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/docs">
                <Button variant="ghost">Documentation</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="text-primary">Lie Detection</span>{" "}
            Power Level
            <Badge variant="secondary" className="ml-4 text-sm font-mono">BETA</Badge>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our beta and get full premium access while we perfect the ultimate AI accountability platform.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Free beta access</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Premium features included</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Shape the future of AI accountability</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards - Blurred */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto blur-sm">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={tier.name} 
                className={`relative ${tier.highlighted ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {tier.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link href="/auth/signup" className="w-full">
                    <Button 
                      variant={tier.buttonVariant} 
                      className="w-full"
                    >
                      {tier.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Overlay with Beta Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="p-8 text-center bg-background/95 backdrop-blur-sm border-2 border-primary">
              <CardContent className="space-y-4">
                <Badge variant="default" className="text-lg px-4 py-2 font-mono">BETA ACCESS</Badge>
                <h3 className="text-3xl font-bold">All Premium Features Included</h3>
                <p className="text-muted-foreground max-w-md">
                  During our beta phase, all users get access to premium features completely free. 
                  Help us build the future of AI accountability.
                </p>
                <Link href="/auth/signup">
                  <Button size="lg" className="text-lg px-8 py-3">
                    Start Beta Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Beta Program FAQ
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">What's included in the beta?</h3>
              <p className="text-muted-foreground text-sm">
                Full access to all premium features including unlimited verifications, priority support, and advanced analytics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How long is the beta period?</h3>
              <p className="text-muted-foreground text-sm">
                The beta program runs for 6 months while we refine the platform based on your feedback.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens after beta?</h3>
              <p className="text-muted-foreground text-sm">
                Beta users get lifetime discounts and early access to new features. No surprises - we'll communicate pricing well in advance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I provide feedback?</h3>
              <p className="text-muted-foreground text-sm">
                Absolutely! Beta users have direct access to our team and help shape the final product.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <Card className="max-w-2xl mx-auto p-8">
            <CardContent className="space-y-4">
              <Badge variant="secondary" className="font-mono">LIMITED BETA SPOTS</Badge>
              <h3 className="text-2xl font-bold">Join the SlopWatch Beta</h3>
              <p className="text-muted-foreground">
                Get premium AI lie detection features for free while helping us build the most advanced accountability platform.
              </p>
              <div className="space-x-4">
                <Link href="/auth/signup">
                  <Button size="lg">Start Beta</Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" size="lg">View Documentation</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 