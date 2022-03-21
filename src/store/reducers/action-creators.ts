import { AuthActionCreators } from "./auth/action-creators";
import { EventActionCreators } from "./event/action-creators";

export type IActionCreators =
    typeof AuthActionCreators &
    typeof EventActionCreators

export const allActionCreators: IActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}