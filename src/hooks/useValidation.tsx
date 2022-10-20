import {useState} from "react";

const SIMPLE_REGEX = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm)

interface IError {
    requiredErr: string
    emailErr: string
}

const DefaultErrors = {
    requiredErr: "Required!",
    emailErr: "Provide a valid email"
}

const useValidation = (value: string, errorMsg: IError = DefaultErrors) => {
    const [error, setError] = useState("");

    const onBlur = () => {
        setError(!value ? DefaultErrors.requiredErr : "");
    }

    const onEmail = () => {
        const isCorrect = SIMPLE_REGEX.test(value);
        setError(isCorrect ? "" : DefaultErrors.emailErr)
    }


    return {error, onBlur,onEmail}
}

export default useValidation
