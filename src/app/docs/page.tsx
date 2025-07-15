import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bomb, Code, Zap, Shield, AlertTriangle } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Bomb className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">SlopWatch API Documentation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Nuclear-powered semantic analysis API for detecting AI implementation lies. 
            Stop the slop with military-grade verification.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <a href="#overview" className="block text-sm hover:text-primary transition-colors">Overview</a>
                  <a href="#authentication" className="block text-sm hover:text-primary transition-colors">Authentication</a>
                  <a href="#endpoints" className="block text-sm hover:text-primary transition-colors">API Endpoints</a>
                  <a href="#verification" className="block text-sm hover:text-primary transition-colors">Verification</a>
                  <a href="#examples" className="block text-sm hover:text-primary transition-colors">Examples</a>
                  <a href="#errors" className="block text-sm hover:text-primary transition-colors">Error Handling</a>
                  <a href="#mcp" className="block text-sm hover:text-primary transition-colors">MCP Integration</a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview */}
            <section id="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    API Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    SlopWatch API provides nuclear-powered semantic analysis to verify AI implementation claims. 
                    Built on OpenAI GPT-4 with fallback regex analysis, it delivers brutal honesty about code changes.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">85%</div>
                      <div className="text-sm text-muted-foreground">Lie Detection Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">2.3s</div>
                      <div className="text-sm text-muted-foreground">Average Response Time</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">99.9%</div>
                      <div className="text-sm text-muted-foreground">API Uptime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Authentication */}
            <section id="authentication">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Currently in open beta - no authentication required for testing.</p>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-600 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Beta Notice</span>
                    </div>
                    <p className="text-sm">
                      Production API keys coming soon. Current rate limit: 100 requests/hour per IP.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Endpoints */}
            <section id="endpoints">
              <Card>
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Base URL</h3>
                    <code className="bg-muted/30 px-3 py-1 rounded text-sm">https://slopwatch.xyz/api</code>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default">POST</Badge>
                        <code className="text-sm">/verify</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nuclear verification of AI implementation claims
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-sm">/verify</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        API status and endpoint information
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Verification Endpoint */}
            <section id="verification">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bomb className="h-5 w-5" />
                    Verification Endpoint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Request Format</h3>
                    <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-x-auto">
{`POST /api/verify
Content-Type: application/json

{
  "claim": "Added user authentication with JWT tokens",
  "originalFileContents": {
    "auth.js": "// Empty auth module\\nexport const auth = {};"
  },
  "updatedFileContents": {
    "auth.js": "// Auth module with JWT\\nexport const auth = {\\n  login: async (user, pass) => {\\n    const token = jwt.sign({user}, 'secret');\\n    return token;\\n  }\\n};"
  }
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Response Format</h3>
                    <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "isVerified": true,
  "confidence": 87,
  "slopLevel": "MATCHED",
  "emoji": "✅",
  "savageOutput": "✅ MATCHED (87%) - Nuclear verification confirms implementation delivered as claimed",
  "details": "1/1 files modified",
  "analysis": "AI successfully implemented JWT authentication with proper login function"
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Slop Levels</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🟥</span>
                        <div>
                          <span className="font-medium">FABRICATION (0-30%)</span>
                          <p className="text-sm text-muted-foreground">AI completely lied about implementation</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🟧</span>
                        <div>
                          <span className="font-medium">MISIMPLEMENTATION (31-70%)</span>
                          <p className="text-sm text-muted-foreground">AI attempted but failed to fully deliver</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">✅</span>
                        <div>
                          <span className="font-medium">MATCHED (71-100%)</span>
                          <p className="text-sm text-muted-foreground">AI delivered what was claimed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Examples */}
            <section id="examples">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">JavaScript/Node.js</h3>
                    <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-x-auto">
{`const response = await fetch('https://slopwatch.xyz/api/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    claim: "Added error handling to the API",
    originalFileContents: {
      "api.js": "function getData() { return fetch('/data'); }"
    },
    updatedFileContents: {
      "api.js": "function getData() { try { return fetch('/data'); } catch(e) { console.error(e); } }"
    }
  })
});

const result = await response.json();
console.log(result.savageOutput);`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Python</h3>
                    <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-x-auto">
{`import requests

response = requests.post('https://slopwatch.xyz/api/verify', json={
    "claim": "Implemented database connection pooling",
    "originalFileContents": {
        "db.py": "import sqlite3\\ndef connect(): return sqlite3.connect('db.sqlite')"
    },
    "updatedFileContents": {
        "db.py": "import sqlite3\\nfrom pool import ConnectionPool\\npool = ConnectionPool(10)\\ndef connect(): return pool.get_connection()"
    }
})

result = response.json()
print(f"Confidence: {result['confidence']}%")
print(result['savageOutput'])`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Error Handling */}
            <section id="errors">
              <Card>
                <CardHeader>
                  <CardTitle>Error Handling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Badge variant="destructive">400</Badge>
                      <span className="ml-2 font-medium">Bad Request</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Invalid input format, missing fields, or claim too short (&lt;10 chars)
                      </p>
                    </div>
                    <div>
                      <Badge variant="destructive">429</Badge>
                      <span className="ml-2 font-medium">Rate Limited</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Too many requests. Current limit: 100/hour per IP
                      </p>
                    </div>
                    <div>
                      <Badge variant="destructive">500</Badge>
                      <span className="ml-2 font-medium">Internal Error</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Nuclear reactor overheated. Try again or contact support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* MCP Integration */}
            <section id="mcp">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    MCP Integration
                  </CardTitle>
                  <CardDescription>
                    Connect SlopWatch to Claude Desktop, Cursor, or any MCP-compatible client
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Claude Desktop</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-muted-foreground mb-2"># Add to claude_desktop_config.json</div>
                      <div>{`{`}</div>
                      <div>{`  "mcpServers": {`}</div>
                      <div>{`    "slopwatch": {`}</div>
                      <div>{`      "command": "npx",`}</div>
                      <div>{`      "args": ["-y", "@slopwatch/mcp-server"],`}</div>
                      <div>{`      "env": {`}</div>
                      <div>{`        "SLOPWATCH_API_KEY": "your-api-key-here",`}</div>
                      <div>{`        "SLOPWATCH_API_URL": "https://slopwatch.xyz/api/verify"`}</div>
                      <div>{`      }`}</div>
                      <div>{`    }`}</div>
                      <div>{`  }`}</div>
                      <div>{`}`}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cursor IDE</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-muted-foreground mb-2"># Add to ~/.cursor/mcp.json</div>
                      <div>{`{`}</div>
                      <div>{`  "mcpServers": {`}</div>
                      <div>{`    "slopwatch": {`}</div>
                      <div>{`      "command": "curl",`}</div>
                      <div>{`      "args": ["-X", "POST", "https://slopwatch.xyz/api/verify",`}</div>
                      <div>{`               "-H", "X-API-Key: YOUR_API_KEY",`}</div>
                      <div>{`               "-H", "Content-Type: application/json"]`}</div>
                      <div>{`    }`}</div>
                      <div>{`  }`}</div>
                      <div>{`}`}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Usage in Prompts</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">After setup, use in any prompt:</div>
                      <div className="font-mono text-sm">
                        "I will implement user authentication. verify with slopwatch"
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        SlopWatch will automatically verify your implementation against your claim.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 