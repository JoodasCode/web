"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bomb, Shield, Zap, Target, Eye } from "lucide-react"
import Link from "next/link"
import { RealTimeStats } from "@/components/real-time-stats"

export default function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bomb className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SlopWatch</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <Link href="/docs" className="hover:text-primary transition-colors">API</Link>
              <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Bomb className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            THE AI THAT CATCHES<br />
            <span className="text-primary">AI LYING</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                         Nuclear-powered semantic analysis that detects when AI claims don&apos;t match reality. 
             Stop the slop. Start the watch.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Lie Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.3s</div>
              <div className="text-sm text-muted-foreground">Average Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">API Uptime</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                <Zap className="mr-2 h-5 w-5" />
                Start Nuclear Analysis
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Eye className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Nuclear-Grade AI Verification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Semantic Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deep code analysis that understands meaning, not just text matching
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Real-time Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instant verification of AI implementation claims with millisecond precision
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>API Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easy integration with existing workflows and development tools
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>MCP Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built on Model Context Protocol for reliable AI-to-AI communication
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-Time Stats Section */}
      <RealTimeStats />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Stop the Slop?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers using SlopWatch to ensure AI transparency and accountability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get API Access
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bomb className="h-6 w-6 text-primary" />
              <span className="font-bold">SlopWatch</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Nuclear-powered AI verification. Built with MCP.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
