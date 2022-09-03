import withAuth, { WithAuth } from '@/hocs/withAuth'
import Link from 'next/link'

import styles from '@/pages/index.module.css'

export const getServerSideProps = withAuth(() => {
  return {
    props: {},
  }
})

const Home: React.FC<WithAuth> = ({ auth }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome {auth.userId}</h1>

      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  )
}

export default Home
