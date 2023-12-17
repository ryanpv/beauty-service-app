import React from 'react'

export default function ResetPassword() {
  return (
    <div>
      <h1>Reset your password</h1>

      <div>
        <form>
          <div>
            <label>
              New Password
            </label>
            <input />
          </div>

          <div>
            <label>
              Confirm New Password
            </label>
            <input />
          </div>
          <button type='submit'>Change Password</button>
        </form>
      </div>
    </div>
  )
}
