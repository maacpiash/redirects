import { Hono } from 'hono'

type Env = {
	Bindings: {
		KV_NS: KVNamespace
	}
}

const app = new Hono<Env>()

app.get('/:key', async ({ env, req, status, redirect }) => {
	try {
		const url = await env.KV_NS.get(req.param('key'))
		if (url === null) return status(404)
		return redirect(url)
	} catch (e) {
		console.error(e)
		return status(500)
	}
})

export default app
