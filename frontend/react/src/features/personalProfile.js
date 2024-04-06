import React from "react";
import { useState, useRef, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { useSelector, useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setEmployee,
  selectEmployee,
  fetchEmployee,
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
export default function productManage(props) {
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState(
    location.state ? location.state.employee.firstName : ""
  );
  const [lastName, setLastName] = useState(
    location.state ? location.state.employee.lastName : ""
  );
  const [middleName, setMiddleName] = useState(
    location.state ? location.state.employee.middleName : ""
  );
  const [preferredName, setPreferredName] = useState(
    location.state ? location.state.employee.preferredName : ""
  );
  const [profilePictureLink, setProfilePictureLink] = useState(
    location.state
      ? location.state.employee.profilePictureLink
      : "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
  );
  const [email, setEmail] = useState(
    location.state ? location.state.employee.email : ""
  );
  const [SSN, setSSN] = useState(
    location.state ? location.state.employee.SSN : ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    location.state ? location.state.employee.dateOfBirth : ""
  );
  const [gender, setGender] = useState(
    location.state ? location.state.employee.gender : ""
  );
  const [currentAddress, setCurrentAddress] = useState(
    location.state ? location.state.employee.currentAddress : ""
  );
  const [cellPhoneNumber, setCellPhoneNumber] = useState(
    location.state ? location.state.employee.cellPhoneNumber : ""
  );
  const [workPhoneNumber, setWorkPhoneNumber] = useState(
    location.state ? location.state.employee.workPhoneNumber : ""
  );
  const [workAuthStatus, setWorkAuthStatus] = useState(
    location.state ? location.state.employee.workAuthStatus : ""
  );
  const [workAuthStartDate, setWorkAuthStartDate] = useState(
    location.state ? location.state.employee.workAuthStartDate : ""
  );
  const [workAuthEndDate, setWorkAuthEndDate] = useState(
    location.state ? location.state.employee.workAuthEndDate : ""
  );
  const [emergencyContacts, setEmergencyContacts] = useState(
    location.state ? location.state.employee.emergencyContacts : []
  );
  const [documents, setDocuments] = useState(
    location.state ? location.state.employee.documents : []
  );

  const [imagePreview, setImagePreview] = useState(
    location.state
      ? location.state.product.imageLink
      : "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
  );

  const [errorState, setErrorState] = useState({
    errorCount: 0,
    firstNameError: "",
    lastNameError: "",
    middleNameError: "",
    preferredNameError: "",
    profilePictureLinkError: "",
    emailError: "",
    SSNError: "",
    dateOfBirthError: "",
    genderError: "",
    currentAddressError: "",
    cellPhoneNumberError: "",
    workPhoneNumberError: "",
    workAuthStatusError: "",
    workAuthStartDateError: "",
    workAuthEndDateError: "",
    emergencyContactsError: "",
    documentsError: "",
  });

  const handleUpdateProfile = () => {
    let errorObj = {
      errorCount: 0,
      firstNameError: "",
      lastNameError: "",
      middleNameError: "",
      preferredNameError: "",
      profilePictureLinkError: "",
      emailError: "",
      SSNError: "",
      dateOfBirthError: "",
      genderError: "",
      currentAddressError: "",
      cellPhoneNumberError: "",
      workPhoneNumberError: "",
      workAuthStatusError: "",
      workAuthStartDateError: "",
      workAuthEndDateError: "",
      emergencyContactsError: "",
      documentsError: "",
    };

    if (!firstName) {
      errorObj.errorCount += 1;
      errorObj.firstNameError = "First Name cannot be empty.";
    }

    if (!lastName) {
      errorObj.errorCount += 1;
      errorObj.lastNameError = "Last Name cannot be empty.";
    }

    if (!middleName) {
      errorObj.errorCount += 1;
      errorObj.middleNameError = "Middle Name cannot be empty.";
    }

    if (!preferredName) {
      errorObj.errorCount += 1;
      errorObj.preferredNameError = "Preferred Name cannot be empty.";
    }

    if (!profilePictureLink) {
      errorObj.errorCount += 1;
      errorObj.profilePictureLinkError =
        "Profile Picture Link cannot be empty.";
    }

    if (!email) {
      errorObj.errorCount += 1;
      errorObj.emailError = "Email cannot be empty.";
    }

    if (!SSN) {
      errorObj.errorCount += 1;
      errorObj.SSNError = "SSN cannot be empty.";
    }

    if (!dateOfBirth) {
      errorObj.errorCount += 1;
      errorObj.dateOfBirthError = "Date of Birth cannot be empty.";
    }

    if (!gender) {
      errorObj.errorCount += 1;
      errorObj.genderError = "Gender cannot be empty.";
    }

    if (!currentAddress) {
      errorObj.errorCount += 1;
      errorObj.currentAddressError = "Current Address cannot be empty.";
    }

    if (!cellPhoneNumber) {
      errorObj.errorCount += 1;
      errorObj.cellPhoneNumberError = "Cell Phone Number cannot be empty.";
    }

    if (!workPhoneNumber) {
      errorObj.errorCount += 1;
      errorObj.workPhoneNumberError = "Work Phone Number cannot be empty.";
    }

    if (!workAuthStatus) {
      errorObj.errorCount += 1;
      errorObj.workAuthStatusError =
        "Work Authorization Status cannot be empty.";
    }

    if (!workAuthStartDate) {
      errorObj.errorCount += 1;
      errorObj.workAuthStartDateError =
        "Work Authorization Start Date cannot be empty.";
    }

    if (!workAuthEndDate) {
      errorObj.errorCount += 1;
      errorObj.workAuthEndDateError =
        "Work Authorization End Date cannot be empty.";
    }

    if (emergencyContacts.length === 0) {
      errorObj.errorCount += 1;
      errorObj.emergencyContactsError = "Emergency Contacts cannot be empty.";
    }

    if (documents.length === 0) {
      errorObj.errorCount += 1;
      errorObj.documentsError = "Documents cannot be empty.";
    }

    if (errorObj.errorCount > 0) {
      setErrorState(() => {
        return errorObj;
      });
      alert("One or more input is invalid, please try again");
      return;
    }

    let employeeObj = {
      ...employee,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      preferredName: preferredName,
      profilePictureLink: profilePictureLink,
      email: email,
      SSN: SSN,
      dateOfBirth: dateOfBirth,
      gender: gender,
      currentAddress: currentAddress,
      cellPhoneNumber: cellPhoneNumber,
      workPhoneNumber: workPhoneNumber,
      workAuthStatus: workAuthStatus,
      workAuthStartDate: workAuthStartDate,
      workAuthEndDate: workAuthEndDate,
      emergencyContacts: emergencyContacts,
      documents: documents,
    };

    dispatch(
      updateProfile({ employee: employeeObj, id: location.state.employee._id })
    ).then((res) => {
      if (res.error) {
        alert(res.error.message);
      } else {
        alert("product updated!");
        navigate("/");
      }
    });
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handlePreferredNameChange = (e) => {
    setPreferredName(e.target.value);
  };

  const handleProfilePictureLinkChange = (e) => {
    setProfilePictureLink(e.target.value);
  };
  const handleProfilePictureLinkUpload = () => {
    setImagePreview(productImageLink);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSSNChange = (e) => {
    setSSN(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleCurrentAddressChange = (e) => {
    setCurrentAddress(e.target.value);
  };

  const handleCellPhoneNumberChange = (e) => {
    setCellPhoneNumber(e.target.value);
  };

  const handleWorkPhoneNumberChange = (e) => {
    setWorkPhoneNumber(e.target.value);
  };

  const handleWorkAuthStatusChange = (e) => {
    setWorkAuthStatus(e.target.value);
  };

  const handleWorkAuthStartDateChange = (e) => {
    setWorkAuthStartDate(e.target.value);
  };

  const handleWorkAuthEndDateChange = (e) => {
    setWorkAuthEndDate(e.target.value);
  };

  const handleEmergencyContactsChange = (e) => {
    // Assuming emergencyContacts is an array
    setEmergencyContacts(e.target.value.split(","));
  };

  const handleDocumentsChange = (e) => {
    // Assuming documents is an array
    setDocuments(e.target.value.split(","));
  };

  console.log(location.state);
  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    if (employee.userName === null) {
      dispatch(fetchCurrentEmployee());
    }
  }, []);

  if (matches) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2>{"Update Your Profile"}</h2>
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
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <h2>Name</h2>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  First Name
                </InputLabel>
                <TextField
                  style={{ marginTop: "20px" }}
                  size="small"
                  id="name-input"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  error={!!errorState.firstNameError}
                  helperText={errorState.firstNameError}
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="lastName-input">
                  Last Name
                </InputLabel>
                <TextField
                  style={{ marginTop: "20px" }}
                  size="small"
                  id="lastName-input"
                  value={lastName}
                  onChange={handleLastNameChange}
                  error={!!errorState.lastNameError}
                  helperText={errorState.lastNameError}
                />
              </FormControl>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              ></div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <FormControl
                  variant="standard"
                  fullWidth
                  style={{ flex: 1.25 }}
                >
                  <InputLabel shrink htmlFor="imageLink-input">
                    Add Profile
                  </InputLabel>
                  <BootstrapInput
                    id="outlined-adornment-password"
                    style={{ marginTop: "20px" }}
                    size="small"
                    value={profilePictureLink}
                    error={!!errorState.profilePictureLinkError}
                    helperText={errorState.profilePictureLinkError}
                    onChange={handleProfilePictureLinkChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          onClick={handleProfilePictureLinkUpload}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <FormControl variant="standard" fullWidth>
                <img src={imagePreview}></img>
              </FormControl>
              <Button
                variant="contained"
                fullWidth
                onClick={handleUpdateProfile}
              >
                { "Update Product"}
              </Button>
            </Box>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2>{location.state ? "Update Product" : "Create Product"}</h2>
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
                <TextField
                  id="name-input"
                  style={{ marginTop: "20px" }}
                  size="small"
                  value={productName}
                  onChange={handleProductNameChange}
                  error={!!errorState.productNameError}
                  helperText={errorState.productNameError}
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Description
                </InputLabel>
                <TextareaAutosize
                  aria-label="empty textarea"
                  minRows={8}
                  value={productDescription}
                  onChange={handleProductDescriptionChange}
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Category
                </InputLabel>
                <TextField
                  id="category-input"
                  style={{ marginTop: "20px" }}
                  size="small"
                  value={productCategory}
                  onChange={handleProductCategoryChange}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Price
                </InputLabel>
                <TextField
                  id="price-input"
                  style={{ marginTop: "20px" }}
                  size="small"
                  value={productPrice}
                  onChange={handleProductPriceChange}
                  error={!!errorState.priceError}
                  helperText={errorState.priceError}
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  In Stock Quantity
                </InputLabel>
                <TextField
                  id="quantity-input"
                  style={{ marginTop: "20px" }}
                  size="small"
                  value={productQuantity}
                  onChange={handleProductQuantityChange}
                  error={!!errorState.quantityError}
                  helperText={errorState.quantityError}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="imageLink-input">
                  Add Image Link
                </InputLabel>
                <BootstrapInput
                  id="imageLink_input"
                  style={{ marginTop: "20px" }}
                  size="small"
                  error={!!errorState.imageLinkError}
                  helperText={errorState.imageLinkError}
                  value={productImageLink}
                  onChange={handleProductImageLinkChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick={handleProductImageLinkUpload}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <img src={imagePreview}></img>
              </FormControl>
              <Button
                variant="contained"
                fullWidth
                onClick={handleProductCreation}
              >
                {location.state ? "Update Product" : "Add Product"}
              </Button>
              {location.state ? (
                <Button onClick={handleDelete}>delete Product</Button>
              ) : (
                ""
              )}
            </Box>
          </form>
        </div>
      </div>
    );
  }
}
