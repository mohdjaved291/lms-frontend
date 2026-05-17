import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AfterNavbar from "../components/AfterLoginNavbar";
import Footer from "../HomePage/footer";
import SubmitPopup from "../popup/SubmitPopup";
import Loaderpopup from "../popup/Loaderpopup";
import MissingDetails from "../popup/MissingDetails";
import LeaveContinue from "../popup/LeaveContinue";

const AssignmentPage2 = () => {
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = useState("Module 1");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showMissingPopup, setShowMissingPopup] = useState(false);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const modules = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ALLOWED_FORMATS = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'];
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const invalid = [];

    const valid = files.filter((file) => {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!ALLOWED_FORMATS.includes(ext)) {
        invalid.push(`"${file.name}" — unsupported format. Allowed: ${ALLOWED_FORMATS.join(', ')}`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        invalid.push(`"${file.name}" — exceeds 50 MB limit.`);
        return false;
      }
      return true;
    });

    if (invalid.length > 0) {
      alert(`The following files were rejected:\n\n${invalid.join('\n')}`);
    }

    if (valid.length > 0) {
      setAttachments([...attachments, ...valid]);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    },
    mainContainer: {
      display: "flex",
      marginTop: isMobile ? "60px" : "70px",
      minHeight: "calc(100vh - 70px)",
      flexDirection: isMobile ? "column" : "row",
    },
    mobileMenuBtn: {
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      background: "white",
      border: "none",
      borderBottom: "1px solid #e5e7eb",
      width: "100%",
      fontSize: "14px",
      fontWeight: "500",
      color: "#3b82f6",
      cursor: "pointer",
    },
    sidebar: {
      width: isMobile ? "100%" : "260px",
      background: "white",
      borderRight: isMobile ? "none" : "1px solid #e5e7eb",
      padding: isMobile ? "0" : "24px 0",
      flexShrink: 0,
      display: isMobile ? (sidebarOpen ? "block" : "none") : "block",
      position: isMobile ? "relative" : "static",
      borderBottom: isMobile ? "1px solid #e5e7eb" : "none",
    },
    sidebarHeader: {
      padding: isMobile ? "16px" : "0 20px 20px",
      borderBottom: "1px solid #e5e7eb",
    },
    sidebarTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "600",
      color: "#111827",
      margin: 0,
    },
    sidebarSubtitle: {
      fontSize: isMobile ? "13px" : "14px",
      color: "#6b7280",
      margin: "4px 0 0",
    },
    sidebarSection: {
      padding: "16px 0",
      borderBottom: "1px solid #e5e7eb",
    },
    sidebarSectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "0 16px" : "0 20px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#111827",
      cursor: "pointer",
    },
    moduleList: {
      listStyle: "none",
      padding: 0,
      margin: "12px 0 0",
    },
    moduleItem: {
      display: "flex",
      alignItems: "center",
      gap: isSmallMobile ? "10px" : "14px",
      padding: isMobile ? "12px 16px 12px 20px" : "14px 20px 14px 24px",
      fontSize: isMobile ? "14px" : "15px",
      color: "#6b7280",
      cursor: "pointer",
      transition: "all 0.2s",
      position: "relative",
    },
    moduleItemActive: {
      color: "#111827",
      background: "#f0f5ff",
    },
    moduleIndicator: {
      width: isMobile ? "24px" : "28px",
      height: isMobile ? "24px" : "28px",
      borderRadius: "50%",
      background: "#e5e7eb",
      flexShrink: 0,
    },
    moduleIndicatorActive: {
      background: "#dbeafe",
    },
    activeBar: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "4px",
      background: "#3b82f6",
      borderRadius: "0 4px 4px 0",
    },
    sidebarMenuItem: {
      padding: isMobile ? "12px 16px" : "14px 20px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#111827",
      cursor: "pointer",
    },
    content: {
      flex: 1,
      padding: isSmallMobile ? "16px 12px" : isMobile ? "20px 16px" : "24px 40px",
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: isSmallMobile ? "11px" : "13px",
      color: "#6b7280",
      marginBottom: "8px",
      flexWrap: "wrap",
    },
    breadcrumbActive: {
      color: "#3b82f6",
    },
    pageTitle: {
      fontSize: isSmallMobile ? "18px" : isMobile ? "20px" : "24px",
      fontWeight: "600",
      color: "#111827",
      margin: "0 0 20px",
    },
    taskCard: {
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: isSmallMobile ? "8px" : "12px",
      padding: isSmallMobile ? "14px 12px" : isMobile ? "16px 18px" : "20px 24px",
      marginBottom: "20px",
    },
    taskHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isSmallMobile ? "flex-start" : "flex-start",
      marginBottom: "16px",
      flexDirection: isSmallMobile ? "column" : "row",
      gap: isSmallMobile ? "12px" : "0",
    },
    taskInfo: {
      display: "flex",
      alignItems: "flex-start",
      gap: isSmallMobile ? "10px" : "12px",
    },
    taskIcon: {
      width: isSmallMobile ? "32px" : "40px",
      height: isSmallMobile ? "32px" : "40px",
      background: "#f3f4f6",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isSmallMobile ? "16px" : "20px",
    },
    taskTitle: {
      fontSize: isSmallMobile ? "14px" : "16px",
      fontWeight: "600",
      color: "#111827",
      margin: 0,
    },
    taskMeta: {
      fontSize: isSmallMobile ? "12px" : "13px",
      color: "#6b7280",
      margin: "4px 0 0",
    },
    submittedBadge: {
      fontSize: isSmallMobile ? "12px" : "13px",
      color: "#3b82f6",
      fontWeight: "500",
    },
    moreIcon: {
      fontSize: "20px",
      color: "#9ca3af",
      cursor: "pointer",
    },
    taskDescription: {
      fontSize: isSmallMobile ? "13px" : "14px",
      color: "#374151",
      lineHeight: "1.7",
      margin: "0 0 16px",
    },
    taskItem: {
      margin: "8px 0",
    },
    pdfAttachment: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: isSmallMobile ? "10px 12px" : "12px 16px",
      background: "#fef2f2",
      borderRadius: "8px",
      marginTop: "16px",
      width: "fit-content",
      maxWidth: "100%",
    },
    pdfIcon: {
      width: isSmallMobile ? "28px" : "32px",
      height: isSmallMobile ? "28px" : "32px",
      background: "#ef4444",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: isSmallMobile ? "10px" : "12px",
      fontWeight: "600",
      flexShrink: 0,
    },
    pdfName: {
      fontSize: isSmallMobile ? "12px" : "14px",
      color: "#3b82f6",
      textDecoration: "underline",
      cursor: "pointer",
      wordBreak: "break-word",
    },
    attachmentsSection: {
      marginTop: "20px",
    },
    attachmentsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
      flexWrap: "wrap",
      gap: "8px",
    },
    attachmentsTitle: {
      fontSize: isSmallMobile ? "14px" : "16px",
      fontWeight: "600",
      color: "#111827",
      margin: 0,
    },
    dueDate: {
      fontSize: isSmallMobile ? "12px" : "14px",
      color: "#ef4444",
      fontWeight: "500",
    },
    textEditor: {
      border: "1px solid #e5e7eb",
      borderRadius: isSmallMobile ? "8px" : "12px",
      overflow: "hidden",
    },
    textArea: {
      width: "100%",
      minHeight: isSmallMobile ? "150px" : "200px",
      padding: isSmallMobile ? "12px" : "16px",
      border: "none",
      outline: "none",
      fontSize: isSmallMobile ? "13px" : "14px",
      color: "#374151",
      resize: "vertical",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    editorToolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isSmallMobile ? "10px 12px" : "12px 16px",
      borderTop: "1px solid #e5e7eb",
      background: "#fafafa",
      flexWrap: "wrap",
      gap: "10px",
    },
    toolbarButtons: {
      display: "flex",
      gap: isSmallMobile ? "2px" : "4px",
      flexWrap: "wrap",
    },
    toolbarBtn: {
      width: isSmallMobile ? "30px" : "36px",
      height: isSmallMobile ? "30px" : "36px",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      background: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isSmallMobile ? "12px" : "14px",
      color: "#6b7280",
    },
    addBtn: {
      background: "#3b82f6",
      color: "white",
      border: "none",
      padding: isSmallMobile ? "8px 20px" : "10px 32px",
      borderRadius: "6px",
      fontSize: isSmallMobile ? "13px" : "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
    submitBtn: {
      background: "#3b82f6",
      color: "white",
      border: "none",
      padding: isSmallMobile ? "12px 24px" : "14px 40px",
      borderRadius: "8px",
      fontSize: isSmallMobile ? "14px" : "16px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "20px",
      width: isMobile ? "100%" : "auto",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <AfterNavbar />

      <div style={styles.mainContainer}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <button style={styles.mobileMenuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
            {sidebarOpen ? "Hide Menu" : "Show Menu"}
          </button>
        )}

        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Web Development</h2>
            <p style={styles.sidebarSubtitle}>Bootcamp</p>
          </div>

          <div style={styles.sidebarSection}>
            <div style={styles.sidebarSectionHeader}>
              <span>Course Material</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>

            <ul style={styles.moduleList}>
              {modules.map((module, index) => (
                <li 
                  key={index} 
                  style={{
                    ...styles.moduleItem,
                    ...(expandedModule === module ? styles.moduleItemActive : {})
                  }}
                  onClick={() => setExpandedModule(module)}
                >
                  {expandedModule === module && <div style={styles.activeBar}></div>}
                  <span style={{
                    ...styles.moduleIndicator,
                    ...(expandedModule === module ? styles.moduleIndicatorActive : {})
                  }}></span>
                  {module}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.sidebarMenuItem}>
            <span>Grades</span>
          </div>

          <div style={{...styles.sidebarMenuItem, cursor: 'pointer'}} onClick={() => {
            if (!description.trim() && attachments.length === 0) {
              navigate('/notifications');
            } else {
              setShowLeavePopup(true);
            }
          }}>
            <span>Notifications</span>
          </div>

          <div style={{...styles.sidebarMenuItem, cursor: 'pointer'}} onClick={() => {
            if (!description.trim() && attachments.length === 0) {
              navigate('/chatwindow');
            } else {
              setShowLeavePopup(true);
            }
          }}>
            <span>Chat with Trainer</span>
          </div>
        </aside>

        {/* Main Content */}
        <main style={styles.content}>
          {/* Breadcrumb */}
          <div style={styles.breadcrumb}>
            <span>Web Development bootcamp</span>
            <span>&gt;</span>
            <span>Task</span>
            <span>&gt;</span>
            <span style={styles.breadcrumbActive}>Task 1</span>
          </div>

          <h1 style={styles.pageTitle}>Mid Term: Task 1</h1>

          {/* Task Card */}
          <div style={styles.taskCard}>
            <div style={styles.taskHeader}>
              <div style={styles.taskInfo}>
                <div style={styles.taskIcon}>📄</div>
                <div>
                  <h3 style={styles.taskTitle}>Task 1</h3>
                  <p style={styles.taskMeta}>Fadil | Sep 18, 2024</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={styles.submittedBadge}>Submitted</span>
                <span style={styles.moreIcon}>⋮</span>
              </div>
            </div>

            <div style={styles.taskDescription}>
              <p style={{ fontWeight: "600", margin: "0 0 12px" }}>**Task: Exploring HTML Algorithms**</p>
              <p style={styles.taskItem}>1. Research And Identify Three Key Algorithms Used In HTML Rendering.</p>
              <p style={styles.taskItem}>2. Explain How These Algorithms Improve The Efficiency Of Web Page Loading.</p>
              <p style={styles.taskItem}>3. Create A Simple HTML Page That Demonstrates The Impact Of One Of These Algorithms In Action.</p>
              <p style={styles.taskItem}>4. Discuss How Understanding These Algorithms Can Enhance Your Problem-Solving Skills In Web Development.</p>
            </div>

            <div style={styles.pdfAttachment}>
              <div style={styles.pdfIcon}>PDF</div>
              <span style={styles.pdfName}>Frame Works and Algorithms.pdf</span>
            </div>
          </div>

          {/* Attachments Section */}
          <div style={styles.attachmentsSection}>
            <div style={styles.attachmentsHeader}>
              <h3 style={styles.attachmentsTitle}>Attachments ({attachments.length})</h3>
              <span style={styles.dueDate}>Due Date 22/09/2024</span>
            </div>

            <div style={styles.textEditor}>
              <textarea
                style={styles.textArea}
                placeholder="Add Description Here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div style={styles.editorToolbar}>
                <div style={styles.toolbarButtons}>
                  <button style={styles.toolbarBtn}>↩</button>
                  <button style={styles.toolbarBtn}>↪</button>
                  <button style={styles.toolbarBtn}>🔗</button>
                  <button style={styles.toolbarBtn}><strong>B</strong></button>
                  <button style={styles.toolbarBtn}>Aa</button>
                  <button style={styles.toolbarBtn}><u>U</u></button>
                  <button style={styles.toolbarBtn}>≡</button>
                  <button style={styles.toolbarBtn}>≡</button>
                  <button style={styles.toolbarBtn}>🖼</button>
                </div>
                <label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    multiple
                  />
                  <span style={styles.addBtn}>Add</span>
                </label>
              </div>
            </div>

            {attachments.length > 0 && (
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {attachments.map((file, index) => (
                  <div key={index} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: "#fef2f2",
                    borderRadius: "8px",
                    border: "1px solid #fecaca",
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      background: "#ef4444",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "600",
                      flexShrink: 0,
                    }}>
                      {file.name.split(".").pop().toUpperCase()}
                    </div>
                    <span style={{ flex: 1, fontSize: "14px", color: "#374151", wordBreak: "break-word" }}>
                      {file.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "#9ca3af", flexShrink: 0 }}>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <button
                      onClick={() => removeAttachment(index)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "18px",
                        lineHeight: 1,
                        flexShrink: 0,
                        padding: "0 4px",
                      }}
                      title="Remove file"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button style={styles.submitBtn} onClick={() => {
              if (!description.trim() && attachments.length === 0) {
                setShowMissingPopup(true);
              } else {
                setShowSubmitPopup(true);
              }
            }}>Submit</button>
          </div>
        </main>
      </div>

      {/* Submit Popup */}
      {showSubmitPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "16px",
        }}>
          <SubmitPopup 
            onContinue={() => {
              setShowSubmitPopup(false);
              setShowLoader(true);
              // Show loader for 2 seconds then show success
              setTimeout(() => {
                setShowLoader(false);
                alert("Assignment submitted successfully!");
              }, 2000);
            }}
            onCancel={() => setShowSubmitPopup(false)}
          />
        </div>
      )}

      {/* Missing Details Popup */}
      {showMissingPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "16px",
        }}>
          <MissingDetails 
            onContinue={() => {
              setShowMissingPopup(false);
              setShowSubmitPopup(true);
            }}
            onCancel={() => setShowMissingPopup(false)}
          />
        </div>
      )}

      {/* Loader Popup */}
      {showLoader && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "16px",
        }}>
          <Loaderpopup />
        </div>
      )}

      {/* Leave Continue Popup */}
      {showLeavePopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "16px",
        }}>
          <LeaveContinue 
            onContinue={() => {
              setShowLeavePopup(false);
              navigate(-1);
            }}
            onCancel={() => setShowLeavePopup(false)}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AssignmentPage2;
