# Github Changelog

A Cloudflare Worker webhook bridge for posting formatted Github release notifications in Discord

## Install

You can use [wrangler](https://github.com/cloudflare/wrangler) to generate a new Cloudflare Workers project based on this template by running the following command from your terminal:

```shell
wrangler generate myapp https://github.com/animafps/github-release
```

Or click:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/animafps/github-changelog)

Then add the Discord webhook url into the environment variables under `DISCORD_URL`

Next when linking to Github add `/github` to the end of your worker's url
