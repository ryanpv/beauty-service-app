import React from 'react'

const ResetPassword:React.FC = () => {
  const newPassRef = React.useRef<HTMLInputElement | null>(null);
  const confirmNewPassRef = React.useRef<HTMLInputElement | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('recovery-token');

  const [error, setError] = React.useState("");
  
  const seeValue = (event: React.FormEvent) => {
    event.preventDefault();
    const newPassVal = newPassRef.current?.value;
    console.log(newPassVal);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
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

      setError("");
    } else {
      setError("Passwords do not match.");
    }

    newPassRef.current!.value = '';
    confirmNewPassRef.current!.value = '';
  };

  return (
    <div>
      <h1>Reset your password</h1>
      
      { error !== "" && 
        <>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">ERROR: </strong>
          <span className="block sm:inline">{ error }</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        </>
        }

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
