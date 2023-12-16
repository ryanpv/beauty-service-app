import React from 'react'

export default function NewPasswordRequest() {
  // 
  return (
    <div>
      <h2>Request Password Reset</h2>
      <p>Forgot your password? Enter your email address to request a new password.</p>

      
      <div>
        <form>
          <div>
            <label>
              Email Address
            </label>
            <input placeholder='' />
          </div>

          <button>Submit Request</button>
        </form>
      </div>
    </div>
  )
}
