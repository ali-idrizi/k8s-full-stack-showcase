import { AuthProps, withAuth } from '@/hocs'
import Link from 'next/link'
import React from 'react'

export const getServerSideProps = withAuth(() => {
  return {
    props: {},
  }
})

const About: React.FC<AuthProps> = ({ auth }) => {
  return (
    <div>
      <h1>About Page {auth.userId}</h1>

      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
    </div>
  )
}

export default About
