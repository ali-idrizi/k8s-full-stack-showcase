import { gssp } from '@/hocs'
import { useAuth } from '@/hooks'
import { EmptyLayout } from '@/layouts'
import { PageWithLayout } from '@/utils/types'
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export const getServerSideProps = gssp(() => {
  return {
    props: {},
  }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const About: PageWithLayout<Props> = () => {
  const auth = useAuth()

  return (
    <div>
      <h1>About Page {auth.userId}</h1>

      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  )
}

About.getLayout = (page) => {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default About
