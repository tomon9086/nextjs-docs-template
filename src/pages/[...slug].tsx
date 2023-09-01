import { readDocFile, readDocPaths } from '@/api/file'
import SidebarLayout from '@/layouts/sidebar'
import { docsToSidebarItems } from '@/util/sidebar'
import { marked } from 'marked'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import sanitize from 'sanitize-html'
import 'zenn-content-css'

type StaticProps = {
  docs: string[]
  bodyHtml: string
}

const DocsPage = ({ docs, bodyHtml }: StaticProps) => {
  return (
    <>
      <Head>
        <title>Docs</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <SidebarLayout sidebarItems={docsToSidebarItems(docs)}>
        <div
          className='znc'
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        ></div>
      </SidebarLayout>
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
  const docs = await readDocPaths()

  return {
    props: {
      docs,
      bodyHtml: sanitize(marked(bodyMd))
    }
  }
}

export default DocsPage
