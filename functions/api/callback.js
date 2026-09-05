// OAuth 回调 - 用 code 换取 access token，然后重定向回 CMS
const GITHUB_CLIENT_ID = 'Ov23liNWa2TbxKZ0L2zp'
const GITHUB_CLIENT_SECRET = '404ecceb1eb38f717b21c641df7d28a464ca1df0'
const CMS_URL = 'https://micro-notes.pages.dev/admin/'

export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)

  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state') || CMS_URL

  if (!code) {
    return new Response('Missing authorization code', { status: 400 })
  }

  try {
    // 用 code 换取 access token
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

    // 重定向回 admin 页面，通过 URL hash 传递 token
    // Netlify CMS 会自动读取 URL hash 中的 token 并完成登录
    const redirectUrl = new URL('https://micro-notes.pages.dev/admin/')
    redirectUrl.hash = `access_token=${accessToken}&token_type=bearer&provider=github`

    return Response.redirect(redirectUrl.toString(), 302)
  } catch (error) {
    return new Response('OAuth error: ' + error.message, { status: 500 })
  }
}
