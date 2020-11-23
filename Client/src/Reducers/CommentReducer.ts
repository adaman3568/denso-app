export const decoi = {}
// import {CommentInfo} from "../Context/DataTypeList";
// import React from "react";
//
// export const EmpInitialState : CommentInfo[] = [];
//
// const SetAllCommentAction = 'SetAllCommentAction' as const;
//
// export const SetDisplayCommentActionCreator = (data : CommentInfo[]) => ({
//     type : SetAllCommentAction,
//     payload : data,
// });
//
// export type CommentActions = ReturnType<typeof SetDisplayCommentActionCreator>
//
// const CommentReducer : React.Reducer<CommentInfo[],CommentActions> = (status = EmpInitialState , action) : CommentInfo[] => {
//     switch (action.type) {
//         case SetAllCommentAction:
//             return action.payload;
//         default:
//             return status;
//     }
// };
//
// export default CommentReducer;