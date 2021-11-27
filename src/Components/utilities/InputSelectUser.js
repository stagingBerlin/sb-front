import React, { useState } from 'react'
import AvatarImg from './AvatarImg'


export default function InputSelectUser({
    usersToChoose = [], // array of users to filter
    getId // event onClick to extract id of user
}) {
    // console.log(usersToChoose);
    
    const [ searchUser, setSearchUser ] = useState("")
    
    const filteredUser = usersToChoose.filter(user => {
        return (
            user.name.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1
            || 
            user.username.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1
            // ||
            // user.email.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1
        )})
    // console.log(filteredUser);

    const style={
        borderBottom:  searchUser && filteredUser.length !== 0 ? "3px solid #48fb47": "3px solid #ffb900"
    }
   
    return (
        <div className="input-select-user">
            <input 
                type="text" 
                className="input-select-user__input"
                style={style}
                onChange={(e) => setSearchUser(e.target.value)}
                value={searchUser}
                placeholder="Search"

            />
            {
                searchUser ?
                <div className="input-select-user__menu">
                    <div className="input-select-user__counter">
                        {
                            filteredUser.length === 0 ?
                            <span style={{color: "#ffb900"}}>No Users Found</span>
                            :
                            filteredUser.length === 1 ?
                            <span style={{color: "#48fb47"}}> {`${filteredUser.length} user found`}</span>
                            :
                            <span style={{color: "#48fb47"}}> {`${filteredUser.length} users found`}</span>
                        }
                    </div>
                    <div className="input-select-user__users">
                        {
                            filteredUser.map((item, i) => {
                                return (
                                    <div onClick={getId} id={item._id} key={i} className="input-select-user__user">
                                        <h2>{item.username}</h2> 
                                        <p>({item.name})</p>
                                        <AvatarImg
                                            large="3.5"
                                            image={item.avatar}
                                        />
                                    </div>
                            )})
                        }
                    </div>

                </div>
                :
                <></>
            }
        </div>
    )
}
