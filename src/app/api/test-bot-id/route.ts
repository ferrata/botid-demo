import { checkBotId } from "botid/server";
import { bypass, http, HttpResponse, passthrough } from "msw";
import { setupServer } from "msw/node";
import { NextRequest, NextResponse } from "next/server";

const server = setupServer(
  http.post('https://api.vercel.com/bot-protection/v1/is-bot', async ({ request }) => {
    console.log(`[msw] → POST ${request.url}`)
    console.log(`[msw] headers: ${JSON.stringify(Object.fromEntries(request.headers))}`)
    console.log(`[msw] body: ${await request.clone().text()}`)

    try {
      const hopByHop = new Set([
        'transfer-encoding',
        'connection',
        'keep-alive',
        'te',
        'trailers',
        'upgrade',
      ])
      const headers = new Headers()
      request.headers.forEach((value, key) => {
        if (!hopByHop.has(key.toLowerCase())) headers.set(key, value)
      })
      const response = await fetch(
        bypass(
          new Request(request.url, { method: 'POST', headers, body: await request.arrayBuffer() }),
        ),
      )
      const body = await response.clone().text()

      console.log(`[msw] ← ${response.status} ${response.statusText}`)
      console.log(`[msw] body: ${body}`)

      return response
    } catch (error) {
      console.error(`[msw] Error forwarding request:`, error)
      // return HttpResponse.text('Error forwarding request', { status: 500 })
      return passthrough()
    }
  }),
)

server.listen({ onUnhandledRequest: 'bypass' })

export async function POST(_request: NextRequest) {
  const verification = await checkBotId();

  return NextResponse.json(verification, {
    status: verification.isBot ? 403 : 200,
  });
}
