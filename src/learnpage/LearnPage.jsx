import React, { useEffect, useState } from 'react';
import './LearnPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../HomePage/footer';
import AfterNavbar from '../components/AfterLoginNavbar';
import LiveSessionCard from '../components/LiveSessionCard';
import { get } from '../services/api';

const LearningDashboard = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inProgress');

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await get('/courses/my-learnings/');
        setEnrollments(response.data);
      } catch (error) {
        console.error('Failed to fetch enrollments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const filteredEnrollments = enrollments.filter((e) =>
    activeTab === 'completed' ? e.progress_percent >= 100 : e.progress_percent < 100
  );

  return (
    <div className="learning-container">
      <AfterNavbar />
      <main style={{ paddingTop: '90px' }}>
        <h2 className="title">My Learning</h2>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'inProgress' ? 'active' : ''}`}
            onClick={() => setActiveTab('inProgress')}
          >
            In Progress
          </button>
          <button
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        {loading && <p style={{ color: '#6b7280', padding: '24px' }}>Loading your courses...</p>}

        {!loading && filteredEnrollments.length === 0 && (
          <p style={{ color: '#6b7280', padding: '24px' }}>
            {activeTab === 'completed'
              ? "You haven't completed any courses yet."
              : "You don't have any courses in progress. Browse "}
            {activeTab !== 'completed' && <Link to="/all-courses">All Courses</Link>}
            {activeTab !== 'completed' && ' to get started.'}
          </p>
        )}

        {filteredEnrollments.map((enrollment) => {
          const resumeLink = enrollment.last_watched_video
            ? `/video/${enrollment.course.id}/${enrollment.last_watched_video.id}`
            : `/video/${enrollment.course.id}`;

          return (
            <div className="course-card-wrapper" key={enrollment.id}>
              <div className="course-header final-layout">
                <div className="course-left">
                  <Link to={resumeLink} className="course-title-link">
                    <h3>{enrollment.course.title}</h3>
                  </Link>
                  <p>Course : {Math.round(enrollment.progress_percent)}% completed</p>
                  <div className="progress-bar">
                    <div className="progress python" style={{ width: `${enrollment.progress_percent}%` }}></div>
                  </div>
                </div>

                <div className="course-right">
                  <div className="course-box-content">
                    <h4>{enrollment.course.title}</h4>
                    {enrollment.last_watched_video && (
                      <p className="video-info">
                        <FontAwesomeIcon icon={faPlay} /> {enrollment.last_watched_video.title}
                      </p>
                    )}
                  </div>
                  <Link to={resumeLink} className='res-btn'>Resume</Link>
                </div>

                <span className="more-options">•••</span>
              </div>

              <div className="batch-section">
                {enrollment.batch?.id && <LiveSessionCard batchId={enrollment.batch.id} />}

                <div className="quiz-section row-section">
                  <div className="left-content">
                    <FontAwesomeIcon icon={faFileAlt} />
                    <div>
                      <Link to="/quiz1">Module Quiz: {enrollment.course.title}</Link>
                      <p>Graded Quiz</p>
                    </div>
                  </div>
                  <div className="right-content">
                    <button className="test-btn" onClick={() => navigate('/quiz1')}>Proceed to Test</button>
                  </div>
                </div>

                <div className="assignment-section row-section">
                  <div className="left-content">
                    <FontAwesomeIcon icon={faFileAlt} />
                    <div>
                      <Link to="/assignment">Submit your assignment</Link>
                      <p>Graded Assignment</p>
                    </div>
                  </div>
                  <div className="right-content">
                    <button
                      style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                      onClick={() => navigate('/assignment')}
                    >Submit Now</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

export default LearningDashboard;
