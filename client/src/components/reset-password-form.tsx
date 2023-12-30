import React from 'react'

const ResetPassword:React.FC = () => {
  const newPassRef = React.useRef<HTMLInputElement | null>(null);
  const confirmNewPassRef = React.useRef<HTMLInputElement | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('recovery-token');
  
  const seeValue = (event: React.FormEvent) => {
    event.preventDefault();
    const newPassVal = newPassRef.current?.value;
    console.log(newPassVal);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newPassValue = newPassRef.current?.value;
      const confirmPassValue = confirmNewPassRef.current?.value;
  
      if (newPassValue !== undefined && newPassValue === confirmPassValue) {
        fetch(`https://localhost:3001/password-resets/${ token }`,{
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ newPassword: newPassValue })
        });
      } else {
        console.log("Passwords do not match")
      }
  
      newPassRef.current!.value = '';
      confirmNewPassRef.current!.value = '';
    } catch (error) {
      console.log("Password reset error: ", error)
    }
  };

  return (
    <div>
      <h1>Reset your password</h1>

      <div>
        <form onSubmit={submitForm}>
          <div>
            <label>
              New Password
            </label>
            <input type='text' onChange={(e) => seeValue(e)} ref={ newPassRef }/>
          </div>

          <div>
            <label>
              Confirm New Password
            </label>
            <input type='text' ref={ confirmNewPassRef }/>
          </div>
          <button type='submit'>Change Password</button>
        </form>
      </div>
    </div>
  )
};

export default ResetPassword;
