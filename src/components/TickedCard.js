import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import Profile from './Profile';
import './css/TickedCard.css'
import profileColorCombos from './data/Profile'

function TickedCard({ticket,users,groupBy,sortBy}) {
  let colorCombo = profileColorCombos[Math.floor(Math.random() * profileColorCombos.length)];
  return (
    <div className="ticket-card">
      <div>
        <div className="ticket-card-first-row"><span>{ticket.id}</span></div>
        <div className='ticket-card-second-row'>{ticket.title}</div>
        <div className='ticket-card-third-row'>{ticket.tag[0]}</div>
      </div>
      <div >
        {groupBy !== 'user' && <Profile name={users[ticket.userId].name} size={20} bgColor={colorCombo.backgroundColor} textColor={colorCombo.textColor} />}
      </div>
    </div>
  )
}

export default TickedCard