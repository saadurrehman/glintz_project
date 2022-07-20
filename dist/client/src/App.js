"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useApp_1 = require("./hooks/useApp");
const About_1 = __importDefault(require("./components/About"));
const Container_1 = __importDefault(require("./components/Container"));
const Experience_1 = __importDefault(require("./components/Experience"));
const About_2 = __importDefault(require("./components/modals/About"));
const ExperienceEditModal_1 = __importDefault(require("./components/modals/ExperienceEditModal"));
const Profile_1 = __importDefault(require("./components/modals/Profile"));
const ProfilePic_1 = __importDefault(require("./components/ProfilePic"));
const ExperienceAddModal_1 = __importDefault(require("./components/modals/ExperienceAddModal"));
require("./App.css");
const LoadingSpinner_1 = __importDefault(require("./components/LoadingSpinner"));
function App() {
    const [showAboutModal, setShowAboutModal] = (0, react_1.useState)(false);
    const [showExperienceEditModal, setShowExperienceEditModal] = (0, react_1.useState)(false);
    const [showDeleteModal, setShowDeleteModal] = (0, react_1.useState)(false);
    const [showExperienceAddModal, setShowExperienceAddModal] = (0, react_1.useState)(false);
    const [showProfileModal, setShowProfileModal] = (0, react_1.useState)(false);
    const [showLoadingSpinner, setShowLoadingSpinner] = (0, react_1.useState)(false);
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
    const { setExperience, experience, user, updateUserRecord, updateExperienceRecord, removeExperienceRecord, addExperienceRecord, } = (0, useApp_1.useApp)(handleCloseDeleteModal, handleCloseSpinnerModal, handleShowSpinnerModal);
    const handleShowExperienceEditModal = (item) => {
        if (item)
            setExperience(item);
        setShowExperienceEditModal(true);
    };
    return (<>
      <Container_1.default>
        {user ? (<>
            {showLoadingSpinner && <LoadingSpinner_1.default />}
            <ProfilePic_1.default user={user} handleShow={handleShowProfileModal}/>
            <div className="tab-pane fade show active" id="overview">
              <About_1.default user={user} handleShow={handleShowAboutModal}/>
              <Experience_1.default user={user} handleCloseDeleteModal={handleCloseDeleteModal} showDeleteModal={showDeleteModal} handleShowDeleteModal={handleShowDeleteModal} removeExperienceRecord={removeExperienceRecord} handleShowAddModal={handleShowExperienceAddModal} handleShowEditModal={handleShowExperienceEditModal}/>
            </div>
          </>) : (<h2>Loading....</h2>)}
      </Container_1.default>

      {showAboutModal && user && (<About_2.default user={user} updateRecord={updateUserRecord} handleClose={handleCloseAboutModal}/>)}
      {showExperienceEditModal && experience && (<ExperienceEditModal_1.default experience={experience} updateRecord={updateExperienceRecord} handleClose={handleCloseExperienceModal}/>)}
      {showExperienceAddModal && (<ExperienceAddModal_1.default addRecord={addExperienceRecord} handleClose={handleCloseExperienceAddModal}/>)}
      {showProfileModal && user && (<Profile_1.default user={user} updateRecord={updateUserRecord} handleClose={handleCloseProfileModal}/>)}
    </>);
}
exports.default = App;
