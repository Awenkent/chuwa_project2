import React from "react";
import { useState,useRef,useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import FileUpload from "../components/fileUpload"
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useForm, SubmitHandler } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate,useLocation } from "react-router-dom";
import {
    setEmployee,
    selectEmployee,
    fetchEmployee,
    setEmployeeProfile
  } from "../redux/employeeSlice";


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "white" : "white",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
const TextareaAutosize = styled(BaseTextareaAutosize)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
export default function application(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const errorToPropMapping = {
    "required": "This field is required",
    "maxLength": "Max Length exceeded",
    "pattern": "Incorrect Format"
  }
  
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const watchUSResidency = watch("employeeResidency");
  const watchProfilePicture= watch("employeeProfilePicture")
  const [imagePreview,setImagePreview] = useState(employee.personalProfile.employeeProfilePicture? employee.personalProfile.employeeProfilePicture:"https://preyash2047.github.io/assets/img/no-preview-available.png?h=824917b166935ea4772542bec6e8f636")
  const [files,setFiles] = useState([]);

  console.log(employee)
  const handleEmployeeProfileImageUpload = ()=>
  {
     setImagePreview(watchProfilePicture)
  }
  const handleDelete = ()=>{
    dispatch(deleteProducts(location.state.product._id)).then((res)=>{
      if(res.error)
      { 
        alert( res.error.message) 
      }
      else
      {
        alert("product deleted!")
        navigate("/")
      }
    })  
  }
 const handleProductCreation = ()=>
 {
  let errorObj={
    errorCount :0,
    productNameError: "",
    descriptionError: "",
    categoryError: "",
    priceError: "",
    imageLinkError: "",
    quantityError: "",
  };

  if(!productName)
  {
    errorObj.errorCount += 1;
    errorObj.productNameError = "Product Name cannot be empty."
  }

  if(!productCategory)
  {
    errorObj.errorCount += 1;
    errorObj.categoryError = "category Name cannot be empty."
  }

  if(!productPrice)
  {
    errorObj.errorCount += 1;
    errorObj.priceError = "Price cannot be empty."
  }else if(productPrice <= 0)
  {
    errorObj.errorCount += 1;
    errorObj.priceError = "Price should be at least greater than 0."
  }

  if(!productImageLink)
  {
    errorObj.errorCount += 1;
    errorObj.imageLinkError = "ImageLink cannot be empty."
  }

  if(!productQuantity)
  {
    errorObj.errorCount += 1;
    errorObj.quantityError = "Quantity cannot be empty."
  }else if(productQuantity <= 0)
  {
    errorObj.errorCount += 1;
    errorObj.quantityError = "Quantity shoud be at least 1."
  }



  if(errorObj.errorCount > 0)
  {
    setErrorState(()=>{
      return errorObj;
    })
    alert("One or more input is invalid, please try again")
    return;
  }

  let productObj = {
    productName: productName,
    description:productDescription,
    category:productCategory,
    price:productPrice,
    imageLink:productImageLink,
    quantity: productQuantity
  };
  location.state? 
  dispatch( updateProduct({product: productObj,id : location.state.product._id})).then((res)=>{
    if(res.error)
    { 
      alert( res.error.message) 
    }
    else
    {
      alert("product updated!")
      navigate("/")
    }
    
  })
  
  : dispatch(createProduct(productObj)).then((res)=>{
    
    console.log(res)
    if(res.error)
    { 
      alert( res.error.message) 
    }
    else
    {
    alert("product created!")
    navigate("/")
    }
  })
  
 }
 


  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => {
   
    if(employee.employeeName === null)
    {
     // dispatch(fetchEmployee()); 
   
    }
  }, []);

 const onSubmit = (data) => {
  console.log(data)
  console.log(files)
  dispatch(setEmployee({employeeName:"ff", role : "hr", applicationStatus:"approved"}))
  dispatch(setEmployeeProfile(data))
  navigate("/")
}

    return (
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <h2>{location.state ?"Update Product" : "Create Product"}</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 3,
              }}
            >
                  <div style={{ borderTop:"1px solid gray", width:"100%"}}><h5 style={{margin:"10px 0"}}>Personal Information</h5></div>
               <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
                   
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  First Name
                </InputLabel>
                <TextField defaultValue={employee.personalProfile? employee.personalProfile.employeeFirstName:""} style={{ marginTop: "20px" }} {...register("employeeFirstName", { required: true, maxLength: 20 ,pattern:/^[A-Za-z]+$/i})} size="small" id="name-input" erro
                error = {!!(errors?.employeeFirstName)} helperText={           
                  (errors?.employeeFirstName?.type) ?  errorToPropMapping[errors?.employeeFirstName?.type]:"" 
                }
                />
        
   
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Middle Name
                </InputLabel>
                <TextField defaultValue={employee.personalProfile? employee.personalProfile.employeeMiddleName:"" } style={{ marginTop: "20px" }}  {...register("employeeMiddleName",{maxLength: 20 ,pattern:/^[A-Za-z]+$/i})} size="small" id="name-input" erro
                error = {!!(errors?.employeeMiddleName)} helperText={           
                  (errors?.employeeMiddleName?.type) ?  errorToPropMapping[errors?.employeeMiddleName?.type]:"" 
                }/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Last Name
                </InputLabel>
                <TextField defaultValue={employee.personalProfile? employee.personalProfile.employeeLastName:""} style={{ marginTop: "20px" }}  {...register("employeeLastName", { required: true, maxLength: 20 ,pattern:/^[A-Za-z]+$/i})} size="small" id="name-input" erro
                error = {!!(errors?.employeeLastName)} helperText={           
                  (errors?.employeeLastName?.type) ?  errorToPropMapping[errors?.employeeLastName?.type]:"" 
                }/>
              </FormControl>
          
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Phone Number
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeePhoneNumber:""} {...register("employeePhoneNumber", { required: true, maxLength: 20 ,pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im})} size="small" id="name-input"
                error = {!!(errors?.employeePhoneNumber)} helperText={           
                  (errors?.employeePhoneNumber?.type) ?  errorToPropMapping[errors?.employeePhoneNumber?.type]+ " Example:(123)4567890":"" 
                } />
              </FormControl>
              
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Email 
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeEmail:""} {...register("employeeEmail", { required: true, maxLength: 120 ,pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} size="small" id="name-input" 
                   error = {!!(errors?.employeeEmail)} helperText={           
                    (errors?.employeeEmail?.type) ?  errorToPropMapping[errors?.employeeEmail?.type]+ " Example:user@mail.com" :"" 
                  }/>
              </FormControl>
              </div>
             
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  SSN
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeSsn:""} {...register("employeeSsn", {required: true, maxLength: 20 ,pattern: /^\d{3}-\d{2}-\d{4}$/})} size="small" id="name-input" 
                  error = {!!(errors?.employeeSsn)} helperText={           
                    (errors?.employeeSsn?.type) ?  errorToPropMapping[errors?.employeeSsn?.type]+ " Example: 123-45-6778" :"" 
                  }/>
              </FormControl>
            
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Date of Birth
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeDateOfBirth:""} {...register("employeeDateOfBirth", { required: true, maxLength: 120 ,pattern:  /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/})} size="small" id="name-input" 
                  error = {!!(errors?.employeeDateOfBirth)} helperText={           
                    (errors?.employeeDateOfBirth?.type) ?  errorToPropMapping[errors?.employeeDateOfBirth?.type]+ " Example: MM/DD/YYYY" :"" 
                  }/>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Gender
                </InputLabel>
                <Select

              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
        size="small"
        defaultValue={employee.personalProfile? employee.personalProfile.employeeGender:"NoAnswer"}
        style={{ marginTop: "12px" }}  {...register("employeeGender")} 
      >

            <MenuItem key={"Male"} value={"Male"}>
              {"Male"}
            </MenuItem>
            <MenuItem key={"Female"} value={"Female"}>
              {"Female"}
            </MenuItem>
            <MenuItem key={"NoAnswer"} value={"NoAnswer"}>
              {"Preferre not to answer"}
            </MenuItem>
            </Select>
              
              </FormControl>
              </div>
             
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Profile Image
                </InputLabel>
                <BootstrapInput style={{ marginTop: "20px" }}  defaultValue={employee.personalProfile? employee.personalProfile.employeeProfilePicture:""} {...register("employeeProfilePicture", { required: true, maxLength: 120})} size="small" id="name-input" 
                error = {!!(errors?.employeeProfilePicture)} helperText={           
                  (errors?.employeeProfilePicture?.type) ?  errorToPropMapping[errors?.employeeProfilePicture?.type]+ " Example: MM/DD/YYYY" :"" 
                }
                endAdornment={ 
                <InputAdornment position="end">
                      <Button
                        size="small"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick ={handleEmployeeProfileImageUpload} 
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </InputAdornment>}/>
              
              </FormControl>
              <div>
                
              <img height={150} src={imagePreview}></img>
                </div>
              <div>
              <div style={{ borderTop:"1px solid gray", width:"100%"}}><h5 style={{margin:"10px 0"}}>Address</h5></div>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Building/Apt Number
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeBuildingApt:""} {...register("employeeBuildingApt", { required: true, maxLength: 120})} size="small" id="name-input" 
                 error = {!!(errors?.employeeBuildingApt)} helperText={           
                  (errors?.employeeBuildingApt?.type) ?  errorToPropMapping[errors?.employeeBuildingApt?.type]:"" 
                }/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Street Name
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeStreetName:""} {...register("employeeStreetName", { required: true, maxLength: 120})} size="small" id="name-input" 
                 error = {!!(errors?.employeeStreetName)} helperText={           
                  (errors?.employeeStreetName?.type) ?  errorToPropMapping[errors?.employeeStreetName?.type]:"" 
                }/>
              </FormControl>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 City
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeCity:""} {...register("employeeCity", { required: true, maxLength: 120})} size="small" id="name-input" 
                error = {!!(errors?.employeeCity)} helperText={           
                  (errors?.employeeCity?.type) ?  errorToPropMapping[errors?.employeeCity?.type]:"" 
                }/>
              </FormControl>
          
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 State
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeState:""} {...register("employeeState", { required: true, maxLength: 120})} size="small" id="name-input" 
                   error = {!!(errors?.employeeState)} helperText={           
                    (errors?.employeeState?.type) ?  errorToPropMapping[errors?.employeeState?.type]:"" 
                  }/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Zip
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.employeeZip:""} {...register("employeeZip", { required: true, maxLength: 120})} size="small" id="name-input" 
                   error = {!!(errors?.employeeZip)} helperText={           
                    (errors?.employeeZip?.type) ?  errorToPropMapping[errors?.employeeZip?.type]:"" 
                  }/>
                
              </FormControl>
              </div>
              </div>
              <div style={{ borderTop:"1px solid gray", width:"100%"}}><h5  style={{margin:"10px 0"}}>Reference</h5></div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  First Name
                </InputLabel>
                <TextField defaultValue={employee.personalProfile? employee.personalProfile.employeeReferenceFirstName:""} style={{ marginTop: "20px" }} {...register("employeeReferenceFirstName", { required: true, maxLength: 20 ,pattern:/^[A-Za-z]+$/i})} size="small" id="name-input" erro
                error = {!!(errors?.employeeReferenceFirstName)} helperText={           
                  (errors?.employeeReferenceFirstName?.type) ?  errorToPropMapping[errors?.employeeReferenceFirstName?.type]:"" 
                }
                />
        
   
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Middle Name
                </InputLabel>
                <TextField defaultValue={employee.personalProfile? employee.personalProfile.employeeReferenceMiddleName:"" } style={{ marginTop: "20px" }}  {...register("employeeReferenceMiddleName",{maxLength: 20 ,pattern:/^[A-Za-z]+$/i})} size="small" id="name-input" erro
                error = {!!(errors?.employeeReferenceMiddleName)} helperText={           
                  (errors?.employeeReferenceMiddleName?.type) ?  errorToPropMapping[errors?.employeeReferenceMiddleName?.type]:"" 
                }/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Last Name
                </InputLabel>
                <TextField defaultValue={employee.personalProfile? employee.personalProfile.employeeLastName:""} style={{ marginTop: "20px" }}  {...register("employeeReferenceLastName", { required: true, maxLength: 20 ,pattern:/^[A-Za-z]+$/i})} size="small" id="name-input" erro
                error = {!!(errors?.employeeReferenceLastName)} helperText={           
                  (errors?.employeeReferenceLastName?.type) ?  errorToPropMapping[errors?.employeeReferenceLastName?.type]:"" 
                }/>
              </FormControl>
             </div>
             <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
             <span>Permanent resident or citizen of the U.S? </span><input type="checkbox" {...register("employeeResidency")}></input>
                
</div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>

             
          
            {watchUSResidency?
              
              (<FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Work Permit
                </InputLabel>
                <FileUpload fileHandler = {setFiles}/>   
              </FormControl>)
              :
              <></>
            }
         
              </div>
              <Button variant="contained" type = "submit" fullWidth>
                Submit Application
              </Button>
              
            </Box>
          </div>
        </div>
      </div>
    );

    /*
    return (
      
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
            <h2>{location.state ?"Update Product" : "Create Product"}</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
          <form action="" style={{ textAlign: "center" }}>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Name
                </InputLabel>
                <TextField id="name-input" style={{ marginTop: "20px" }} size="small" value = {productName} onChange={handleProductNameChange} error = {!!errorState.productNameError} helperText={errorState.productNameError}/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Description
                </InputLabel>
                <TextareaAutosize aria-label="empty textarea" minRows={8} value = {productDescription} onChange={handleProductDescriptionChange}/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Category
                </InputLabel>
                <TextField id="category-input" style={{ marginTop: "20px" }} size="small" value = {productCategory} onChange={handleProductCategoryChange}/>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Price
                </InputLabel>
                <TextField id="price-input" style={{ marginTop: "20px" }} size="small" value = {productPrice} onChange={handleProductPriceChange} error = {!!errorState.priceError} helperText={errorState.priceError}/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  In Stock Quantity
                </InputLabel>
                <TextField id="quantity-input" style={{ marginTop: "20px" }} size="small" value = {productQuantity} onChange={handleProductQuantityChange} error = {!!errorState.quantityError} helperText={errorState.quantityError}/>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="imageLink-input">
                  Add Image Link
                </InputLabel>
                <BootstrapInput
                  id="imageLink_input"
                  style={{ marginTop: "20px" }} size="small"
                  error = {!!errorState.imageLinkError} 
                  helperText={errorState.imageLinkError}
                  value = {productImageLink} onChange={handleProductImageLinkChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        component="label"
                        
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick ={handleProductImageLinkUpload} 
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                       
                      </Button>
                    </InputAdornment>
                  }
                />

              </FormControl>
 <FormControl variant="standard" fullWidth>
                <img  src={imagePreview}></img>
              </FormControl>
              <Button variant="contained" fullWidth onClick={handleProductCreation}>
              {location.state ?"Update Product" : "Add Product"}
              </Button>
              {location.state? <Button onClick={handleDelete}>delete Product</Button> :""}
            </Box>
          </form>
        </div>
      </div>
     
    );
     */
  
}
