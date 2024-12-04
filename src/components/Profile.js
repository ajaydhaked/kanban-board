import React from 'react'


function Profile({name, size=100, bgColor='#007BFF', textColor='#FFF'}) {
    
    const ProfileStyle = {
        backgroundColor: bgColor,
        color: textColor,
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: size * 0.4,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
    };
    
    const getInitials = (name) => {
        if (!name) return '??';
        const nameParts = name.trim().split(' ');
        const initials = nameParts.map((part) => part[0].toUpperCase()).slice(0, 2).join('');
        return initials;
    }
    const initials = getInitials(name);
    
    
    return <div style={ProfileStyle}>{initials}</div>;
}

export default Profile