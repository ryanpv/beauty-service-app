import React from 'react'

export default function GetAuth() {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const igAuth = () => {
    window.location.href = (`https://api.instagram.com/oauth/authorize?client_id=${ process.env.REACT_APP_CLIENT_ID }&redirect_uri=${ process.env.REACT_APP_REDIRECT_URI }&scope=user_profile,user_media&response_type=code`)
  }

  const testBtn = async () => {
    const tester = await fetch(`${ serverUrl }/test-auth`)
  }

  return (
    <div className='flex h-screen'>
      get-auth
      <div className='m-auto'>

      <button onClick={() => igAuth() }>get IG</button>{' '}
      <button onClick={() => testBtn() }>test btn</button>
      </div>
      
    </div>
  )
}
