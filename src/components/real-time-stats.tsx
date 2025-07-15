"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bomb, TrendingUp, Clock, Wifi } from "lucide-react"

interface SlopWatchStats {
  totalVerifications: number
  averageAccuracy: number
  averageAnalysisTime: number
  uptime: number
  recentActivity: {
    verified: number
    fabrications: number
    misimplementations: number
  }
}

export function RealTimeStats() {
  const [stats, setStats] = useState<SlopWatchStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const result = await response.json()
          setStats(result.data)
          setLastUpdated(new Date())
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchStats()

    // Update every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Nuclear Analytics</h2>
            <p className="text-xl text-muted-foreground">Loading real-time data...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <div className="h-8 w-16 bg-muted animate-pulse rounded mx-auto mb-2"></div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!stats) {
    return null
  }

  const statCards = [
    {
      title: "Lie Detection Accuracy",
      value: `${stats.averageAccuracy}%`,
      icon: <Bomb className="h-8 w-8 text-primary" />,
      description: "Nuclear precision rate",
      color: "text-green-600"
    },
    {
      title: "Analysis Time",
      value: `${stats.averageAnalysisTime}s`,
      icon: <Clock className="h-8 w-8 text-primary" />,
      description: "Average detection speed",
      color: "text-blue-600"
    },
    {
      title: "API Uptime",
      value: `${stats.uptime}%`,
      icon: <Wifi className="h-8 w-8 text-primary" />,
      description: "System reliability",
      color: "text-purple-600"
    },
    {
      title: "Total Verifications",
      value: stats.totalVerifications.toLocaleString(),
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      description: "Nuclear analyses performed",
      color: "text-orange-600"
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bomb className="h-8 w-8 text-primary animate-pulse" />
            <h2 className="text-3xl font-bold">Live Nuclear Analytics</h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Real-time data from our MCP verification engine
          </p>
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Badge variant="outline" className="text-xs">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {statCards.map((stat, index) => (
            <Card key={index} className="text-center hover:scale-105 transition-transform">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <CardDescription className="text-xs">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Summary */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Recent Activity (Last 24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {stats.recentActivity.verified}
                  </div>
                  <div className="text-sm text-muted-foreground">✅ MATCHED</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {stats.recentActivity.misimplementations}
                  </div>
                  <div className="text-sm text-muted-foreground">🟧 MISIMPLEMENTATION</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {stats.recentActivity.fabrications}
                  </div>
                  <div className="text-sm text-muted-foreground">🟥 FABRICATION</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 