import React from 'react';
import './LearnPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../HomePage/footer';
import AfterNavbar from '../components/AfterLoginNavbar';
import LiveSessionCard from '../components/LiveSessionCard';

const LearningDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="learning-container">
      <AfterNavbar />
      <main style={{ paddingTop: '90px' }}>
        <h2 className="title">My Learning</h2>
        <div className="tabs">
          <button className="tab active">In Progress</button>
          <button className="tab">Completed</button>
        </div>

        {/* Python Section */}
        <div className="course-card-wrapper">
          <div className="course-header final-layout">

            <div className="course-left">
              <Link to="/next-video-screen" className="course-title-link">
                <h3>Python Development for beginners</h3>
              </Link>
              <p>Course : 20% completed</p>
              <div className="progress-bar">
                <div className="progress python"></div>
              </div>
            </div>

            <div className="course-right">
              <div className="course-box-content">
                <h4>Python Development for beginners</h4>
                <p className="video-info">
                  <FontAwesomeIcon icon={faPlay} /> Video 1.5 (15 minutes)
                </p>
              </div>
              <Link to="/course-overview/python" className='res-btn'>Resume</Link>
            </div>

            <span className="more-options">•••</span>
          </div>

          <div className="batch-section">
            <LiveSessionCard batchId={1} />

            <div className="quiz-section row-section">
              <div className="left-content">
                <FontAwesomeIcon icon={faFileAlt} />
                <div>
                  <span className="link-text">Module Quiz: Introduction to Python development</span>
                  <p>Graded Quiz</p>
                </div>
              </div>
              <div className="right-content">
                <p className="due-text">
                  Due by <span className="due-date">April 19</span>,<br />
                  11:59 PM IST.
                </p>
                <button className="test-btn">Proceed to Test</button>
              </div>
            </div>

            <div className="assignment-section row-section">
              <div className="left-content">
                <FontAwesomeIcon icon={faFileAlt} />
                <div>
                  <span className="link-text">Submit your assignment</span>
                  <p>Graded Assignment</p>
                </div>
              </div>
              <div className="right-content">
                <p className="due-text">
                  Due by <span className="due-date">April 19</span>,<br />
                  11:59 PM IST.
                </p>
                <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Submit Now</button>
              </div>
            </div>
          </div>
        </div>



        {/* Web Section */}
        <div className="course-card-wrapper">
          <div className="course-header final-layout">

            <div className="course-left">
              <h3>Web Development for beginners</h3>
              <p>Course : 20% completed</p>
              <div className="progress-bar">
                <div className="progress python"></div>
              </div>
            </div>

            <div className="course-right">
              <div className="course-box-content">
                <h4>Web Development for beginners</h4>
                <p className="video-info">
                  <FontAwesomeIcon icon={faPlay} /> Video 1.5 (15 minutes)
                </p>
              </div>
              <Link to="/course-overview/web" className='res-btn'>Resume</Link>
            </div>

            <span className="more-options">•••</span>
          </div>

          <div className="batch-section">
            <LiveSessionCard batchId={2} />

            <div className="quiz-section row-section">
              <div className="left-content">
                <FontAwesomeIcon icon={faFileAlt} />
                <div>
                  <span className="link-text">Module Quiz: Introduction to Web development</span>
                  <p>Graded Quiz</p>
                </div>
              </div>
              <div className="right-content">
                <p className="due-text">
                  Due by <span className="due-date">April 19</span>,<br />
                  11:59 PM IST.
                </p>
                <button className="test-btn" onClick={() => navigate('/quiz1')}>Proceed to Test</button>
              </div>
            </div>

            <div className="assignment-section row-section">
              <div className="left-content">
                <FontAwesomeIcon icon={faFileAlt} />
                <div>
                  <span className="link-text">Submit your assignment</span>
                  <p>Graded Assignment</p>
                </div>
              </div>
              <div className="right-content">
                <p className="due-text">
                  Due by <span className="due-date">April 19</span>,<br />
                  11:59 PM IST.
                </p>
                <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Submit Now</button>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />

    </div>
  );
};

export default LearningDashboard;
