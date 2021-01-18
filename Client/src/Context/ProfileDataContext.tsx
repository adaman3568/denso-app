import React, {createContext, FC, useEffect, useReducer, useState} from "react";
import {CommentInfo, EmployeeInfo} from "./DataTypeList";
import ProfileReducer, {
    ProfileCommentReadActionCreator,
    ProfileReadActionCreator,
    ProfileState
} from "../Reducers/ProfileReducer";
import {ProfileApiDataManager} from "./ApiFunctions/ProfileApiDataManager";

type ProfileContextState = {
    Profile : EmployeeInfo,
    Comments : CommentInfo[],
    func : {
        GetProfile: () => void,
        GetComments : () => void;
    }
}

export const ProfileDataContext = createContext<ProfileContextState>({} as ProfileContextState);

export const ProfileContextProvider : FC = ({children}) => {

    const [state,dispatch] = useReducer(ProfileReducer,{} as ProfileState);
    useEffect(() => {
        const profileApi = new ProfileApiDataManager();
        profileApi.GetComment()
            .then(res => dispatch(ProfileCommentReadActionCreator(res)))
        profileApi.GetData()
            .then(res => dispatch(ProfileReadActionCreator(res)))

    },[])

    const SetProfile = () => {
        new ProfileApiDataManager().GetData()
            .then(res => dispatch(ProfileReadActionCreator(res)))
    }

    const SetComment = () => {
        new ProfileApiDataManager().GetComment()
            .then(res => dispatch(ProfileCommentReadActionCreator(res)))
    }

    return (
        <ProfileDataContext.Provider value={{
            Profile : state.Profile,
            Comments : state.Comment,
            func : {
                GetProfile : SetProfile,
                GetComments : SetComment
            }
        }}>
            {children}
        </ProfileDataContext.Provider>
    )
}