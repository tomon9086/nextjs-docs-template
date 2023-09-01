import { readDocPaths } from '@/api/file'
import SidebarLayout from '@/layouts/sidebar'
import { docsToSidebarItems } from '@/util/sidebar'
import { uuid } from '@/util/uuid'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

type StaticProps = {
  docs: string[]
}

const HomePage = ({ docs }: StaticProps) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <SidebarLayout sidebarItems={docsToSidebarItems(docs)}>
        <ul>
          {docs.map((path) => (
            <li key={uuid()}>
              <Link href={path}>{path}</Link>
            </li>
          ))}
        </ul>
      </SidebarLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const docs = await readDocPaths()

  return {
    props: {
      docs
    }
  }
}

export default HomePage
