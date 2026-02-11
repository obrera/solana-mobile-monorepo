import { file, Glob, write } from 'bun'

const glob = new Glob('apps/*/.env.example')

for await (const example of glob.scan('.')) {
  const envPath = example.replace('.env.example', '.env')
  const env = file(envPath)
  if (!(await env.exists())) {
    await write(env, file(example))
    console.log(`Copied ${example} → ${envPath}`)
  }
}
