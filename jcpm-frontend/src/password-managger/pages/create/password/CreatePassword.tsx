import { RxCrossCircled } from 'react-icons/rx';
import { onClosePopUp } from '../../../../store/slices';
import { useDispatch } from 'react-redux';
import { FaCopy } from 'react-icons/fa';
import { AppDispatch } from '../../../../store/store';
import { useEffect, useState } from 'react';
import './CreatePassword.css';

export const CreatePassword = () => {

    const dispatch=useDispatch<AppDispatch>()
    
    const [passwordType,setPasswordType]=useState("wordBased");
    const [randomPassword,setRandomPassword]=useState("asdw");
    const [rangeValue,setRangeValue]=useState(10);

    return (
        <div className='create-passowrd-container'>
            <div className="create-top-buttons">
              <button type="button" onClick={()=>dispatch(onClosePopUp())}><RxCrossCircled className="create-icon" /></button>
              <button type="submit"><FaCopy />Copy</button>
            </div>
            <div className='create-password-container2'>
                <div className="password-type-container">
                  <button type="button" style={{borderRight: "1px solid #6e6e75"}} onClick={()=>setPasswordType("wordBased")}>word based password</button>
                  <button type="submit" onClick={()=>setPasswordType("characterBased")}>characters based password</button>
                </div>
                {
                    passwordType=="wordBased" ? (
                    <>
                    <span className='type-selected'>word based</span>
                    <div className="slidecontainer">
                        <input type="text" name='randomPassword' value={randomPassword} />
                        <input type="range" min="3" max="10" step="1" value={rangeValue} onChange={e=>setRangeValue(Number(e.target.value))} />

                    </div>
                    </>
                    ):
                    (
                    <>
                    <span className='type-selected'>character based</span>
                    <div className="slidecontainer">
                        <input type="text" name='randomPassword' value={randomPassword} className='password-field-create-password'/>
                        <input type="range" min="8" max="30" step="1" value={rangeValue} onChange={e=>setRangeValue(Number(e.target.value))} />
                    </div>
                    </>
                    )
                }
            </div>
        </div>
    )
}
