import {CarInfo} from "../Context/DataTypeList";
import React from "react";

const EmpInitialState : CarInfo[] = [];

const SetAllCarAction = 'SetAllCarAction' as const;
const CarDeleteAction = 'CarDeleteAction' as const;

export const SetDisplayCar = (data : CarInfo[]) => ({
    type : SetAllCarAction,
    payload : {
        data
    },
});

export const CarDeleteActionCreator = (id : string) => ({
    type : CarDeleteAction,
    payload : {
        id
    }
});

export type CarActions = ReturnType<typeof SetDisplayCar> | ReturnType<typeof CarDeleteActionCreator>

const CarReducer : React.Reducer<CarInfo[],CarActions> = (status = EmpInitialState , action) : CarInfo[] => {
    switch (action.type) {
        case SetAllCarAction:
            return action.payload.data;
        case CarDeleteAction:
            return status.filter(item => item.uid !== action.payload.id);
        default:
            return status;
    }
};

export default CarReducer;