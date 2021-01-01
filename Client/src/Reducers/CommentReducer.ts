import {CommentInfo} from "../Context/DataTypeList";
import React from "react";

export const CommentsInitialState : CommentInfo[] = [];

const CommentReadAllAction = 'CommentReadAllAction' as const;
const CommentUpdate = 'CommentUpdateAction' as const;
const CommentInsert = 'CommentInsertAction' as const;
const CommentDelete = 'CommentDeleteAction' as const;
const PostRepComment = 'PostRepComment' as const;

export const CommentsReadActionCreator = (data : CommentInfo[]) => ({
    type : CommentReadAllAction,
    payload : {Data : data},
});

export const CommentUpdateActionCreator = (id : number,updatedData : CommentInfo) => ({
    type : CommentUpdate,
    payload : {id :id,Data : updatedData},
});

export const CommentInsertActionCreator = (newData : CommentInfo) => ({
    type : CommentInsert,
    payload : {Data : newData},
});

export const CommentDeleteActionCreator = (deleteId : number) => ({
    type : CommentDelete,
    payload : {id : deleteId},
});

export const CommentPostRepActionCreator = (parentCommentID : number) => ({
    type : PostRepComment,
    payload : {parentCommentID : parentCommentID}
});

export type CommentActions =
    ReturnType<typeof CommentsReadActionCreator> |
    ReturnType<typeof CommentInsertActionCreator> |
    ReturnType<typeof CommentUpdateActionCreator> |
    ReturnType<typeof CommentDeleteActionCreator> |
    ReturnType<typeof CommentPostRepActionCreator>

const CommentReducer : React.Reducer<CommentInfo[],CommentActions> = (status = CommentsInitialState , action : CommentActions) : CommentInfo[] => {
    switch (action.type) {
        case CommentReadAllAction:
            return action.payload.Data;
        case CommentInsert:
            return [action.payload.Data,...status]
        case CommentDelete:
            return status.filter(item => item.id !== action.payload.id);
        case CommentUpdate:
            const filterdItems = status.filter(item => item.id !== action.payload.id);
            return [action.payload.Data,...filterdItems];
        case PostRepComment:
            const parentCom = status.find(item => item.id === action.payload.parentCommentID);
            if(parentCom){
                const newCom : CommentInfo = {...parentCom, repCommentCnt : parentCom.repCommentCnt + 1}
                const res = status.filter(item => item.id !== action.payload.parentCommentID);
                return [newCom,...res]
            }

            return status;

        default:
            return status;
    }
};

export default CommentReducer;