import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Doctor {
  id?: number;
  ssn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  specialization: string;
  clinicId?: number;
  role: string;
}

export interface DoctorState {
  doctors: Doctor[];
}

const initialState: DoctorState = {
  doctors: [],
};

export const getDoctors = createAsyncThunk(
  "doctors/getDoctors",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .get<any>("http://localhost:3003/data")
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (data: Doctor, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .post<Doctor>("http://localhost:3003/doctors", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const getDoctorById = createAsyncThunk(
  " doctors/getDoctorById",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .get<Doctor>(`http://localhost:3003/doctors/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .delete<Doctor>(`http://localhost:3003/doctors/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const editDoctor = createAsyncThunk(
  "doctors/editDoctor",
  async (
    data: { doctorId: string; updatedData: Partial<Doctor> },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    const { doctorId, updatedData } = data;

    return axios
      .put<Doctor>(`http://localhost:3003/doctors/${doctorId}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload as any;
    });
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      state.doctors.push(action.payload as Doctor);
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      const deletedDoctorId = action.payload as string | undefined;
      if (deletedDoctorId !== undefined) {
        state.doctors = state.doctors.filter(
          (doctor) => doctor.ssn !== deletedDoctorId
        );
      }
    });
    builder.addCase(editDoctor.fulfilled, (state, action) => {
      const editedDoctor = action.payload as Doctor | undefined;
      if (editedDoctor !== undefined) {
        state.doctors = state.doctors.map((doctor) =>
          doctor.ssn === editedDoctor.ssn ? editedDoctor : doctor
        );
      }
    });
    builder.addCase(getDoctorById.fulfilled, (state, action) => {
      const getDoctor = action.payload as Doctor | undefined;
      if (getDoctor !== undefined) {
        state.doctors = state.doctors.map((doctor) =>
          doctor.ssn === getDoctor.ssn ? getDoctor : doctor
        );
      }
    });
  },
});

export default doctorSlice.reducer;
export const doctorSliceActions = doctorSlice.actions;
