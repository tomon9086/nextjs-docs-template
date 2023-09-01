import { readFile, readdir, stat } from 'fs/promises'
import { relative, resolve } from 'path'

const DOCS_DIR = 'docs'
const EXTENSION = 'md'

const extensionRegex = /(.*)(\..+)$/

const readDirRec = async (
  basePath: string,
  dirname: string,
  originPath = basePath
): Promise<string[]> => {
  const absDirname = resolve(basePath, dirname)
  const docsDir = await readdir(absDirname)
  const nested = await Promise.all(
    docsDir.map(async (p) => {
      const abs = resolve(absDirname, p)
      const filestat = await stat(abs)
      if (filestat.isDirectory()) {
        return readDirRec(abs, '.', originPath)
      } else {
        const fullFilepath = `${relative(originPath, basePath)}/${p}`
        const [_, filepath, ext] = fullFilepath.match(extensionRegex) ?? []

        if (ext.includes(EXTENSION)) {
          return filepath
        } else {
          return undefined
        }
      }
    })
  )

  return nested.flat().filter((p): p is string => !!p)
}

export const readDocPaths = () => readDirRec(DOCS_DIR, '.')

export const readDocFile = async (path: string[]) => {
  const buffer = await readFile(
    resolve(DOCS_DIR, path.join('/') + '.' + EXTENSION)
  )

  return buffer.toString()
}
