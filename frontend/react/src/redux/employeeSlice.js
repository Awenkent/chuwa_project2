import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentEmployee = createAsyncThunk(
  "employee/fetchCurrentEmployee",
  async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      cache: "default",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    });
    return response;
  }
);

export const fetchAllEmployees = createAsyncThunk(
  "hr/fetchAllEmployees",
  async (parameters) => {
    //const url = (parameters) ? ("http://localhost:4000/Employee"+"?page=" + parameters.page +"&limit= " + parameters.limit) : "http://localhost:4000/Employee"
    const response = await fetch("http://localhost:4000/hr/allProfiles").then(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      }
    );
    return response;
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/employee/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(employee),
      mode: "cors",
      cache: "default",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    });
    return response;
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employee) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/hr/employee", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(employee),
      mode: "cors",
      cache: "default",
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    });
    return response;
  }
);

const defaultState = {
  employee: {
    employeeName: null,
    role: "employee",
    applicationStatus: null,
  },
  // currentPage: 1,
};
export const employeeSlice = createSlice({
  name: "employee",
  initialState: defaultState,
  reducers: {
    setEmployee: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action);
      state.employee.employeeName = action.payload.employeeName;
      state.employee.role = action.payload.role;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCartMerge: (state, action) => {
      state.cartMerged = false;
    },
    setCart: (state, action) => {
      state.user.shoppingCart = action.payload;
      state.user.totalPrice = action.payload.reduce(
        (currentPrice, Employee) => {
          return currentPrice + Number(Employee.price);
        },
        0
      );
    },
    setDisplayUser: (state, action) => {
      console.log(action);
      state.displayUser = action.payload;
    },
    setDisplayCart: (state, action) => {
      console.log(action);
      state.displayCart = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllEmployees.pending, (state, action) => {
        state.status = "loading";
        console.log("loading all employees");
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.status = "successful";
        console.log("fetch all employees successfully:");
        console.log(action);
        // Add any fetched posts to the array
        state.employees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("fetch all employees failed:");
        console.log(action.error.message);
      })
      .addCase(fetchCurrentEmployee.pending, (state, action) => {
        state.status = "loading";
        console.log("loading current employee");
      })
      .addCase(fetchCurrentEmployee.fulfilled, (state, action) => {
        state.status = "successful";
        console.log("fetch current employee successfully:");
        console.log(action);
        // Add any fetched posts to the array
        state.employees = action.payload;
      })
      .addCase(fetchCurrentEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("fetch current employee failed:");
        console.log(action.error.message);
      })
      .addCase(updateEmployee.pending, (state, action) => {
        state.status = "loading";
        console.log("updating employees");
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = "successful";
        console.log("update employee successfully:");
        console.log(action);
        // Add any fetched posts to the array
        state.employees = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("update employee failed:");
        console.log(action.error.message);
      })
      .addCase(createEmployee.pending, (state, action) => {
        state.status = "loading";
        console.log("creating employee");
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = "successful";
        console.log("create employee successfully:");
        console.log(action);
        // Add any fetched posts to the array
        state.employees = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("create employee failed:");
        console.log(action.error.message);
      });
  },
});

export const { setEmployee } = employeeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectEmployee = (state) => state.employee;

export default employeeSlice.reducer;
