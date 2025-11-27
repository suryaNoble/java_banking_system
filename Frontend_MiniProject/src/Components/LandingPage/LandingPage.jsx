import React from 'react'
import Navbar from './Navbar'
import LandingHero from './LandingHero'
import LandingFooter from './LandingFooter'
import HomeTransactionsPreview from '../Transactions/HomeTransactionPreview'
import { useAuth } from '../Context/AuthContext.jsx'

const LandingPage = () => {

const { isLoggedIn, logout } = useAuth();
  return (
    <div>
      <Navbar/>
      <LandingHero/>

      {isLoggedIn && <HomeTransactionsPreview/>}

      <LandingFooter/>
    </div>
  )
}

export default LandingPage
