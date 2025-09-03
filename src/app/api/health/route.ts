import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        osint_tools: 'operational',
        forum: 'operational',
        authentication: 'operational'
      },
      uptime: typeof process !== 'undefined' ? process.uptime() : 0,
      environment: typeof process !== 'undefined' ? process.env.NODE_ENV || 'development' : 'development'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Health check failed' 
      }, 
      { status: 500 }
    );
  }
}