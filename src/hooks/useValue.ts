import React, {useState} from "react";
import useValidation from "./useValidation";

const useValue = (initValue = "") => {
    const [value, setValue] = useState(initValue);
    const {error, onBlur, onEmail} = useValidation(value);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {value, error, onChange, onBlur, onEmail};
}

export default useValue;
