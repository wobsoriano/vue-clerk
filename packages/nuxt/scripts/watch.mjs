import path from 'node:path'
import nodemon from 'nodemon'

// Unbuild doesn't have a built in watcher mode,
// so we can use nodemon to watch the source files and rebuild the project when they change.
nodemon({
  // eslint-disable-next-line node/prefer-global/process
  watch: [path.relative(process.cwd(), './src')],
  ext: '*',
  exec: 'pnpm run build',
}).on('quit', () => {
  // eslint-disable-next-line node/prefer-global/process
  process.exit()
})
