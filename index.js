addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (request.method !== 'POST')
        return new Response('Not found', { status: 404 })
    const requestBody = await request.json()
    if (requestBody.action !== 'published')
        return new Response('Error', { status: 500 })

    await fetch(DISCORD_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            embeds: [
                {
                    title: requestBody.release.tag_name,
                    url: requestBody.release.html_url,
                    timestamp: requestBody.release.published_at,
                    fields: parseBody(requestBody.release.body),
                },
            ],
        }),
    }).then(response => console.log(response))

    return new Response('OK')
}

function parseBody(body) {
    const fields = []
    body.split('### ')
        .shift()
        .forEach(val => {
            const split = val.split('\n\n')
            fields.push({ name: split[0], value: split[1] })
        })
    return fields
}
