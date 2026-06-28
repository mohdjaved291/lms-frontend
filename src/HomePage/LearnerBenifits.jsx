import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './homepage.css'

const FALLBACK_TESTIMONIALS = [
  {
    id: 'fallback-1',
    name: 'John Doe',
    role: 'Acme Solutions',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80',
    rating: 5,
    text: "I completed the GCP Course. It helped me change my career path to DevOps and Cloud. Within 6 months, I secured the Associate Cloud Engineer Certificate, which helped me get a job at Qwinix.",
  },
  {
    id: 'fallback-2',
    name: 'Jane Watson',
    role: 'Beta Innovations',
    avatar: 'https://images.unsplash.com/photo-1545996124-1b9b8f6b6b60?w=80&q=80',
    rating: 5,
    text: "I am a Software Engineer at Accenture. I had good knowledge of SQL server development but wanted to change my career to Data science. I enrolled in the Data Science course and ...",
  },
  {
    id: 'fallback-3',
    name: 'Robert Winger',
    role: 'Tech Innovations',
    avatar: 'https://images.unsplash.com/photo-1545996124-1b9b8f6b6b60?w=80&q=80',
    rating: 5,
    text: "I was an Associate at Capgemini but due to some issues, I had to drop. Then, I started learning Data Science during the lockdown which helped me build strong foundations and exposure to real projects.",
  },
];

export default function LearnerBenifits(){
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    axios.get(`${apiBase}/courses/reviews/`)
      .then((res) => {
        const reviews = Array.isArray(res.data) ? res.data : res.data.results || [];
        if (reviews.length > 0) {
          setTestimonials(
            reviews.slice(0, 3).map((r) => ({
              id: r.id,
              name: r.user?.full_name || 'Anonymous Student',
              role: 'Verified Learner',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80',
              rating: r.rating,
              text: r.feedback,
            }))
          );
        }
      })
      .catch(() => {
        // Keep fallback testimonials if the API call fails
      });
  }, []);

  return (
    <section className="learner-section">
      <h3 className="learner-heading">Learner Benefits</h3>

      <div className="benefits-container">
        <div className="benefits-box">
          <div className="benefits-left">
            <h4>World Class Pedagogy</h4>
            <ul>
              <li>Learn from the World's Best Faculty & Industry Experts</li>
              <li>Learn with fun Hands-on Exercises & Assignments</li>
              <li>Participate in Hackathons & Group Activities</li>
            </ul>
          </div>

          <div className="benefits-right">
            <div className="small-card">
              <div className="small-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#ff8a00"/>
                </svg>
              </div>
              <div className="small-text">4.8/5 Rating</div>
            </div>

            <div className="small-card">
              <div className="small-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10h-3V6a2 2 0 0 0-2-2h-2v2h2v4H7V6h2V4H7a2 2 0 0 0-2 2v4H2v2h3v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4h3v-2z" fill="#ff8a00"/>
                </svg>
              </div>
              <div className="small-text">Gamified Learning</div>
            </div>
          </div>
        </div>

        <div className="benefits-pager">
          <span className="pager-dot active" />
          <span className="pager-dot" />
          <span className="pager-dot" />
        </div>

        <div className="testimonials">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <div className="t-meta">
                <img className="t-avatar-img" src={t.avatar} alt={t.name} />
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
              <div className="t-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p className="t-text">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
