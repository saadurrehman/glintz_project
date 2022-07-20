import { ExperienceType, User } from "../types";
import { IoMdAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import DeleteModal from "./modals/DeleteModal";
import { useState } from "react";

type Props = {
  handleShowAddModal(): void;
  handleShowDeleteModal(): void;
  handleCloseDeleteModal(): void;
  showDeleteModal: boolean;
  removeExperienceRecord(id: string): Promise<void>;
  handleShowEditModal(item?: ExperienceType): void;
  user: User | null;
};

const Experience = ({
  handleShowDeleteModal,
  handleCloseDeleteModal,
  showDeleteModal,
  user,
  handleShowAddModal,
  handleShowEditModal,
  removeExperienceRecord,
}: Props) => {
  const [recordId, setRecordId] = useState("");

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          deleteRecord={removeExperienceRecord}
          recordId={recordId}
          handleModalClose={handleCloseDeleteModal}
        />
      )}
      <div className="candidate-education-details mt-4 mb-4">
        <div
          className="d-flex justify-content-between align-items-center border-bottom"
          role="experience"
        >
          <h6 className="fs-18 fw-bold mb-0">Experiences</h6>
          <IoMdAddCircle size="2em" onClick={() => handleShowAddModal()} />
        </div>
        {user?.experiences.length !== 0 ? (
          user?.experiences.map((item) => (
            <div
              className="candidate-education-content mt-4 d-flex"
              key={item.createdAt}
            >
              <div className="circle flex-shrink-0 bg-soft-primary">
                {" "}
                {item.jobTitle?.substring(0, 1)?.toUpperCase()}{" "}
              </div>
              <div className="ms-4 w-100">
                <h6 className="fs-16 mb-1">{item.jobTitle}</h6>
                <p className="mb-2 text-muted">
                  {`(${item.startDate} - ${item.endDate})`}
                </p>
                <p className="text-muted">{item.description}</p>
              </div>
              <div className="d-flex">
                <MdEdit
                  size="1.5em"
                  data-testid="show-edit-modal"
                  className="mx-2"
                  onClick={() => handleShowEditModal(item)}
                />
                <AiFillDelete
                  data-testid="show-delete-modal"
                  size="1.5em"
                  onClick={() => {
                    handleShowDeleteModal();
                    setRecordId(item.id.toString());
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Please add experience</p>
        )}
      </div>
    </>
  );
};

export default Experience;
