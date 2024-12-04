import React,{useEffect, useState} from 'react'
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import './css/Header.css'

function Header({groupBy, setGroupBy, sortBy, setSortBy}) {
  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => setPopupVisible(!popupVisible);

  return (
    <div className="header">
      <button onClick={togglePopup} style={{fontSize:"13px", padding:"8px"}}>
        <TbAdjustmentsHorizontal /> Display <FaAngleDown />
      </button>
      <div id="popup" className={popupVisible ? 'show' : ''}>
        <div className="grouping">
          <label>Group By:</label>
          <select value={groupBy} onChange={(e)=>{setGroupBy(e.target.value);localStorage.setItem("groupBy",e.target.value);togglePopup();}}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="sorting">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e)=>{setSortBy(e.target.value);localStorage.setItem("sortBy",e.target.value);togglePopup();}}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  )
}




export default Header