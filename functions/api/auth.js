// OAuth 授权入口 - 重定向到 GitHub 授权页面
const GITHUB_CLIENT_ID = 'Ov23liNWa2TbxKZ0L2zp'
const CMS_URL = 'https://micro-notes.pages.dev/admin/'

export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)

  // 从 site_id 参数或 state 参数获取回调地址
  const siteId = url.searchParams.get('site_id')
  const state = siteId ? `https://${siteId}/admin/` : (url.searchParams.get('state') || CMS_URL)

  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID)
  authUrl.searchParams.set('scope', 'repo')
  authUrl.searchParams.set('state', state)
  authUrl.searchParams.set('redirect_uri', 'https://micro-notes.pages.dev/api/callback')

  return Response.redirect(authUrl.toString(), 302)
}
