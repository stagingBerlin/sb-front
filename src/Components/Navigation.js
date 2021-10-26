import React from 'react'
import { Link } from "react-router-dom"

export default function Navigation() {
    return (
        <>
            <nav className="navigation">
                <ul className="navigation__brand navigation__list">
                    <li className="navigation__brandItem">icon</li>
                    <li className="navigation__brandItem">xyrstaging</li>
                    <li className="navigation__brandItem">about</li>
                </ul>
                <ul className="navigation__auth navigation__list">
                    <li className="navigation__authItem">
                        <Link to="/signup" className="navigation__link">signup</Link>
                    </li>
                    <li className="navigation__authItem">
                        <Link to="/login" className="navigation__link">login</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
