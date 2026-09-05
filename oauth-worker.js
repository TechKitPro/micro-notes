// Micro Notes CMS - GitHub OAuth Provider for Cloudflare Workers
// 部署到 Cloudflare Workers 后，将 URL 填入 Decap CMS 的 base_url

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const GITHUB_CLIENT_ID = 'Ov23liNWa2TbxKZ0L2zp'
const GITHUB_CLIENT_SECRET = '404ecceb1eb38f717b21c641df7d28a464ca1df0'
const CMS_URL = 'https://micro-notes.pages.dev/admin/'

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  // CORS headers for preflight
  if (request.method === 'OPTIONS') {
    return new Response('', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  // Step 1: Redirect to GitHub authorization page
  if (path === '/auth' || path === '/auth/') {
    const authUrl = new URL('https://github.com/login/oauth/authorize')
    authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID)
    authUrl.searchParams.set('scope', 'repo')
    authUrl.searchParams.set('state', request.headers.get('Referer') || CMS_URL)

    return Response.redirect(authUrl.toString(), 302)
  }

  // Step 2: GitHub callback - exchange code for token
  if (path === '/callback' || path === '/callback/') {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state') || CMS_URL

    if (!code) {
      return new Response('Missing code parameter', { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (!accessToken) {
      return new Response('Failed to get access token: ' + JSON.stringify(tokenData), { status: 400 })
    }

    // Redirect back to CMS with token in URL hash
    // Decap CMS reads the token from the hash
    const redirectUrl = new URL(state)
    redirectUrl.hash = `access_token=${accessToken}&token_type=bearer&provider=github`

    return Response.redirect(redirectUrl.toString(), 302)
  }

  // Success page for manual testing
  if (path === '/' || path === '/success') {
    return new Response('OAuth provider is running. Use /auth to start authentication.', {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  return new Response('Not found', { status: 404 })
}
