import React, { FC } from 'react'
import './copiedClipBoard.css'
import { FaCheckCircle } from 'react-icons/fa'

interface ICopiedClipBoard{
  input:string
}

export const CopiedClipBoard = () => {
  return (
    <div className='copiedClipBoardMainContainer'>
        <div className='copiedClipBoardContainer'>
          <div className='copiesClipboarMsg'>
            <span>Copied in clipboard! <FaCheckCircle /></span>
          </div>
        </div>
    </div>
  )
}
