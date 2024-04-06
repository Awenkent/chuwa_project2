import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchEmployee = createAsyncThunk('product/fetchProductCount', async () => {

  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:4000/product/count",{
    method:'POST',
    headers:{
      'Content-Type':'application/json;charset=UTF-8',
  },
    mode:'cors',
    cache:'default'
  }) .then((response) =>
  {
    if(response.ok) {
      return response.json()
    }
    else
    {
      return response.text().then(text => { throw new Error(text) });
    }
  }) 
  return response;
})
export const fetchProducts = createAsyncThunk('product/fetchProducts', async (parameters) => {

  const url = (parameters) ? ("http://localhost:4000/product"+"?page=" + parameters.page +"&limit= " + parameters.limit) : "http://localhost:4000/product"
  const response = await fetch(url)
  .then((response) => 
  {
    if(response.ok) {
      return response.json()
    }
    else
    {
      return response.text().then(text => { throw new Error(text) });
    }
  })
  return response;
})
const defaultState = {
  employee :{
  employeeName: null,
  role: "Employee",
  applicationStatus:"Never submitted",
  personalProfile:
  {
    employeeFirstName:"",
    employeeMiddleName:"",
    employeeLastName:"",
    employeePhoneNumber:"",
    employeeEmail:"",
    employeeSSN:"",
    employeeDateOfBirth:"",
    empoyeeGender:"",
    employeeProfileImage:"",
    employeeBuildingAptNumber:"",
    employeeStreetName:"",
    employeeCity:"",
    employeeState:"",
    employeeZip:"",
    employeeWorkPermit:[],
    employeeReferencee:"",
    employeeEmergencyContact:""
  }
  },
  currentPage:1,
}
export const employeeSlice = createSlice({
  name: "employee",
  initialState: defaultState,
  reducers: {
    setEmployee: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action)
      state.employee.employeeName = action.payload.employeeName;
      state.employee.role = action.payload.role;
      state.employee.applicationStatus = action.payload.applicationStatus
     
    },
    setEmployeeProfile :(state,action) =>{
      state.employee.personalProfile = action.payload
    },
    setCartMerge: (state, action) => {
      state.cartMerged = false
    },
    setCart: (state, action) => {
      state.user.shoppingCart = action.payload;
      state.user.totalPrice = action.payload.reduce((currentPrice, product) => {
        return currentPrice + Number(product.price);
      }, 0);
    },
    setDisplayUser: (state,action)=>{
      console.log(action)
      state.displayUser = action.payload
    },
    setDisplayCart: (state,action)=>{
      console.log(action)
      state.displayCart = action.payload
    }
 
  },
  extraReducers(builder) {
 
     
  }
});

export const { setEmployee,setEmployeeProfile} = employeeSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectEmployee = (state) => state.employee.employee
export default employeeSlice.reducer;
