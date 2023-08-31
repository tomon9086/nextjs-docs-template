import { readDocPaths } from '@/api/file'
import DefaultLayout from '@/layouts/default'
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

      <DefaultLayout>
        <ul>
          {docs.map((path) => (
            <li key={path}>
              <Link href={path}>{path}</Link>
            </li>
          ))}
        </ul>
      </DefaultLayout>
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
