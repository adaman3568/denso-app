import {CommentInfo} from "../Context/DataTypeList";
import React from "react";

const EmpInitialState : CommentInfo[] = [];

const SetAllCommentAction = 'SetAllCommentAction' as const;

export const SetDisplayComment = (data : CommentInfo[]) => ({
    type : SetAllCommentAction,
    payload : data,
});

export type CommentActions = ReturnType<typeof SetDisplayComment>

const CommentReducer : React.Reducer<CommentInfo[],CommentActions> = (status = EmpInitialState , action) : CommentInfo[] => {
    switch (action.type) {
        case SetAllCommentAction:
            return action.payload;
        default:
            return status;
    }
};

export default CommentReducer;