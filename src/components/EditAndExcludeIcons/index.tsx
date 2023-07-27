import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import "./EditAndExcludeIcons.css";

interface EditAndExcludeIconsProps {
  editModal: () => void;
  excludeModal: () => void;
}

const EditAndExcludeIcons: React.FC<EditAndExcludeIconsProps> = ({
  editModal,
  excludeModal,
}) => {
  return (
    <div className="card-icons">
      <AiFillEdit size={25} className="card-icon" onClick={editModal} />
      <AiFillCloseCircle
        size={25}
        className="card-icon"
        onClick={excludeModal}
      />
    </div>
  );
};
export default EditAndExcludeIcons;
