import { User } from "../types";
import NoProfilePicture from "../img/nopic.jpg";
import { MdEdit } from "react-icons/md";

type Props = {
  handleShow: () => void;
  user: User;
};

const ProfilePic = ({ user, handleShow }: Props) => {
  return (
    <div className="text-center pb-4 border-bottom">
      <img
        src={user.profilePicture || NoProfilePicture}
        alt=""
        width={70}
        height={70}
        className="avatar-lg img-thumbnail rounded-circle mb-4"
      />
      <h5 className="mb-0">{user.name}</h5>
      <p className="text-muted mb-3">Age - {user.age}</p>
      <div
        style={{ position: "absolute", top: "5px", right: "6px" }}
        role="info"
      >
        <MdEdit size="1.5em" onClick={() => handleShow()} />
      </div>
    </div>
  );
};

export default ProfilePic;
