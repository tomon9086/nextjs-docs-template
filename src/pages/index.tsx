import DefaultLayout from '@/layouts/default'
import Head from 'next/head'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <DefaultLayout>
        <div>Hello, World!</div>
      </DefaultLayout>
    </>
  )
}

export default HomePage
