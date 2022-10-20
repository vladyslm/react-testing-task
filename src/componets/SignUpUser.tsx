import '../App.css';
import React, {useState} from "react";
import useValue from "../hooks/useValue";

interface Payload {
    fullName: string,
    email:string,
    password: string,
    confirm: string
}


function SignUpUser() {
    const {value: fullName, onChange: onChangeFullName, error: fullNameError, onBlur: onFullNameBlur} = useValue()
    const {value: email, onChange: onChangeEmail, error: emailError, onEmail} = useValue();
    const {value: password, onChange: onPasswordChange, error: passwordError, onBlur: onPasswordBlur} = useValue();
    const {value: confirm, onChange: onConfirmChange, error: confirmError, onBlur: onConfirmBlur} = useValue();
    const [submitError, setSubmitError] = useState("");
    const [successMsg, setSuccessMsg] = useState("")

    const singUpUser = async (payload: Payload) => {
        // send form
        setSuccessMsg("Success")
        // redirect or something...
    }


    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        if (fullName === ""){
            setSubmitError("Name required!");
            return;
        }
        if (email === "" || emailError){
            setSubmitError("Email required!");
            return;
        }

        if (password === "" || confirm === ""){
            setSubmitError("Password required!")
            return;
        }

        if (password !== confirm){
            setSubmitError("Passwords do NOT match")
            return;
        }
        setSubmitError("")

        await singUpUser({fullName, email, password, confirm})

        console.log(fullName, email, password, confirm);
    }

    return (
        <>
            <h1 className="legend">Sign Up</h1>
            <form className="sign-up" onSubmit={onSubmit}>
                <label>
                    Full name:
                    <input type="text"
                           placeholder="Enter full name"
                           name="full_name"
                           value={fullName}
                           onChange={onChangeFullName}
                           onBlur={onFullNameBlur}
                    />
                    {fullNameError && <span>{fullNameError}</span>}
                </label>

                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={onChangeEmail}
                        onBlur={onEmail}
                    />
                    {emailError && <span>{emailError}</span>}
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={onPasswordChange}
                        onBlur={onPasswordBlur}
                    />
                    {passwordError && <span>{passwordError}</span>}
                </label>

                <label>
                    Confirm:
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={onConfirmChange}
                        onBlur={onConfirmBlur}
                    />
                    {confirmError && <span>{confirmError}</span>}
                </label>

                <input
                    className="submit-btn"
                    type="submit" value="Submit"
                    data-testid="submit-button"
                />
                {submitError && <span>{submitError}</span>}
            </form>
            {successMsg && <span data-testid="successMsg">{successMsg}</span>}
        </>

    )
}

export default SignUpUser
