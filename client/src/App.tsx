import { useState } from "react";
import { ExperienceType } from "./types";
import { useApp } from "./hooks/useApp";
import About from "./components/About";
import Container from "./components/Container";
import Experience from "./components/Experience";
import AboutModal from "./components/modals/About";
import ExperienceEditModal from "./components/modals/ExperienceEditModal";
import ProfileModal from "./components/modals/Profile";
import ProfilePic from "./components/ProfilePic";
import ExperienceAddModal from "./components/modals/ExperienceAddModal";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showExperienceEditModal, setShowExperienceEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExperienceAddModal, setShowExperienceAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const handleCloseAboutModal = () => setShowAboutModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleShowAboutModal = () => setShowAboutModal(true);
  const handleCloseExperienceModal = () => setShowExperienceEditModal(false);
  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);
  const handleShowExperienceAddModal = () => {
    setShowExperienceAddModal(true);
  };
  const handleCloseExperienceAddModal = () => {
    setShowExperienceAddModal(false);
  };
  const handleCloseSpinnerModal = () => {
    setShowLoadingSpinner(false);
  };
  const handleShowSpinnerModal = () => {
    setShowLoadingSpinner(true);
  };

  const {
    setExperience,
    experience,
    user,
    updateUserRecord,
    updateExperienceRecord,
    removeExperienceRecord,
    addExperienceRecord,
  } = useApp(
    handleCloseDeleteModal,
    handleCloseSpinnerModal,
    handleShowSpinnerModal
  );

  const handleShowExperienceEditModal = (item: ExperienceType) => {
    if (item) setExperience(item);

    setShowExperienceEditModal(true);
  };

  return (
    <>
      <Container>
        {user ? (
          <>
            {showLoadingSpinner && <LoadingSpinner />}
            <ProfilePic user={user} handleShow={handleShowProfileModal} />
            <div className="tab-pane fade show active" id="overview">
              <About user={user} handleShow={handleShowAboutModal} />
              <Experience
                user={user}
                handleCloseDeleteModal={handleCloseDeleteModal}
                showDeleteModal={showDeleteModal}
                handleShowDeleteModal={handleShowDeleteModal}
                removeExperienceRecord={removeExperienceRecord}
                handleShowAddModal={handleShowExperienceAddModal}
                handleShowEditModal={handleShowExperienceEditModal}
              />
            </div>
          </>
        ) : (
          <h2>Loading....</h2>
        )}
      </Container>

      {showAboutModal && user && (
        <AboutModal
          user={user}
          updateRecord={updateUserRecord}
          handleClose={handleCloseAboutModal}
        />
      )}
      {showExperienceEditModal && experience && (
        <ExperienceEditModal
          experience={experience}
          updateRecord={updateExperienceRecord}
          handleClose={handleCloseExperienceModal}
        />
      )}
      {showExperienceAddModal && (
        <ExperienceAddModal
          addRecord={addExperienceRecord}
          handleClose={handleCloseExperienceAddModal}
        />
      )}
      {showProfileModal && user && (
        <ProfileModal
          user={user}
          updateRecord={updateUserRecord}
          handleClose={handleCloseProfileModal}
        />
      )}
    </>
  );
}

export default App;
