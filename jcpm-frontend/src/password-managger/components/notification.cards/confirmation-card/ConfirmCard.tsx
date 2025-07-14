import { IoIosWarning } from 'react-icons/io'
import { FC } from 'react'
import './ConfirmCard.css'

interface IConfirmCard{
    onConfirm: () => void
    onCancel?: () => void
}

export const ConfirmCard:FC<IConfirmCard> = ({onConfirm,onCancel}) => {
  return (
    <div className='card-notification-container'>
        <div className='confirm-card-main-container'>
            <div className='confir-card-container'>
                <div className='confir-card-warinig'>
                    <h3>Warning</h3>
                </div>
                <div className='confir-card-icon'><IoIosWarning /></div>
                <div className='confir-card-text'>
                    <h4>This action cant be undone</h4>
                </div>
                <div className='confir-card-buttons'>
                    <button onClick={onConfirm}>confirm</button>
                    <button onClick={onCancel}>cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}
