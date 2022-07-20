"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("react-icons/io");
const md_1 = require("react-icons/md");
const ai_1 = require("react-icons/ai");
const DeleteModal_1 = __importDefault(require("./modals/DeleteModal"));
const react_1 = require("react");
const Experience = ({ handleShowDeleteModal, handleCloseDeleteModal, showDeleteModal, user, handleShowAddModal, handleShowEditModal, removeExperienceRecord, }) => {
    const [recordId, setRecordId] = (0, react_1.useState)("");
    return (<>
      {showDeleteModal && (<DeleteModal_1.default deleteRecord={removeExperienceRecord} recordId={recordId} handleModalClose={handleCloseDeleteModal}/>)}
      <div className="candidate-education-details mt-4 mb-4">
        <div className="d-flex justify-content-between align-items-center border-bottom" role="experience">
          <h6 className="fs-18 fw-bold mb-0">Experiences</h6>
          <io_1.IoMdAddCircle size="2em" onClick={() => handleShowAddModal()}/>
        </div>
        {(user === null || user === void 0 ? void 0 : user.experiences.length) !== 0 ? (user === null || user === void 0 ? void 0 : user.experiences.map((item) => {
            var _a, _b;
            return (<div className="candidate-education-content mt-4 d-flex" key={item.createdAt}>
              <div className="circle flex-shrink-0 bg-soft-primary">
                {" "}
                {(_b = (_a = item.jobTitle) === null || _a === void 0 ? void 0 : _a.substring(0, 1)) === null || _b === void 0 ? void 0 : _b.toUpperCase()}{" "}
              </div>
              <div className="ms-4 w-100">
                <h6 className="fs-16 mb-1">{item.jobTitle}</h6>
                <p className="mb-2 text-muted">
                  {`(${item.startDate} - ${item.endDate})`}
                </p>
                <p className="text-muted">{item.description}</p>
              </div>
              <div className="d-flex">
                <md_1.MdEdit size="1.5em" data-testid="show-edit-modal" className="mx-2" onClick={() => handleShowEditModal(item)}/>
                <ai_1.AiFillDelete data-testid="show-delete-modal" size="1.5em" onClick={() => {
                    handleShowDeleteModal();
                    setRecordId(item.id.toString());
                }}/>
              </div>
            </div>);
        })) : (<p>Please add experience</p>)}
      </div>
    </>);
};
exports.default = Experience;
