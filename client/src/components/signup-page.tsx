import React from 'react'

export default function SignupPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <p><i>Create an account to track your appointments or book a new one</i></p>

      <div>
        <form>
          <div>
            <label>Email Address</label>
            <input />
          </div>

          <div>
            <label>Phone Number</label>
            <input />
          </div>

          <div>
            <label>Password</label>
            <input />
          </div>

          <div>
            <label>Confirm Password</label>
            <input />
          </div>

          <div>
            <button>Continue</button>
          </div>
        </form>
      </div>

    <div>SEPARATING LINE ***</div>

    <div>
      <a href='#'>Have an account? Go to the login page</a>
    </div>

    </div>
  )
}
