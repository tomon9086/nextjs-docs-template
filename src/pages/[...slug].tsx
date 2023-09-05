import { readDocFile, readDocPaths } from '@/api/file'
import SidebarLayout from '@/layouts/sidebar'
import { docsToSidebarItems } from '@/util/sidebar'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import 'zenn-content-css'
import markdownToHtml from 'zenn-markdown-html'

type StaticProps = {
  docs: string[]
  title: string
  bodyHtml: string
}

const DocsPage = ({ docs, title, bodyHtml }: StaticProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <SidebarLayout sidebarItems={docsToSidebarItems(docs)}>
        {/* To show filename as page title, uncomment next line */}
        {/* <h1>{title}</h1> */}
        <div
          className='znc'
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
         />
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
  const title = decodeURI(slug.slice(-1)[0] ?? '')
  const bodyMd = await readDocFile(slug)
  const docs = await readDocPaths()

  return {
    props: {
      docs,
      title,
      bodyHtml: markdownToHtml(bodyMd)
    }
  }
}

export default DocsPage
