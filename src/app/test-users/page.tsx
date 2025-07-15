"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { User, Session } from "@supabase/supabase-js"

export default function TestUsersPage() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const testSignup = async () => {
    setLoading(true)
    setError("")
    
    const testEmail = `test${Date.now()}@example.com`
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: 'testpass123'
    })

    if (error) {
      setError(error.message)
    } else {
      console.log('Signup successful:', data)
    }
    setLoading(false)
  }

  const testLogin = async () => {
    setLoading(true)
    setError("")
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@slopwatch.xyz',
      password: 'testpassword123'
    })

    if (error) {
      setError(error.message)
    } else {
      console.log('Login successful:', data)
    }
    setLoading(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Supabase Auth Test</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>Current user and session information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>User:</strong> {user ? user.email : 'Not authenticated'}
            </div>
            <div>
              <strong>User ID:</strong> {user ? user.id : 'N/A'}
            </div>
            <div>
              <strong>Email Confirmed:</strong> {user ? (user.email_confirmed_at ? 'Yes' : 'No') : 'N/A'}
            </div>
            <div>
              <strong>Session:</strong> {session ? 'Active' : 'None'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Actions</CardTitle>
            <CardDescription>Test Supabase authentication functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={testSignup} disabled={loading}>
                Test Signup (Random Email)
              </Button>
              <Button onClick={testLogin} disabled={loading}>
                Test Login (test@slopwatch.xyz)
              </Button>
              {user && (
                <Button onClick={logout} disabled={loading} variant="outline">
                  Logout
                </Button>
              )}
            </div>
            
            {error && (
              <div className="text-red-500 p-4 bg-red-50 rounded">
                Error: {error}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Navigate to other auth pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <a href="/auth/signup" className="text-blue-500 hover:underline">
                → Signup Page
              </a>
            </div>
            <div>
              <a href="/auth/login" className="text-blue-500 hover:underline">
                → Login Page
              </a>
            </div>
            <div>
              <a href="/dashboard" className="text-blue-500 hover:underline">
                → Dashboard
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase Configuration</CardTitle>
            <CardDescription>Environment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Supabase URL:</strong> https://azaemhtwciapgrplwtyy.supabase.co
              </div>
              <div>
                <strong>Project ID:</strong> azaemhtwciapgrplwtyy
              </div>
              <div>
                <strong>Environment:</strong> {process.env.NODE_ENV}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 