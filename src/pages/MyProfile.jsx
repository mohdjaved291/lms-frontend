import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faPen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png';

function MyProfile() {

    // For Profile Edit
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [photoData, setPhotoData] = useState({ image: avatar });
    const [imageFile, setImageFile] = useState(null);



    // Photo Change
    const photoChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/") && file.size <= 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result;
                setPhotoData({ image: imageData });
                localStorage.setItem("profileImage", imageData); // Save to local storage
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload an image under 1MB.");
        }
    };


    //  Remove selected photo
    const RemovePhoto = () => {
        setImageFile(null);
        setPhotoData({ image: avatar });
        localStorage.removeItem("profileImage");
    };


    // Save Photo
    const savePhoto = () => {
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            const photo = { image: imageUrl };

            setPhotoData(photo);
            localStorage.setItem("profileImage", imageUrl);
        }
        setShowProfilePopup(false);
    };



    // Load from local Storage
    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setPhotoData({ image: savedImage });
        }
    }, []);




    // Contact Information
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [savedContact, setSavedContact] = useState(null);


    // Save Contact Information
    const saveContactInfo = () => {
        if (!email || !phone || !linkedin || !github) {
            alert("Please fill all required fields.");
            return;
        }
        const contactData = {
            email,
            phone,
            linkedin,
            github,
        };

        // Save data to localStorage
        localStorage.setItem("contactInfo", JSON.stringify(contactData));
        setShowContactPopup(false);// Optionally close the popup
        setSavedContact(contactData); // store in state

    };

    // Load From Local Storage
    useEffect(() => {
        const storedContact = localStorage.getItem("contactInfo");
        if (storedContact) {
            setSavedContact(JSON.parse(storedContact));
        }
    }, []);



    // For Experience
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [experienceStartMonth, setExperienceStartMonth] = useState("");
    const [experienceStartYear, setExperienceStartYear] = useState("");
    const [experienceEndMonth, setExperienceEndMonth] = useState("");
    const [experienceEndYear, setExperienceEndYear] = useState("");
    const [savedExperience, setSavedExperience] = useState(null);
    const [showWorkPopup, setShowWorkPopup] = useState(false);
    const [isEditExperience, setIsEditExperience] = useState(false);

    // Save Experience
    const saveExperience = () => {
        if (!company || !role || !experienceStartMonth || !experienceStartYear) {
            alert("Please fill all fields");
            return;
        }

        const experienceData = {
            company,
            role,
            start: `${experienceStartMonth} ${experienceStartYear}`,
            end: experienceEndMonth && experienceEndYear
                ? `${experienceEndMonth} ${experienceEndYear}`
                : "Present",
        };

        setSavedExperience(experienceData); // store in state
        setShowWorkPopup(false);            // close popup
        localStorage.setItem("experience", JSON.stringify(experienceData)); //  Save to localStorage
    };

    // Load from localStorage
    useEffect(() => {
        const storedExperience = localStorage.getItem("experience");
        if (storedExperience) {
            setSavedExperience(JSON.parse(storedExperience));
        }
    }, []);

    // Edit Experience
    const editExperience = () => {
        if (!savedExperience) return;

        setCompany(savedExperience.company || "");
        setRole(savedExperience.role || "");

        const [startMonth, startYear] = savedExperience.start.split(" ");
        const [endMonth, endYear] =
            savedExperience.end !== "Present"
                ? savedExperience.end.split(" ")
                : ["", ""];

        setExperienceStartMonth(startMonth);
        setExperienceStartYear(startYear);
        setExperienceEndMonth(endMonth);
        setExperienceEndYear(endYear);

        setShowWorkPopup(true);         // Open the popup/modal
        setIsEditExperience(true);   // Optional: mark as editing
    };

    // Delete Experience
    const deleteExperience = () => {
        if (window.confirm("Are you sure you want to delete?")) {
            setSavedExperience(null);
            localStorage.removeItem("experience");
        }
    };

    // For Education
    const [institution, setInstitution] = useState("");
    const [degree, setDegree] = useState("");
    const [educationStartMonth, setEducationStartMonth] = useState("");
    const [educationStartYear, setEducationStartYear] = useState("");
    const [educationEndMonth, setEducationEndMonth] = useState("");
    const [educationEndYear, setEducationEndYear] = useState("");
    const [savedEducation, setSavedEducation] = useState(null);
    const [showEducationPopup, setShowEducationPopup] = useState(false);
    const [isEditEducation, setIsEditEducation] = useState(false);

    // Save Education 
    const saveEducation = () => {
        if (!institution || !degree || !educationStartMonth || !educationStartYear) {
            alert("Please fill all required fields.");
            return;
        }

        const educationData = {
            institution,
            degree,
            start: `${educationStartMonth} ${educationStartYear}`,
            end:
                educationEndMonth && educationEndYear
                    ? `${educationEndMonth} ${educationEndYear}`
                    : "Present",
        };

        setSavedEducation(educationData);
        setShowEducationPopup(false); // Close popup/modal
        localStorage.setItem("education", JSON.stringify(educationData)); // save to localStorages

    };

    // Load From localStorage
    useEffect(() => {
        const storedEducation = localStorage.getItem("education");
        if (storedEducation) {
            setSavedEducation(JSON.parse(storedEducation));
        }
    }, []);

    // Edit Education
    const editEducation = () => {
        if (!savedEducation) return;

        setInstitution(savedEducation.institution || "");
        setDegree(savedEducation.degree || "");

        const [startMonth, startYear] = savedEducation.start.split(" ");
        const [endMonth, endYear] =
            savedEducation.end !== "Present"
                ? savedEducation.end.split(" ")
                : ["", ""];

        setEducationStartMonth(startMonth);
        setEducationStartYear(startYear);
        setEducationEndMonth(endMonth);
        setEducationEndYear(endYear);

        setShowEducationPopup(true);       // Open popup
        setIsEditEducation(true);       // Optional: set edit mode
    };


    // Delete Education
    const deleteEducation = () => {
        if (window.confirm("Are you sure you want to delete?")) {
            setSavedEducation(null);
            localStorage.removeItem("education");
        }
    };

    // For Work Preferences
    const [showWorkPreferencesPopup, setShowWorkPreferencesPopup] = useState(false);
    const [preferredRole, setPreferredRole] = useState("");
    const [industry, setIndustry] = useState("");
    const [remoteWork, setRemoteWork] = useState("");
    const [savedWorkPreferences, setSavedWorkPreferences] = useState(null);

    // Save Work Preferences
    const saveWorkPreferences = () => {
        const workPreferencesData = {
            preferredRole,
            industry,
            remoteWork
        };
        setSavedWorkPreferences(workPreferencesData);
        setShowWorkPreferencesPopup(false);
        localStorage.setItem("workPreferences", JSON.stringify(workPreferencesData));
    };

    // Load Work Preferences from localStorage
    useEffect(() => {
        const storedWorkPreferences = localStorage.getItem("workPreferences");
        if (storedWorkPreferences) {
            setSavedWorkPreferences(JSON.parse(storedWorkPreferences));
        }
    }, []);

    // For Additional Info
    const [showAdditionalInfoPopup, setShowAdditionalInfoPopup] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeName, setResumeName] = useState("");
    const [additionalLinks, setAdditionalLinks] = useState([{ platform: "LinkedIn", url: "" }]);
    const [savedAdditionalInfo, setSavedAdditionalInfo] = useState(null);

    // Handle Resume Upload
    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "application/pdf") {
                alert("Please upload a PDF file only.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB.");
                return;
            }
            setResumeFile(file);
            setResumeName(file.name);
        }
    };

    // Add new link
    const addNewLink = () => {
        if (additionalLinks.length < 5) {
            setAdditionalLinks([...additionalLinks, { platform: "LinkedIn", url: "" }]);
        }
    };

    // Update link
    const updateLink = (index, field, value) => {
        const updatedLinks = [...additionalLinks];
        updatedLinks[index][field] = value;
        setAdditionalLinks(updatedLinks);
    };

    // Save Additional Info
    const saveAdditionalInfo = () => {
        const additionalInfoData = {
            resumeName,
            additionalLinks: additionalLinks.filter(link => link.url)
        };
        setSavedAdditionalInfo(additionalInfoData);
        setShowAdditionalInfoPopup(false);
        localStorage.setItem("additionalInfo", JSON.stringify(additionalInfoData));
    };

    // Load Additional Info from localStorage
    useEffect(() => {
        const storedAdditionalInfo = localStorage.getItem("additionalInfo");
        if (storedAdditionalInfo) {
            const data = JSON.parse(storedAdditionalInfo);
            setSavedAdditionalInfo(data);
            if (data.resumeName) setResumeName(data.resumeName);
            if (data.additionalLinks?.length) setAdditionalLinks(data.additionalLinks);
        }
    }, []);

    // For Courses
    const [showCoursesPopup, setShowCoursesPopup] = useState(false);

    return (
        <section className="h-auto px-4 md:px-6 pt-32">
            <div className="mx-auto flex max-w-[1220px] flex-col gap-6">
                <div className="lg:flex">

                {/* Left section */}
                <div className="h-auto md:w-[200px] lg:w-[350px] bg-blue-50 p-6 text-sm border-r-2 border-gray">


                    {/* Title */}
                    <div className="flex items-start justify-center pt-24 gap-2 pt-8">
                        <h2 className="font-bold text-xl">Personal Details</h2>
                        <FontAwesomeIcon onClick={() => setShowProfilePopup(true)} icon={faPen} className="h-4 w-4 text-blue-600 hover:text-blue-800 cursor-pointer" />
                    </div>

                    {/* Show Personal Edit Popup Msg */}
                    {showProfilePopup && (
                        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black bg-opacity-40">

                            <div className="bg-white rounded-2xl p-8 w-full max-w-[550px] mx-auto text-center relative shadow-lg">

                                {/* Close button */}
                                <button
                                    onClick={() => setShowProfilePopup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                                <h2 className="text-2xl font-bold text-gray-900">Personal details</h2>
                                <p className="text-gray-500 mt-1">
                                    Add your personal details as you would like it to appear on your profile.
                                </p>

                                {/* Profile Photo + Upload */}
                                <img
                                    src={photoData.image}
                                    className="w-36 h-36 rounded-full border border-gray-600 mx-auto object-cover mt-4"
                                    style={{ imageRendering: 'auto' }}
                                />

                                <div className="flex justify-center gap-3 mt-4">

                                    <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-sm hover:bg-blue-700">
                                        Change photo
                                        <input type="file" onChange={photoChange} className="hidden" />
                                    </label>


                                    <button
                                        onClick={RemovePhoto}
                                        className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-50"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 mt-2">
                                    Maximum size: 1MB. Supported formats: JPG, GIF, or PNG.
                                </p>

                                {/* Save Button */}
                                <button
                                    onClick={savePhoto}
                                    className="w-full bg-blue-600 text-white py-2 mt-6 rounded hover:bg-blue-700 text-sm font-semibold"
                                >
                                    Save
                                </button>

                                {/* Close Button */}
                                <button
                                    onClick={() => setShowProfilePopup(false)}
                                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg"
                                >
                                    &times;
                                </button>

                            </div>
                        </div>
                    )}



                    {/* Avatar */}
                    <div className="flex flex-col items-center mt-5">
                        <img src={photoData.image} alt="Profile" className="h-36 w-36 rounded-full object-cover" style={{ imageRendering: 'auto' }} />
                        <p className="mt-2 font-semibold">Vishal</p>
                    </div>

                    {/* Button */}
                    <div className="flex justify-center pt-4">

                        <button onClick={() => setShowProfilePopup(true)} className="border border-blue-500 text-blue-500 h-10 w-52 rounded-md text-sm hover:text-blue-700 hover:border-blue-700">
                            <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                            Personal Details
                        </button>
                    </div>


                    {/* Progress */}
                    <p className="font-semibold pt-4 text-base">Profile Completion <span className="text-blue-600">75%</span></p>

                    <div className="bg-gray-200 h-3 rounded-full mt-4">
                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>


                    {/* Contact Information */}
                    <div className="pt-6">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-base">Contact Information</p>
                            <FontAwesomeIcon
                                icon={faPen}
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setShowContactPopup(true)}
                            />
                        </div>

                        <div className="flex flex-col gap-y-2 pt-2 text-gray-600">
                            <p>{savedContact?.email || "Enter Email ID"}</p>
                            <p>{savedContact?.phone || "Enter Phone Number"}</p>
                            <p>{savedContact?.linkedin || "Enter LinkedIn ID"}</p>
                            <p>{savedContact?.github || "Enter GitHub ID"}</p>


                        </div>
                    </div>

                    {/* Popup Screen for Edit Contact Information */}
                    {showContactPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24">
                            <div className="bg-white rounded-2xl p-8 w-full max-w-[550px] mx-auto shadow-lg relative">
                                
                                {/* Close button */}
                                <button
                                    onClick={() => setShowContactPopup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>
                                
                                <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Edit Contact Information</h2>

                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="w-full mb-3 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                    className="w-full mb-3 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                    placeholder="LinkedIn"
                                    className="w-full mb-3 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                    placeholder="GitHub"
                                    className="w-full mb-3 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => setShowContactPopup(false)}
                                        className="text-gray-600 text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveContactInfo}
                                        className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Work Preferences */}
                    <div className="pt-4">
                        <p className="font-semibold text-base">Work Preferences</p>
                        {savedWorkPreferences ? (
                            <div className="pt-2">
                                <p className="text-gray-600">Role: {savedWorkPreferences.preferredRole}</p>
                                <p className="text-gray-600">Industry: {savedWorkPreferences.industry}</p>
                                <p className="text-gray-600">Remote: {savedWorkPreferences.remoteWork}</p>
                            </div>
                        ) : (
                            <p className="text-gray-600 pt-2">Let recruiters know what role you're looking for to make sure you find opportunities that are right for you.</p>
                        )}
                        <p className="text-blue-600 cursor-pointer pt-2" onClick={() => setShowWorkPreferencesPopup(true)}>+ Add work preferences</p>
                    </div>

                    {/* Work Preferences Popup */}
                    {showWorkPreferencesPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24">
                            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-[550px] mx-auto relative">

                                {/* Close button */}
                                <button
                                    onClick={() => setShowWorkPreferencesPopup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                                <h2 className="text-2xl font-bold text-gray-900 text-center">Work preferences</h2>
                                <p className="text-center text-gray-500 mt-3">
                                    Let recruiters know what role you're looking for to make sure you find opportunities that are right for you.
                                </p>

                                {/* What role are you looking for? */}
                                <div className="mt-6">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">What role are you looking for?</label>
                                    <div className="relative">
                                        <select
                                            value={preferredRole}
                                            onChange={(e) => setPreferredRole(e.target.value)}
                                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value=""></option>
                                            <option value="Software Engineer">Software Engineer</option>
                                            <option value="Frontend Developer">Frontend Developer</option>
                                            <option value="Backend Developer">Backend Developer</option>
                                            <option value="Full Stack Developer">Full Stack Developer</option>
                                            <option value="Data Scientist">Data Scientist</option>
                                            <option value="Product Manager">Product Manager</option>
                                            <option value="UI/UX Designer">UI/UX Designer</option>
                                            <option value="DevOps Engineer">DevOps Engineer</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Industry */}
                                <div className="mt-5">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Industry</label>
                                    <div className="relative">
                                        <select
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value=""></option>
                                            <option value="Technology">Technology</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Education">Education</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Media & Entertainment">Media & Entertainment</option>
                                            <option value="Consulting">Consulting</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Are you open to working remotely? */}
                                <div className="mt-5">
                                    <label className="block text-base font-semibold text-gray-900 mb-3">Are you open to working remotely?</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-6 py-3 cursor-pointer hover:border-blue-500">
                                            <input
                                                type="radio"
                                                name="remoteWork"
                                                value="Yes"
                                                checked={remoteWork === "Yes"}
                                                onChange={(e) => setRemoteWork(e.target.value)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-6 py-3 cursor-pointer hover:border-blue-500">
                                            <input
                                                type="radio"
                                                name="remoteWork"
                                                value="No"
                                                checked={remoteWork === "No"}
                                                onChange={(e) => setRemoteWork(e.target.value)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex justify-end space-x-3 mt-8">
                                    <button
                                        onClick={() => setShowWorkPreferencesPopup(false)}
                                        className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveWorkPreferences}
                                        className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className='pt-4'>
                        <p className="font-semibold text-base">Additional Info</p>
                        {savedAdditionalInfo ? (
                            <div className="pt-2">
                                {savedAdditionalInfo.resumeName && (
                                    <p className="text-gray-600">Resume: {savedAdditionalInfo.resumeName}</p>
                                )}
                                {savedAdditionalInfo.additionalLinks?.map((link, index) => (
                                    <p key={index} className="text-gray-600">{link.platform}: {link.url}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 pt-2">Help employers get to know you better by adding other links and describing what makes you a great candidate.</p>
                        )}
                        <p className="text-blue-600 cursor-pointer pt-2" onClick={() => setShowAdditionalInfoPopup(true)}>+ Add additional info</p>
                    </div>

                    {/* Additional Info Popup */}
                    {showAdditionalInfoPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24">
                            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-[550px] mx-auto relative max-h-[90vh] overflow-y-auto">

                                {/* Close button */}
                                <button
                                    onClick={() => setShowAdditionalInfoPopup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                                <h2 className="text-2xl font-bold text-gray-900 text-center">Additional info</h2>
                                <p className="text-center text-gray-500 mt-3">
                                    Help employers get to know you better by adding other links and describing what makes you a great candidate.
                                </p>

                                {/* Resume Section */}
                                <div className="mt-6">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Resume</label>
                                    <p className="text-sm text-gray-500 mb-3">Have a resume ready? Add it here to make it easy for employers to view it.</p>
                                    
                                    <label className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 text-sm">
                                        Upload resume
                                        <input 
                                            type="file" 
                                            accept=".pdf" 
                                            onChange={handleResumeUpload}
                                            className="hidden" 
                                        />
                                    </label>
                                    
                                    {resumeName && (
                                        <p className="text-sm text-green-600 mt-2">✓ {resumeName}</p>
                                    )}
                                    
                                    <p className="text-xs text-gray-400 mt-2">Maximum size of 5MB. PDF files only.</p>
                                </div>

                                {/* Additional Links Section */}
                                <div className="mt-6">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Additional links</label>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Already have a LinkedIn profile, GitHub account, or personal portfolio? Add up to 5 links to make it easier for employers to view your work.
                                    </p>

                                    {additionalLinks.map((link, index) => (
                                        <div key={index} className="flex gap-3 mb-3">
                                            <div className="relative w-1/3">
                                                <select
                                                    value={link.platform}
                                                    onChange={(e) => updateLink(index, 'platform', e.target.value)}
                                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white"
                                                >
                                                    <option value="LinkedIn">Linked In</option>
                                                    <option value="GitHub">GitHub</option>
                                                    <option value="Portfolio">Portfolio</option>
                                                    <option value="Twitter">Twitter</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="http://"
                                                value={link.url}
                                                onChange={(e) => updateLink(index, 'url', e.target.value)}
                                                className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    ))}

                                    {additionalLinks.length < 5 && (
                                        <p 
                                            className="text-blue-600 cursor-pointer text-sm font-medium hover:text-blue-700"
                                            onClick={addNewLink}
                                        >
                                            + Add
                                        </p>
                                    )}
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex justify-end space-x-3 mt-8">
                                    <button
                                        onClick={() => setShowAdditionalInfoPopup(false)}
                                        className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveAdditionalInfo}
                                        className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

                {/* Right section */}
                <div className="h-[900px] w[100px] md:[700px] lg:w-[900px] lg:pt-12 lg:px-16 gap-y-6 flex flex-col">

                    {/* Experience */}
                    <div className="h-auto lg:w-[800px] rounded-xl p-6 border border-gray-200 shadow-sm bg-white">
                        <h1 className="text-xl font-bold text-gray-900">Experience</h1>

                        {savedExperience ? (
                            <div className="mt-3">
                                <p className="font-medium text-gray-800">{savedExperience.company}</p>
                                <p className="text-sm text-gray-600">{savedExperience.role}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {savedExperience.start} - {savedExperience.end}
                                </p>

                                <div className="flex gap-3 mt-3">
                                    <button onClick={editExperience} className="text-sm text-blue-600 hover:underline">Edit</button>
                                    <button onClick={deleteExperience} className="text-sm text-red-500 hover:underline">Delete</button>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <p className="font-medium text-gray-800">Work History</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Add your past work experience here. If you're just starting out, you can add internships or volunteer experience instead.
                                </p>
                            </div>
                        )}

                        <p className="text-blue-600 cursor-pointer pt-3 text-sm font-medium hover:text-blue-700"
                            onClick={() => setShowWorkPopup(true)}>
                            + Add work experiences
                        </p>
                    </div>

                    {/* Popup Screen Experience */}
                    {showWorkPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24">
                            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-[550px] mx-auto relative">

                                {/* Close button */}
                                <button
                                    onClick={() => setShowWorkPopup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

                                <h2 className="text-2xl font-bold text-gray-900 text-center">Work experience</h2>
                                <p className="text-center text-gray-500 mt-2">
                                    Add your past work experience. If you're just starting out,<br />
                                    you can add internships or volunteer experience instead.
                                </p>

                                {/* Name of institution */}
                                <div className="mt-6">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Name of institution</label>
                                    <div className="relative">
                                        <select
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value=""></option>
                                            <option value="Google">Google</option>
                                            <option value="Microsoft">Microsoft</option>
                                            <option value="Amazon">Amazon</option>
                                            <option value="Apple">Apple</option>
                                            <option value="Meta">Meta</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Role/Job title */}
                                <div className="mt-5">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Role/Job title</label>
                                    <div className="relative">
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value=""></option>
                                            <option value="Software Engineer">Software Engineer</option>
                                            <option value="Frontend Developer">Frontend Developer</option>
                                            <option value="Backend Developer">Backend Developer</option>
                                            <option value="Full Stack Developer">Full Stack Developer</option>
                                            <option value="Data Scientist">Data Scientist</option>
                                            <option value="Product Manager">Product Manager</option>
                                            <option value="Designer">Designer</option>
                                            <option value="Intern">Intern</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Start date */}
                                <div className="mt-5">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Start date</label>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-1">Months</p>
                                            <div className="relative">
                                                <select
                                                    value={experienceStartMonth}
                                                    onChange={(e) => setExperienceStartMonth(e.target.value)}
                                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-gray-500"
                                                >
                                                    <option value="">Select months</option>
                                                    {[
                                                        "January", "February", "March", "April", "May", "June",
                                                        "July", "August", "September", "October", "November", "December"
                                                    ].map((month, index) => (
                                                        <option key={index} value={month}>{month}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-1">Year</p>
                                            <div className="relative">
                                                <select
                                                    value={experienceStartYear}
                                                    onChange={(e) => setExperienceStartYear(e.target.value)}
                                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-gray-500"
                                                >
                                                    <option value="">Select Year</option>
                                                    {Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex justify-end space-x-3 mt-8">
                                    <button
                                        onClick={() => setShowWorkPopup(false)}
                                        className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveExperience}
                                        className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        {isEditExperience ? "Update" : "Save"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}



                    {/* Education */}
                    <div className="h-auto lg:w-[800px] rounded-xl p-6 border border-gray-200 shadow-sm bg-white relative">
                        <div className="flex justify-between items-start">
                            <h1 className="text-xl font-bold text-gray-900">Education</h1>
                            {savedEducation && (
                                <button onClick={editEducation} className="text-gray-400 hover:text-gray-600">
                                    <FontAwesomeIcon icon={faPen} className="text-sm" />
                                </button>
                            )}
                        </div>

                        {savedEducation ? (
                            <div className="mt-3">
                                <p className="font-medium text-gray-800">({savedEducation.institution.split(' ')[0]}) {savedEducation.institution}</p>
                                <p className="text-sm text-gray-500">{savedEducation.degree}, graduated {savedEducation.end}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {savedEducation.start} - {savedEducation.end}
                                </p>
                            </div>
                        ) : (
                            <div className="mt-3">
                                <p className="font-medium text-gray-800">(UTESA )Universidad Tecnológica de Santiago</p>
                                <p className="text-sm text-gray-500">Bachelor's degree in Computer Science , graduated June 2022</p>
                                <p className="text-sm text-gray-500 mt-2">June 2018- June 2022</p>
                            </div>
                        )}

                        <button className="text-blue-600 cursor-pointer pt-3 text-sm font-medium hover:text-blue-700"
                            onClick={() => setShowEducationPopup(true)}>
                            + Add Education
                        </button>
                    </div>

                    {/* Popup Screen Education */}
                    {showEducationPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24">
                            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-[550px] mx-auto relative">

                                {/* Close button */}
                                <button
                                    onClick={() => setShowEducationPopup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ×
                                </button>

<h2 className="text-2xl font-bold text-gray-900 text-center">Education</h2>
                                <p className="text-center text-gray-500 mt-3 leading-relaxed">
                                    Add your educational background to let employers know where you studied or are currently studying. Even if you didn't finish, it's important to include it here. And if you've earned a college degree, you don't need to add your high school/GED. All fields are optional.
                                </p>

                                {/* Name of institution */}
                                <div className="mt-6">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Name of institution</label>
                                    <div className="relative">
                                        <select
                                            value={institution}
                                            onChange={(e) => setInstitution(e.target.value)}
                                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value=""></option>
                                            <option value="Universidad Tecnológica de Santiago">Universidad Tecnológica de Santiago</option>
                                            <option value="Harvard University">Harvard University</option>
                                            <option value="MIT">MIT</option>
                                            <option value="Stanford University">Stanford University</option>
                                            <option value="Oxford University">Oxford University</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Degree */}
                                <div className="mt-5">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Degree</label>
                                    <div className="relative">
                                        <select
                                            value={degree}
                                            onChange={(e) => setDegree(e.target.value)}
                                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                                        >
                                            <option value=""></option>
                                            <option value="Bachelor's degree in Computer Science">Bachelor's degree in Computer Science</option>
                                            <option value="Bachelor's degree in Engineering">Bachelor's degree in Engineering</option>
                                            <option value="Master's degree in Computer Science">Master's degree in Computer Science</option>
                                            <option value="Master's degree in Business Administration">Master's degree in Business Administration</option>
                                            <option value="Ph.D.">Ph.D.</option>
                                            <option value="Associate's degree">Associate's degree</option>
                                            <option value="High School Diploma">High School Diploma</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Start date */}
                                <div className="mt-5">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">Start date</label>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-1">Months</p>
                                            <div className="relative">
                                                <select
                                                    value={educationStartMonth}
                                                    onChange={(e) => setEducationStartMonth(e.target.value)}
                                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-gray-500"
                                                >
                                                    <option value="">Select months</option>
                                                    {[
                                                        "January", "February", "March", "April", "May", "June",
                                                        "July", "August", "September", "October", "November", "December"
                                                    ].map((month, index) => (
                                                        <option key={index} value={month}>{month}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-1">Year</p>
                                            <div className="relative">
                                                <select
                                                    value={educationStartYear}
                                                    onChange={(e) => setEducationStartYear(e.target.value)}
                                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-gray-500"
                                                >
                                                    <option value="">Select Year</option>
                                                    {Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* End date */}
                                <div className="mt-5">
                                    <label className="block text-base font-semibold text-gray-900 mb-2">End date (leave blank if currently studying)</label>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-1">Months</p>
                                            <div className="relative">
                                                <select
                                                    value={educationEndMonth}
                                                    onChange={(e) => setEducationEndMonth(e.target.value)}
                                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-gray-500"
                                                >
                                                    <option value="">Select months</option>
                                                    {[
                                                        "January", "February", "March", "April", "May", "June",
                                                        "July", "August", "September", "October", "November", "December"
                                                    ].map((month, index) => (
                                                        <option key={index} value={month}>{month}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-1">Year</p>
                                            <div className="relative">
                                                <select
                                                    value={educationEndYear}
                                                    onChange={(e) => setEducationEndYear(e.target.value)}
                                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-gray-500"
                                                >
                                                    <option value="">Select Year</option>
                                                    {Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i + 5).map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex justify-end space-x-3 mt-8">
                                    <button
                                        onClick={() => setShowEducationPopup(false)}
                                        className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveEducation}
                                        className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        {isEditEducation ? "Update" : "Save"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}




                    {/* Courses */}
                    <div className="h-auto lg:w-[800px] rounded-xl p-6 border border-gray-200 shadow-sm bg-white">
                        <h1 className="text-xl font-bold text-gray-900">Courses</h1>
                        <p className="font-medium text-gray-800 mt-3">My courses</p>
                        <p className="text-sm text-gray-500 mt-1">
                            List any courses you've completed or are currently enrolled in. Adding relevant courses can help highlight your skills and learning journey.
                        </p>
                        <p 
                            className="text-blue-600 cursor-pointer pt-3 text-sm font-medium hover:text-blue-700"
                            onClick={() => setShowCoursesPopup(true)}
                        >
                            + Add course
                        </p>
                    </div>

                    {/* Courses Popup */}
                    {showCoursesPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24 overflow-y-auto">
                            <div className="bg-gray-50 shadow-lg rounded-2xl p-6 w-full max-w-[750px] mx-auto relative my-8">

                                {/* Back button */}
                                <button
                                    onClick={() => setShowCoursesPopup(false)}
                                    className="flex items-center text-gray-700 hover:text-gray-900 mb-6"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span className="font-medium">Back</span>
                                </button>

                                {/* Course Cards */}
                                <div className="space-y-4">
                                    {[1, 2, 3].map((course) => (
                                        <div key={course} className="border border-gray-200 rounded-xl p-5 bg-white">
                                            <div className="flex gap-4">
                                                {/* University Logo */}
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <div className="text-center">
                                                        <div className="w-8 h-8 bg-orange-500 rounded-sm mx-auto mb-1"></div>
                                                        <p className="text-[6px] text-gray-600 font-semibold">UNIVERSITY<br/>OF VIRGINIA</p>
                                                    </div>
                                                </div>

                                                {/* Course Details */}
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500">University of virginia course</p>
                                                    <h3 className="font-bold text-gray-900 mt-1">Advanced Business Strategy</h3>

                                                    {/* Skill Tags */}
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Strategy and operations</span>
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Finance</span>
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Entrepreneurship</span>
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Strategy</span>
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Sales</span>
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Operations Management</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Business Development</span>
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Strategy and Operations</span>
                                                        <span className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-full">Strategy and Operations</span>
                                                        <span className="text-blue-600 text-xs cursor-pointer hover:underline ml-2">Show less</span>
                                                    </div>

                                                    {/* Certificate Link */}
                                                    <div className="mt-3">
                                                        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View Certificate</a>
                                                        <p className="text-xs text-gray-500 mt-1">Completed August 2024</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Badges & Achievement */}
                    <div className="h-auto lg:w-[800px] rounded-xl p-6 border border-gray-200 shadow-sm bg-white">
                        <h1 className="text-xl font-bold text-gray-900">Badges & Achievements</h1>

                        {/* Badge Icons Grid */}
                        <div className="flex flex-wrap gap-8 mt-6">
                            {[1, 2, 3, 4, 5, 6].map((badge) => (
                                <div key={badge} className="flex flex-col items-center">
                                    {/* Certificate Badge Icon */}
                                    <div className="w-24 h-20 relative">
                                        <svg viewBox="0 0 80 60" className="w-full h-full">
                                            {/* Certificate background */}
                                            <rect x="5" y="5" width="70" height="45" rx="4" fill="#E8F4FD" stroke="#60A5FA" strokeWidth="2"/>
                                            
                                            {/* Certificate lines */}
                                            <line x1="15" y1="15" x2="50" y2="15" stroke="#93C5FD" strokeWidth="2"/>
                                            <line x1="15" y1="22" x2="55" y2="22" stroke="#93C5FD" strokeWidth="2"/>
                                            <line x1="15" y1="29" x2="45" y2="29" stroke="#93C5FD" strokeWidth="2"/>
                                            <line x1="15" y1="36" x2="40" y2="36" stroke="#93C5FD" strokeWidth="2"/>
                                            
                                            {/* Medal/Ribbon circle */}
                                            <circle cx="60" cy="35" r="12" fill="white" stroke="#60A5FA" strokeWidth="2"/>
                                            <circle cx="60" cy="35" r="6" fill="#60A5FA"/>
                                            
                                            {/* Ribbon tails */}
                                            <path d="M54 45 L54 58 L57 54 L60 58 L60 45" fill="#F87171" stroke="#EF4444" strokeWidth="1"/>
                                            <path d="M60 45 L60 58 L63 54 L66 58 L66 45" fill="#F87171" stroke="#EF4444" strokeWidth="1"/>
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-2">Badge {badge}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-blue-600 cursor-pointer pt-6 text-sm font-medium hover:text-blue-700">
                            + Add badges
                        </p>
                    </div>


                </div>
                </div>
            </div>
        </section>
    );
}

export default MyProfile;
