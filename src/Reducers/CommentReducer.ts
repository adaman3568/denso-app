import {CommentInfo} from "../Context/DataTypeList";
import React from "react";

const EmpInitialState : CommentInfo[] = [];

const SetAllCommentAction = 'SetAllEmployeeAction' as const;

export const SetAllComment = (data : CommentInfo[]) => ({
    type : SetAllCommentAction,
    payload : data,
});

export type CommentActions = ReturnType<typeof SetAllComment>

const CommentReducer : React.Reducer<CommentInfo[],CommentActions> = (status = EmpInitialState , action) : CommentInfo[] => {
    switch (action.type) {
        case SetAllCommentAction:
            return action.payload;
        default:
            return status;
    }
};

export default CommentReducer;