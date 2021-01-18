import {CommentInfo, EmployeeInfo} from "../Context/DataTypeList";

export const ProfileReadAction = 'pra' as const;
export const ProfileCommentReadAction = 'pcra' as const;

export const ProfileReadActionCreator = (data : EmployeeInfo) => ({
    type : ProfileReadAction,
    payload : {data}
})

export const ProfileCommentReadActionCreator = (data : CommentInfo[]) => ({
    type : ProfileCommentReadAction,
    payload : {data}
});

export type ProfileActions =
    ReturnType<typeof ProfileReadActionCreator> |
    ReturnType<typeof ProfileCommentReadActionCreator>

export type ProfileState = {
    Profile : EmployeeInfo,
    Comment : CommentInfo[]
}

const InitialState : ProfileState = {
    Profile : {} as EmployeeInfo,
    Comment : []
}

const ProfileReducer : React.Reducer<ProfileState, ProfileActions> = (status = InitialState,action) : ProfileState => {

    switch (action.type){
        case ProfileReadAction:
            return {...status,Profile : action.payload.data}
        case ProfileCommentReadAction:
            return {...status,Comment : action.payload.data}
        default:
            return status
    }
}

export default ProfileReducer

