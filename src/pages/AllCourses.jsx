import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const AllCourses = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('q') || '';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;

    axios.get(`${API_BASE}/courses/courses/`, { params })
      .then((res) => setCourses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Could not load courses. Please try again.'))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div style={{ maxWidth: '1200px', margin: '100px auto 60px', padding: '0 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
        {category ? `${category} Courses` : 'All Courses'}
      </h1>
      {search && (
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Showing results for "{search}"
        </p>
      )}

      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      {!loading && !error && courses.length === 0 && (
        <p style={{ color: '#6b7280' }}>No courses found.</p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px',
        marginTop: '16px',
      }}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600, marginBottom: '4px' }}>
                {course.category}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px' }}>{course.title}</h3>
              {course.author?.name && (
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px' }}>{course.author.name}</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>${course.discounted_price ?? course.original_price}</span>
                {course.average_rating > 0 && (
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>
                    ⭐ {course.average_rating} ({course.review_count})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
