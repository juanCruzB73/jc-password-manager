import { ChangeEvent,useState } from "react";

interface FormValue{
    [key:string]:string|null;
}

export const useForm = <T extends FormValue>(intialState:T) => {

    const [formState,setFormState]=useState<T>(intialState)

    const onInputChange=({target}:ChangeEvent<HTMLInputElement>)=>{
        
        const {name,value}=target;

        setFormState({
            ...formState,
            [`${name}`]:value
        })
    }

    const onResetForm=()=>{
        setFormState(intialState)
    }

    return {
        ...formState,formState,onInputChange,onResetForm
  }
}
