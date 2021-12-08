addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (url.pathname !== '/github' || request.method !== 'POST') {
        return new Response('Not found', { status: 404 })
    }
    const requestBody = await request.json()
    if (!requestBody.release) return new Response('Error', { status: 500 })

    await fetch(DISCORD_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            embeds: [
                {
                    title: requestBody.release.tag_name,
                    url: requestBody.release.html_url,
                    timestamp: requestBody.release.published_at,
                    description: requestBody.release.body,
                },
            ],
        }),
    })

    return new Response('OK')
}
