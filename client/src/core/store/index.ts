import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
import patients from "../../modules/clinics-portals/pediatric/slices/patient-slice";
import auth from "../../modules/auth/slices/auth-slice";
import { rootReducer } from "../../modules/clinics-portals/orthopedic/slices/combineReducers";

export const store = configureStore({
  reducer: {
    auth,
    devices,
    schedules,
    patients,
    rootReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
