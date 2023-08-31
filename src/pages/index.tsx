import DefaultLayout from '@/layouts/default'
import Head from 'next/head'
import Link from 'next/link'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <DefaultLayout>
        <div>
          <Link href='hello/world'>hello/world</Link>
        </div>
      </DefaultLayout>
    </>
  )
}

export default HomePage
