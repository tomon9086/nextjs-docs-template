import DefaultLayout from '@/layouts/default'
import { readFile, readdir, stat } from 'fs/promises'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { relative, resolve } from 'path'

const DOCS_DIR = 'docs'
const EXTENSION = 'md'
const extensionRegex = /(.*)(\..+)$/

type StaticProps = {
  body: string
}

const DocsPage = ({ body }: StaticProps) => {
  return (
    <>
      <Head>
        <title>Docs</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <DefaultLayout>
        <div>{body}</div>
      </DefaultLayout>
    </>
  )
}

export const getStaticPaths = async () => {
  const readDirRec = async (pathname: string): Promise<string[]> => {
    const docsDir = await readdir(pathname)
    const nested = await Promise.all(
      docsDir.map(async (p) => {
        const abs = resolve(pathname, p)
        const filestat = await stat(abs)
        if (filestat.isDirectory()) {
          return readDirRec(abs)
        } else {
          return `${relative(DOCS_DIR, pathname)}/${p}`.replace(
            extensionRegex,
            '$1'
          )
        }
      })
    )

    return nested.flat()
  }

  const docs = await readDirRec(DOCS_DIR)

  return {
    paths: docs.map((doc) => {
      return {
        params: {
          slug: doc.split('/')
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<StaticProps> = async (ctx) => {
  const rawSlug = ctx.params?.slug
  const slug = typeof rawSlug === 'string' ? [rawSlug] : rawSlug ?? []
  const buffer = await readFile(
    resolve(DOCS_DIR, slug.join('/') + '.' + EXTENSION)
  )

  return {
    props: {
      body: buffer.toString()
    }
  }
}

export default DocsPage
