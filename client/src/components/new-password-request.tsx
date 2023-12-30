import React from 'react'

const NewPasswordRequest:React.FC = () => {
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const emailInputValue = emailInputRef.current!.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log("email input: ", emailInputValue);

    if (emailRegex.test(emailInputValue)) {
      fetch("https://localhost:3001/password-resets",{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: emailInputValue })
      });
      console.log("is email")
      
    } else {
      console.log("NOT email")
    }
  }

  return (
    <div>
      <h2>Request Password Reset</h2>
      <p>Forgot your password? Enter your email address to request a new password.</p>

      <div>
        <form onSubmit={ submitForm }>
          <div>
            <label>
              Email Address
            </label>
            <input type='email' ref={ emailInputRef } />
          </div>

          <button type='submit'>Submit Request</button>
        </form>
      </div>
    </div>
  )
};

export default NewPasswordRequest;
