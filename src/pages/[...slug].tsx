import { readDocFile, readDocPaths } from '@/api/file'
import DefaultLayout from '@/layouts/default'
import { marked } from 'marked'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import sanitize from 'sanitize-html'

type StaticProps = {
  bodyHtml: string
}

const DocsPage = ({ bodyHtml }: StaticProps) => {
  return (
    <>
      <Head>
        <title>Docs</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <DefaultLayout>
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }}></div>
      </DefaultLayout>
    </>
  )
}

export const getStaticPaths = async () => {
  const docs = await readDocPaths()

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
  const bodyMd = await readDocFile(slug)

  return {
    props: {
      bodyHtml: sanitize(marked(bodyMd))
    }
  }
}

export default DocsPage
