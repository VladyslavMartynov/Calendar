import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { allActionCreators, IActionCreators } from "../store/reducers/action-creators";

export const useActions = (): IActionCreators => {
    const dispatch = useDispatch();
    return bindActionCreators(allActionCreators, dispatch);
}