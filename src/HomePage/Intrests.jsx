import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import dsIcon from './image/datascience.svg'
import mbaIcon from './image/mba.svg'
import aiIcon from './image/ai.svg'
import codeIcon from './image/code.svg'
import Topcourses from './Topcourses'
import LearnerBenifits from './LearnerBenifits'
import FrequentlyAsked from './FrequentlyAsked'

export default function Intrests(){
  return (
  <>
    <section className="categories">
      <h4>Choose Your <span className="accent">Area Of Interest</span></h4>
      <div className="categories-grid">
        <Link className="category-card" to="/all-courses?category=Data Science">
          <div className="cat-left">
            <div className="cat-title">Data Science</div>
            <span className="cat-sub">View Courses</span>
          </div>
          <div className="cat-icon"><img src={dsIcon} alt="Data Science"/></div>
        </Link>

        <Link className="category-card" to="/all-courses?category=MBA Course">
          <div className="cat-left">
            <div className="cat-title">MBA Course</div>
            <span className="cat-sub">View Courses</span>
          </div>
          <div className="cat-icon"><img src={mbaIcon} alt="MBA"/></div>
        </Link>

        <Link className="category-card" to="/all-courses?category=AI & ML">
          <div className="cat-left">
            <div className="cat-title">AI & ML</div>
            <span className="cat-sub">View Courses</span>
          </div>
          <div className="cat-icon"><img src={aiIcon} alt="AI & ML"/></div>
        </Link>

        <Link className="category-card" to="/all-courses?category=Software & Tech">
          <div className="cat-left">
            <div className="cat-title">Software & Tech</div>
            <span className="cat-sub">View Courses</span>
          </div>
          <div className="cat-icon"><img src={codeIcon} alt="Software & Tech"/></div>
        </Link>

      </div>
    </section>
    
    <section className="promo-banner">
      <svg className="promo-wave" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
        <path d="M0,40 C200,120 400,0 600,60 C800,120 1000,40 1200,80 L1200,200 L0,200 Z" fill="#0b61ff" opacity="0.14" />
        <path d="M0,80 C200,10 400,140 600,80 C800,20 1000,100 1200,60 L1200,200 L0,200 Z" fill="#ffffff" opacity="0.06" />
      </svg>

      <div className="promo-content">
        <h2><span className="promo-big">25% OFF*</span></h2>
        <h3 className="promo-title">Today's Special</h3>
        <p className="promo-sub">Get a Discount for Every Course Order only Valid for Today.!</p>
      </div>

      <div className="promo-dots" aria-hidden>
        <span className="dot" />
        <span className="dot" />
        <span className="dot active" />
      </div>
    </section>

    <Topcourses />
    <LearnerBenifits />
    <FrequentlyAsked />
  </>
  )
}
