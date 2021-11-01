import { useSelector } from "react-redux";
import { StateStore } from "../../store";

export const useAuth = () => useSelector((store: StateStore) => store.auth)

