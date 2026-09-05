// Micro Notes CMS - GitHub OAuth Provider for Cloudflare Workers

const GITHUB_CLIENT_ID = 'Ov23liNWa2TbxKZ0L2zp'
const GITHUB_CLIENT_SECRET = '404ecceb1eb38f717b21c641df7d28a464ca1df0'
const CMS_URL = 'https://micro-notes.pages.dev/admin/'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response('', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    // Step 1: Redirect to GitHub authorization
    if (path === '/auth' || path === '/auth/') {
      const state = url.searchParams.get('site_id') 
        ? `https://${url.searchParams.get('site_id')}/admin/`
        : CMS_URL

      const authUrl = new URL('https://github.com/login/oauth/authorize')
      authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID)
      authUrl.searchParams.set('scope', 'repo')
      authUrl.searchParams.set('state', state)

      return Response.redirect(authUrl.toString(), 302)
    }

    // Step 2: GitHub callback - exchange code for token
    if (path === '/callback' || path === '/callback/') {
      const code = url.searchParams.get('code')
      const state = url.searchParams.get('state') || CMS_URL

      if (!code) {
        return new Response('Missing authorization code', { status: 400 })
      }

      try {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'micro-notes-oauth',
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
          return new Response('Failed to obtain access token: ' + JSON.stringify(tokenData), { status: 400 })
        }

        // Redirect back to CMS with token in URL hash
        const redirectUrl = new URL(state)
        redirectUrl.hash = `access_token=${accessToken}&token_type=bearer&provider=github`

        return Response.redirect(redirectUrl.toString(), 302)
      } catch (error) {
        return new Response('OAuth error: ' + error.message, { status: 500 })
      }
    }

    // Health check
    return new Response('OAuth provider is running. Visit /auth to start.', {
      headers: { 'Content-Type': 'text/plain' },
    })
  },
}
