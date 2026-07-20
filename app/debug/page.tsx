"use client"

import { useState, useEffect } from "react"

export default function DebugPage() {
  const [kittens, setKittens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiUrl, setApiUrl] = useState("")

  useEffect(() => {
    async function fetchKittens() {
      setLoading(true)
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
      const url = `${baseUrl}/api/kittens`
      setApiUrl(url)
      
      try {
        const res = await fetch(url)
        console.log('Response status:', res.status)
        console.log('Response headers:', res.headers)
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        console.log('Kittens data:', data)
        setKittens(data)
      } catch (e) {
        console.error('Error fetching kittens:', e)
        setError(e instanceof Error ? e.message : 'Unknown error')
        setKittens([])
      } finally {
        setLoading(false)
      }
    }
    fetchKittens()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
        
        <div className="space-y-6">
          <div className="bg-secondary/40 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Environment Info</h2>
            <p><strong>NEXT_PUBLIC_APP_URL:</strong> {process.env.NEXT_PUBLIC_APP_URL || 'Not set'}</p>
            <p><strong>Window Location:</strong> {typeof window !== 'undefined' ? window.location.origin : 'SSR'}</p>
            <p><strong>API URL:</strong> {apiUrl}</p>
          </div>

          <div className="bg-secondary/40 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">API Response</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <div>
                <p className="text-red-600"><strong>Error:</strong> {error}</p>
              </div>
            ) : (
              <div>
                <p><strong>Kittens found:</strong> {kittens.length}</p>
                <pre className="mt-2 bg-background p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(kittens, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-secondary/40 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Test API Endpoints</h2>
            <div className="space-y-2">
              <button 
                onClick={async () => {
                  try {
                    const res = await fetch('/api/kittens')
                    console.log('Direct API test:', res.status, await res.text())
                  } catch (e) {
                    console.error('Direct API test error:', e)
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Test /api/kittens
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 