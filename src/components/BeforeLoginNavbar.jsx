import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavigationBar.css'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'

export default function NavigationBar(){
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/all-courses${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
  }

  return (
    <nav className="nav-root">
      <div className="nav-left">
        <Link to="/" className="logo-container">
          <span className="logo-icon"><img src={logo} alt="logo" /></span>
          <span className="logo-text">LearnPro</span>
        </Link>
      </div>

      <div className="nav-center">
        <form className="search-wrap" onSubmit={handleSearch}>
          <input
            className="nav-search"
            placeholder="What do you like to learn ?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <FontAwesomeIcon icon={faSliders} />
          </button>
        </form>
      </div>

      <div className="nav-right">
        <Link to="/login" className="btn-primary">Log in</Link>
        <Link to="/signup" className="btn-outline">Sign Up</Link>
      </div>
    </nav>
  )
}
