import { useNavigate } from "react-router-dom";
import { countOfUserActions } from "./usersUtils";

const useAction = () => {
  const navigate = useNavigate();

  const checkActionNumber = async (callback) => {
    const action_number = await countOfUserActions();
    if (action_number == 0) {
      alert("You reached your daily action limit. Logging out...");
      navigate("/");
      return null;
    }
    return await callback();
  };
  return { checkActionNumber };
};
export default useAction;
