import {CarInfo} from "../Context/DataTypeList";
import React from "react";

const EmpInitialState : CarInfo[] = [];

const SetAllCarAction = 'SetAllCarAction' as const;

export const SetAllCar = (data : CarInfo[]) => ({
    type : SetAllCarAction,
    payload : data,
});

export type CarActions = ReturnType<typeof SetAllCar>

const CarReducer : React.Reducer<CarInfo[],CarActions> = (status = EmpInitialState , action) : CarInfo[] => {
    switch (action.type) {
        case SetAllCarAction:
            return action.payload;
        default:
            return status;
    }
};

export default CarReducer;