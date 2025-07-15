"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bomb, Key, Copy, Trash2, Plus, BarChart3, Shield, Zap } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  totalVerifications: number
  plan: 'free' | 'professional' | 'enterprise'
}

interface UsageStats {
  totalVerifications: number
  thisMonth: number
  planLimit: number
  successRate: number
}

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [newKeyName, setNewKeyName] = useState("")
  const [loading, setLoading] = useState(false)

  // Simulate loading existing API keys
  useEffect(() => {
    // In production, this would connect to your MCP server
    setApiKeys([
      {
        id: "1",
        name: "Production API",
        key: "sw_prod_a1b2c3d4e5f6g7h8",
        created: "2024-01-15",
        lastUsed: "2024-01-20",
        totalVerifications: 1247,
        plan: "professional"
      }
    ])

    setUsage({
      totalVerifications: 1247,
      thisMonth: 156,
      planLimit: 2500,
      successRate: 94.2
    })
  }, [])

  const createApiKey = async () => {
    if (!newKeyName.trim()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setApiKeys(prev => [...prev, result.key])
        setNewKeyName("")
        
        // Show MCP configuration example
        alert(`API Key created! Add to your MCP config:\n\n` +
              `"mcpServers": {\n` +
              `  "slopwatch": {\n` +
              `    "command": "node",\n` +
              `    "args": ["path/to/slopwatch-mcp-server"],\n` +
              `    "env": {\n` +
              `      "SLOPWATCH_API_KEY": "${result.key.key}",\n` +
              `      "SLOPWATCH_API_URL": "${window.location.origin}/api/verify"\n` +
              `    }\n` +
              `  }\n` +
              `}`)
      }
    } catch (error) {
      console.error('Failed to create API key:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Bomb className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">SlopWatch Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your API keys and monitor nuclear-powered verification usage
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usage?.totalVerifications.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usage?.thisMonth}</div>
              <p className="text-xs text-muted-foreground">
                {usage?.planLimit ? `${usage.thisMonth}/${usage.planLimit} limit` : "Unlimited"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usage?.successRate}%</div>
              <p className="text-xs text-muted-foreground">Lie detection accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{apiKeys.length}</div>
              <p className="text-xs text-muted-foreground">API keys created</p>
            </CardContent>
          </Card>
        </div>

        {/* Create New API Key */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New API Key
            </CardTitle>
            <CardDescription>
              Generate a new API key to access SlopWatch verification services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="keyName">API Key Name</Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Production API, Development Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={createApiKey} 
                  disabled={loading || !newKeyName.trim()}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Key
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys List */}
        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              Manage and monitor your SlopWatch API keys
            </CardDescription>
          </CardHeader>
          <CardContent>
            {apiKeys.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No API keys created yet. Create your first key above.
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{apiKey.name}</h3>
                        <Badge variant="outline" className="capitalize">
                          {apiKey.plan}
                        </Badge>
                      </div>
                      <div className="font-mono text-sm bg-muted px-3 py-2 rounded mb-2">
                        {apiKey.key}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Created: {apiKey.created}</div>
                        <div>Last used: {apiKey.lastUsed}</div>
                        <div>Total verifications: {apiKey.totalVerifications.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Usage Example */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Start - Using Your API</CardTitle>
            <CardDescription>
              Connect to your MCP server and start verifying AI implementations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div className="text-muted-foreground mb-2"># Example API call to SlopWatch</div>
              <div>curl -X POST https://api.slopwatch.xyz/verify \</div>
              <div>  -H "Authorization: Bearer YOUR_API_KEY" \</div>
              <div>  -H "Content-Type: application/json" \</div>
              <div>  -d '{"{"}</div>
              <div>    "claim": "I implemented user authentication",</div>
              <div>    "originalFileContents": {"{"}"..."{"}"}{"}"},</div>
              <div>    "updatedFileContents": {"{"}"..."{"}"}</div>
              <div>  {"}"}'</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 