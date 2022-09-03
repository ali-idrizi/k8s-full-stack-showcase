import Link from 'next/link'
import React from 'react'

import withAuth, { WithAuth } from '@/hocs/withAuth'
import styles from '@/pages/index.module.css'

export const getServerSideProps = withAuth(() => {
  return {
    props: {},
  }
})

const About: React.FC<WithAuth> = ({ auth }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Page {auth.userId}</h1>

      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  )
}

export default About
