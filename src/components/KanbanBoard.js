import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TickedCard from './TickedCard'
import Header from './Header'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import profileColorCombos from './data/Profile'
import PriorityIcons from './data/PriorityIcons';
import Profile from './Profile';
import './css/KanbanBoard.css'

const priorityMap = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent'
}

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    let localGroupBy = localStorage.getItem("groupBy");
    let localSortBy = localStorage.getItem("sortBy");
    if (localGroupBy === null) {
        localGroupBy = 'status';
    }
    if (localSortBy === null) {
        localSortBy = 'priority';
    }
    const [groupBy, setGroupBy] = useState(localGroupBy);
    const [sortBy, setSortBy] = useState(localSortBy);
    useEffect(() => {
        axios
          .get('https://api.quicksell.co/v1/internal/frontend-assignment')
          .then((response) => {
            setTickets(response.data.tickets);
            setUsers(response.data.users.reduce((acc, user) => {
                acc[user.id] = user;
                acc[user.id].colorCombo = profileColorCombos[Math.floor(Math.random() * profileColorCombos.length)];
                return acc;
            }, {}));
          })
          .catch((error) => {
            console.error('Error fetching data', error);
          });
    }, []);
    
    const getGroupName = (group)=> {
        if (groupBy === 'status') {
            return group;
        }
        if (groupBy === 'user') {
            return users[group].name;
        }
        if (groupBy === 'priority') {
            return priorityMap[group];
        }
    }
        
    const groupTickets = (groupBy) => {
        if (groupBy === 'status') {
            return tickets.reduce((groups, ticket) => {
                (groups[ticket.status] = groups[ticket.status] || []).push(ticket);
                return groups;
            }, {});
        }
        
        if (groupBy === 'user') {
            return tickets.reduce((groups, ticket) => {
                (groups[ticket.userId] = groups[ticket.userId] || []).push(ticket);
                return groups;
            }, {});
        }
        
        if (groupBy === 'priority') {
            return tickets.reduce((groups, ticket) => {
                (groups[ticket.priority] = groups[ticket.priority] || []).push(ticket);
                return groups;
            }, {});
        }
    }
    
    const sortTickets = (groupedTickets) => {
        for (const group in groupedTickets) {
            if (sortBy === 'priority') {
                groupedTickets[group].sort((a, b) => b.priority - a.priority);
            }
            else if (sortBy === 'title') {
                groupedTickets[group].sort((a,b)=> a.title.localeCompare(b.title));
            }
        }
        return groupedTickets;
    }
    const groupedTickets = groupTickets(groupBy);
    const sortedTickets = sortTickets(groupedTickets);
    return (
        <>
            <Header groupBy={groupBy} setGroupBy={setGroupBy} sortBy={sortBy} setSortBy={setSortBy} />
            <div className="board">
                {Object.keys(sortedTickets).map((group) => (
                    <div className='column' key={group}>
                        <h3 style={ticketStyles.headingStyle}>
                            <div style={ticketStyles.groupStyle}>
                            {groupBy === 'status' && <PiDotsThreeOutlineFill />}
                            {groupBy === 'priority' && PriorityIcons[group]}
                            {groupBy === 'user' && <Profile name={users[group].name} size={20} bgColor={users[group].colorCombo.backgroundColor} textColor={users[group].colorCombo.textColor} />}
                            &nbsp;{getGroupName(group)}
                            &nbsp;<span style={{color:"dimgray", fontWeight:"normal", alignItems:"center"}}>{sortedTickets[group].length}</span>
                            </div>
                            <div style={ticketStyles.groupStyle}>
                                <FaPlus />&nbsp;
                                <PiDotsThreeOutlineFill />
                            </div> 
                        </h3>
                        {sortedTickets[group].map((ticket)=> {
                            return <TickedCard ticket={ticket} users={users} key={ticket.id} groupBy={groupBy} sortBy={sortBy} />
                        })}
                    </div>
                ))}
            </div>
        </>
    )
}
{/* <PiDotsThreeOutlineFill /> */}
const ticketStyles = {
    headingStyle: {
        display:"flex",
        justifyContent:"space-between",
        width:"80%"
    },
    groupStyle: {
        display:"flex",
        alignItems:"center",
        fontWeight:"bold",
        fontSize:"13px"
    }
}

export default KanbanBoard