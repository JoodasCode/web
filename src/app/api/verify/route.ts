import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

interface VerificationRequest {
  claim: string
  originalFileContents: Record<string, string>
  updatedFileContents: Record<string, string>
}

interface VerificationResult {
  isVerified: boolean
  confidence: number
  slopLevel: 'FABRICATION' | 'MISIMPLEMENTATION' | 'MATCHED'
  emoji: string
  savageOutput: string
  details: string
  analysis: string
}

// Validate API key (in production, check against database)
function validateApiKey(apiKey: string): boolean {
  // This would check against your database of valid API keys
  return Boolean(apiKey && apiKey.startsWith('sw_'))
}

// Simulate the MCP server verification logic for web deployment
async function performSlopWatchVerification(
  claim: string,
  originalContent: Record<string, string>,
  updatedContent: Record<string, string>
): Promise<VerificationResult> {
  const files = Object.keys(originalContent)
  
  if (files.length === 0) {
    return {
      isVerified: false,
      confidence: 0,
      slopLevel: 'FABRICATION',
      emoji: '🟥',
      savageOutput: '❌ FABRICATION (0%) - No files specified, complete bullshit',
      details: 'No files specified for verification',
      analysis: 'Cannot verify implementation without file content'
    }
  }

  // Calculate changes
  let changedFiles = 0
  const fileChanges: Record<string, { before: string; after: string; wasModified: boolean }> = {}
  
  for (const filename of files) {
    const before = originalContent[filename] || ''
    const after = updatedContent[filename] || ''
    const wasModified = before !== after
    
    if (wasModified) changedFiles++
    
    fileChanges[filename] = {
      before,
      after,
      wasModified
    }
  }

  // Enhanced AI analysis if OpenAI is available
  let confidence = 50 // Default fallback
  let aiAnalysis = ''
  
  if (openai && changedFiles > 0) {
    try {
      const modifiedFiles = Object.entries(fileChanges)
        .filter(([_, change]) => change.wasModified)
        .slice(0, 3) // Limit to 3 files for cost control

      if (modifiedFiles.length > 0) {
        const prompt = `Analyze if this AI implementation claim matches reality:

CLAIM: "${claim}"

ACTUAL CHANGES:
${modifiedFiles.map(([filename, change]) => `
File: ${filename}
BEFORE:
${change.before.slice(0, 800)}${change.before.length > 800 ? '...' : ''}

AFTER:
${change.after.slice(0, 800)}${change.after.length > 800 ? '...' : ''}
`).join('\n')}

Rate 0-100 how well the implementation matches the claim:
- 0-30: FABRICATION (AI completely lied)
- 31-70: MISIMPLEMENTATION (AI tried but failed)  
- 71-100: MATCHED (AI delivered what was claimed)

Respond ONLY with JSON: {"score": number, "reasoning": "brutal 1-line analysis"}`

        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.3
        })

        const content = response.choices[0].message.content?.trim() || ''
        
        // Try to extract JSON from response
        const jsonMatch = content.match(/\{[^}]*\}/)
        if (jsonMatch) {
          try {
            const result = JSON.parse(jsonMatch[0])
            confidence = Math.max(0, Math.min(100, result.score || 50))
            aiAnalysis = result.reasoning || 'AI analysis completed'
          } catch {
            // Fallback parsing
            const scoreMatch = content.match(/score[":]\s*(\d+)/i)
            if (scoreMatch) {
              confidence = Math.max(0, Math.min(100, parseInt(scoreMatch[1])))
            }
            aiAnalysis = 'AI analysis completed with basic parsing'
          }
        }
      }
    } catch (error) {
      console.error('OpenAI analysis failed:', error)
      aiAnalysis = 'OpenAI unavailable, using basic analysis'
    }
  } else {
    // Fallback regex-based analysis
    const fileChangeScore = (changedFiles / files.length) * 70
    const keywords = extractKeywords(claim)
    let keywordMatches = 0
    
    for (const filename of files) {
      const content = updatedContent[filename] || ''
      keywordMatches += keywords.filter(keyword => 
        content.toLowerCase().includes(keyword.toLowerCase())
      ).length
    }
    
    const keywordScore = Math.min((keywordMatches / keywords.length) * 30, 30)
    confidence = Math.round(fileChangeScore + keywordScore)
    aiAnalysis = `Basic analysis: ${changedFiles} files changed, ${keywordMatches}/${keywords.length} keywords matched`
  }

  // Generate savage output based on confidence
  let slopLevel: 'FABRICATION' | 'MISIMPLEMENTATION' | 'MATCHED'
  let emoji: string
  let savageOutput: string

  if (confidence >= 71) {
    slopLevel = 'MATCHED'
    emoji = '✅'
    savageOutput = `✅ MATCHED (${confidence}%) - Nuclear verification confirms implementation delivered as claimed`
  } else if (confidence >= 31) {
    slopLevel = 'MISIMPLEMENTATION'
    emoji = '🟧'
    savageOutput = `🟧 MISIMPLEMENTATION (${confidence}%) - AI attempted implementation but failed to fully deliver`
  } else {
    slopLevel = 'FABRICATION'
    emoji = '🟥'
    savageOutput = `🟥 FABRICATION (${confidence}%) - AI completely fabricated this implementation claim`
  }

  return {
    isVerified: confidence >= 71,
    confidence,
    slopLevel,
    emoji,
    savageOutput,
    details: `${changedFiles}/${files.length} files modified`,
    analysis: aiAnalysis || `Basic analysis: ${changedFiles} files changed`
  }
}

function extractKeywords(claim: string): string[] {
  const words = claim.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'does', 'each', 'few', 'got', 'man', 'many', 'much', 'put', 'say', 'she', 'too', 'use'].includes(word))
  
  return Array.from(new Set(words)).slice(0, 10) // Max 10 keywords
}

export async function POST(request: NextRequest) {
  try {
    // Check API key authentication (following MCP standards)
    const authHeader = request.headers.get('authorization')
    const apiKey = authHeader?.replace('Bearer ', '') || 
                   request.headers.get('x-api-key') ||
                   request.headers.get('x-slopwatch-key')

    if (!apiKey || !validateApiKey(apiKey)) {
      return NextResponse.json(
        { 
          error: 'Invalid or missing API key',
          type: 'authentication_error' 
        },
        { status: 401 }
      )
    }

    const { claim, originalFileContents, updatedFileContents }: VerificationRequest = 
      await request.json()

    if (!claim || !originalFileContents || !updatedFileContents) {
      return NextResponse.json(
        { error: 'Missing required fields: claim, originalFileContents, updatedFileContents' },
        { status: 400 }
      )
    }

    // Perform SlopWatch verification using the same logic as your MCP server
    const result = await performSlopWatchVerification(claim, originalFileContents, updatedFileContents)

    return NextResponse.json({
      success: true,
      verification: result,
      apiKeyUsed: apiKey.substring(0, 8) + '...',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Verification error:', error)
    
    return NextResponse.json(
      { 
        error: 'Verification failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'SlopWatch Verification API',
    version: '3.1',
    status: 'Nuclear-powered and ready',
    endpoints: {
      verify: 'POST /api/verify - Verify implementation claims',
      docs: 'GET /docs - API documentation'
    }
  })
} 