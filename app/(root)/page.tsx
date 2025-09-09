import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home = async () => {

  const loggedIn = await getLoggedInUser()

  return (
    <section className='home'>
       <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Bienvenue"
            user={loggedIn?.name || 'Guest'}
            subtext="Accédez à votre compte et gérez vos transactions efficacement."
          
          />

          <TotalBalanceBox
             accounts={[]}
             totalBanks={1}
             totalCurrentBalance={ 20000 }
          
          />
        </header>

        RECENT TRANSACTION
       </div>

       <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 20000 },{currentBalance: 15000}]}
       />
    </section>
  )
}

export default Home