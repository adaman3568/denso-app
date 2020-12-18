import {CarInfo} from "../Context/DataTypeList";
import React from "react";
export const CarInitialState : CarInfo[] = [];

export const CarReadAllAction = 'craa' as const;
export const CarUpdateAction = 'cua' as const;
export const CarInsertAction = 'cia' as const;
export const CarDeleteAction = 'cda' as const;

export const CarReadAllActionCreator = (data : CarInfo[]) => ({
    type : CarReadAllAction,
    payload : {data},
});
export const CarUpdateActionCreator = (id : number,data : CarInfo) => ({
    type : CarUpdateAction,
    payload : {id,data},
});
export const CarInsertActionCreator = (data : CarInfo) => ({
    type : CarInsertAction,
    payload : {data},
});
export const CarDeleteActionCreator = (id : number) => ({
    type : CarDeleteAction,
    payload : {id},
});


export type CarActions =
    ReturnType<typeof CarReadAllActionCreator> |
    ReturnType<typeof CarInsertActionCreator> |
    ReturnType<typeof CarUpdateActionCreator> |
    ReturnType<typeof CarDeleteActionCreator>

const CustomerReducer : React.Reducer<CarInfo[],CarActions> = (status = CarInitialState , action) : CarInfo[] => {
    switch (action.type) {
        case CarReadAllAction:
            return action.payload.data;
        case CarDeleteAction:
            return status.filter(item => item.id !== action.payload.id)
        case CarInsertAction:
            return [action.payload.data,...status]
        case CarUpdateAction:
            const filterdData = status.filter(item => item.id !== action.payload.id);
            return [action.payload.data,...filterdData]
        default:
            return status;
    }
};

export default CustomerReducer;


