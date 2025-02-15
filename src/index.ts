/*
 * MIT License
 *
 * Copyright (c) 2025 Mohammad Abdul Ahad Chowdhury
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Hono } from 'hono'
import { requestId } from 'hono/request-id'
import type { Env } from './env'
import { validation } from './validation'
import { auth } from './auth'
import { logging } from './logging'

const app = new Hono<Env>()

app.use('*', requestId())
app.use('*', logging())

app.get('/:key', async ({ env, req, json, redirect }) => {
	const key = req.param('key').toLowerCase()
	try {
		const url = await env.KV_NS.get(key)
		if (!url) return json({ error: 'Not Found' }, 404)
		return redirect(url)
	} catch (e) {
		if (e instanceof Error) return json({ error: e.name, details: e.message }, 500)
		return json({ error: 'Unknown error occurred', details: String(e) }, 500)
	}
})

app.post('/', auth(), validation(), async ({ env, req, json }) => {
	const { key, url } = req.valid('json')
	try {
		await env.KV_NS.put(key.toLowerCase(), url)
		return json({ message: 'Saved successfully.' }, 201)
	} catch (e) {
		if (e instanceof Error) {
			if (e.message.includes('429')) return json({ message: e.message }, 429)
			return json({ message: e.message }, 500)
		}
		return json({ message: 'Unknown error occurred!' }, 500)
	}
})

export default app
