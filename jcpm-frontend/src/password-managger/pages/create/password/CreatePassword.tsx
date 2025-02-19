import { RxCrossCircled } from 'react-icons/rx';
import './CreatePassword';
import { onClosePopUp } from '../../../../store/slices';
import { useDispatch } from 'react-redux';
import { FaCopy } from 'react-icons/fa';
import { AppDispatch } from '../../../../store/store';
import { useEffect, useState } from 'react';

export const CreatePassword = () => {
    const dispatch=useDispatch<AppDispatch>()
    
    const [passwordType,setPasswordType]=useState("wordBased");
    const [randomPassword,setRandomPassword]=useState("asdw");

    return (
        <div className=''>
            <div className="create-top-buttons">
              <button type="button" onClick={()=>dispatch(onClosePopUp())}><RxCrossCircled className="create-icon" /></button>
              <button type="submit"><FaCopy />Copy</button>
            </div>
            <div className="">
              <button type="button" onClick={()=>setPasswordType("wordBased")}>word based password</button>
              <button type="submit" onClick={()=>setPasswordType("characterBased")}>random character based password</button>
            </div>
            {
                passwordType=="wordBased" ? (
                <div className="slidecontainer">
                    <p>word based</p>
                    <input type="text" name='randomPassword' value={randomPassword} />
                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                </div>):
                (<div className="slidecontainer">
                    <p>character based</p>
                    <input type="text" name='randomPassword' value={randomPassword} />
                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                </div>)
            }
        </div>
    )
}
