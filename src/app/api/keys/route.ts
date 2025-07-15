import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo
// In production, this would connect to your database
let apiKeys: any[] = [
  {
    id: "1",
    name: "Production API",
    key: "sw_prod_a1b2c3d4e5f6g7h8",
    created: "2024-01-15",
    lastUsed: "2024-01-20",
    totalVerifications: 1247,
    plan: "professional"
  }
]

// GET - List all API keys
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      keys: apiKeys
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch API keys' },
      { status: 500 }
    )
  }
}

// POST - Create new API key
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()
    
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    const newKey = {
      id: Date.now().toString(),
      name: name.trim(),
      key: `sw_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
      totalVerifications: 0,
      plan: "professional"
    }

    apiKeys.push(newKey)

    return NextResponse.json({
      success: true,
      key: newKey
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create API key' },
      { status: 500 }
    )
  }
}

// DELETE - Remove API key
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Key ID is required' },
        { status: 400 }
      )
    }

    const initialLength = apiKeys.length
    apiKeys = apiKeys.filter(key => key.id !== id)
    
    if (apiKeys.length === initialLength) {
      return NextResponse.json(
        { success: false, error: 'API key not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'API key deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete API key' },
      { status: 500 }
    )
  }
} 