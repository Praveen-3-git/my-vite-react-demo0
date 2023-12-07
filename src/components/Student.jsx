import * as React from 'react';
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Fab, Grid, IconButton, MenuItem, Snackbar, Stack, TextField, Tooltip, Typography,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from "@mui/x-date-pickers";
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import MuiAlert from '@mui/material/Alert';
function Student() {
  const [add, setadd] = useState(true);
  const [erow, seterow] = useState();

  function handleAdd() {
    setadd(false);
  }
  function handleBack() {
    setadd(true);
    seterow()
  }

  const handleEdit = (row) => {
    seterow(row)
    document.getElementById("addbtn").click();
  }

  return (
    <Container sx={{ marginY: "3rem" }}>
      {add ? (
        <StudentList handleAdd={handleAdd} handleEdit={handleEdit}/>
      ) : (
        <StudentEntry handleBack={handleBack} erow={erow} />
      )}
    </Container>
  );
}

// eslint-disable-next-line react/prop-types
function StudentList({ handleAdd, handleEdit }) {
  const [studata, setstudata] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[]
  var ch = mararr.map((item) => item.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stuarr = JSON.parse(localStorage.getItem("stuarr")) || [];
        const formateddata = stuarr.map((item) => ({
          id: item.id,
          sname: item.sname,
          gender: item.gender,
          email: item.email,
          department: item.department,
          semester: item.semester,
          date: item.date,
          pic: item.pic,
        }));
        setTimeout(() => {
          setstudata(formateddata);
          setLoading(false); // Set loading to false after fetching data
        }, 1000); // Adjust the timeout value (in milliseconds) as needed
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchData();
  }, []);

  const columns = [
    {field:"profile",headerName:'PROFILE',align:'center',headerAlign:'center',headerClassName: 'headercol',sortable:false, flex:0.5,renderCell:(params)=>(
      <div>
        <Avatar  alt={params.row.sname} 
        //src={`src/assets/Avatar/avatar${Math.floor(Math.random() * 10)}.jpg`} 
        src={params.row.pic.data} />
      </div>
    )},
    { field: "id", headerName: "STUDENT_ROLL",headerClassName: 'headercol',align:'center',headerAlign:'center',  minwidth:100 ,flex:1},
    { field: "sname", headerName: "STUDENT_NAME",headerClassName: 'headercol',headerAlign:'center',  minwidth:100 ,flex:2 ,renderCell:(params)=>(
      <div>
        <Typography variant="subtitle1">{params.row.sname}</Typography>
        <Typography variant="body2">{params.row.department}</Typography>
      </div>
    )},
    //{ field: "gender", headerName: "GENDER", minwidth:100 ,width:100 },
    //{ field: "date", headerName: "DOB", minwidth:100 },
    //{ field: "email", headerName: "Email_Id" ,headerClassName: 'headercol',  minwidth:100 ,width:200},
    //{ field: "department", headerName: "DEPARTMENT" ,headerClassName: 'headercol', minwidth:100 ,width:250  },
    { field: "semester", headerName: "SEMESTER" ,headerClassName: 'headercol', align:'center',headerAlign:'center', minwidth:100,flex:0.5 },
    {
      field: "act",
      headerName: "ACTION",
      minwidth:100 ,
      flex:1,
      align: "center",
      headerAlign: "center",
      sortable: false ,
      headerClassName: 'headercol', 
      renderCell: (params) => (
        <ButtonGroup variant="contained" size="small">
          <Tooltip title="EDIT" placement="left" arrow> 
          <Button color="info" onClick={() => handleEdit(params.row)}>
            <EditIcon/>
          </Button>
          </Tooltip>
          {!ch.some((itemm) => itemm == params.row.id) && (
          <Tooltip title="DELETE" placement='right' arrow >
          <Button color="error" onClick={() => handleDelete(params.row)}>
            <DeleteIcon/>
          </Button>
          </Tooltip>)}
        </ButtonGroup>
        )
    },
  ];

  const handleDelete = (row) => {
    const stuarr = JSON.parse(localStorage.getItem("stuarr")) || [];
    const filteredData = stuarr.filter(item => item.id !== row.id);
    localStorage.setItem("stuarr",JSON.stringify(filteredData)); 
    setstudata(filteredData);
  };

  return (
    <Card style={{ width: "100%" }}>
      <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title={"STUDENT LIST"}
        action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn" onClick={handleAdd} sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}} > <AddIcon/></Fab></Tooltip>}
      />
      {loading ? (
        <CardContent>
          {/* Show a loading indicator while data is being fetched */}
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src='src/assets/loading.gif'
              alt='emptyfolder'
              style={{ opacity: '0.5', pointerEvents: 'none', width: '9rem', height: '9rem' }}
            ></img>
            <Typography align='center'>LOADING ... </Typography>
          </div>
        </CardContent>
      ) : studata.length > 0 ? (
        <CardContent
          sx={{ margin: "auto", '& .headercol': { backgroundColor: 'gray', color: "white" } }}
        >
          <DataGrid
            rows={studata}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
          />
        </CardContent>
      ) : (
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src='src/assets/empty-folder.png'
              alt='emptyfolder'
              style={{ opacity: '0.5', pointerEvents: 'none', width: '9rem', height: '9rem' }}
            ></img>
            <Typography align='center'>NO RECORD FOUND</Typography>
          </div>
        </CardContent>
      )}
      {/* {studata.length>0
        ?(<CardContent sx={{  margin:"auto",'& .headercol': {backgroundColor: 'gray',color:"white",},}}>
        <DataGrid
          rows={studata}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </CardContent>)
        :(<CardContent>
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src='src/assets/empty-folder.png' alt='emptyfolder'  style={{opacity:'0.5',pointerEvents:'none',width:'9rem',height:'9rem'}}></img>
            <Typography align='center'>NO RECORD FOUND</Typography>
          </div>
          </CardContent>)} */}
    </Card>
  );
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// eslint-disable-next-line react/prop-types
function StudentEntry({ handleBack , erow }) {
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[]
  if (erow){
    const stuarr = JSON.parse(localStorage.getItem("stuarr"))  
    // eslint-disable-next-line react/prop-types
    var upid=stuarr.find(item => item.id==erow.id)
    //console.log(upid)
    var ch = mararr.some((item) => item.id==upid.id);
  }
  var p={
    name:'nopic',
    data:"src/assets/Avatar/profile.png"
  }
  const [depn,setdepn]=useState(erow ? upid.department:"");
  const [rol,setrol]=useState(erow ? upid.id : "");
  const stuarr = JSON.parse(localStorage.getItem("stuarr")) || [];
  const subarr = JSON.parse(localStorage.getItem("subarr"))||[];
  const [isHovered, setIsHovered] = useState(false);
  //const [photo,setPhoto]=useState('src/assets/Avatar/profile.png');
  const [photodata,setPhotodata]=useState(erow? upid.pic:p);
  const [open, setOpen] =useState(false);
  const formik = useFormik({
    initialValues: {
      sname: erow ?  upid.sname : "" ,
      //age: "",
      gender:erow ?  upid.gender : "" ,
      email: erow ?  upid.email : "" ,
      department: depn ,
      semester: erow ?  upid.semester : "" ,
      id: erow ?  upid.id : rol,
      date:erow ?  dayjs(upid.date) : null,
      code:erow? upid.code:"",
    },
    validationSchema: Yup.object({
      sname: Yup.string().min(2, "Name is Too Short!").required("Name is required"),
      //age: Yup.number().required("Age is required").positive().integer(),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      department: Yup.string().required("Department is required"),
      semester: Yup.number().required("Semester is required").positive().max(4),
      id: Yup.string().required("Roll_NO is required"),
      date: Yup.date('Invalid date').nullable(true).required('Date of birth is required'),
      //code:Yup.string().required("Code is Required")
    }), 
    validate: (values) => {
      const errors = {};
      const idregex = /^[A-Za-z]{3}\d{2}[A-Za-z]\d{3}$/i;
      // Add custom validation
      if (!idregex.test(values.id)) {
        errors.id = "Invalid Roll ID_Format:ABC00R000";
      }
      
      if(erow){
        // eslint-disable-next-line react/prop-types
        let upid=stuarr.findIndex(item => item.id==erow.id)
        if (stuarr.some((item,index) => item.id == rol && index>upid )) {
          errors.id = "Roll ID Already Registered";
        }
        if (stuarr.some((item,index) => item.id == rol&& index<upid )) {
          errors.id = "Roll ID Already Registered";
        }
        if (stuarr.some((item,index) => item.email == values.email &&index>upid)) {
          errors.email = "Email Already Registered";
        }
        if (stuarr.some((item,index) => item.email == values.email &&index<upid)) {
          errors.email = "Email Already Registered";
        }if (!idregex.test(rol)) {
          errors.id = "Invalid Roll ID_Format:ABC00R000";
        }

      }else{
        if (stuarr.some((item) => item.id == values.id)) {
          errors.id = "Roll_ID Already Registered";
        }
        if (stuarr.some((item) => item.email == values.email)) {
          errors.email = "E_mail Already Registered";
        }
      }
      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission
      if(photodata.data=="src/assets/Avatar/profile.png"){
        handleClick()
        return 
      }
      if(erow){
        updatework(values);
        console.log(stuarr)
        localStorage.setItem("stuarr",JSON.stringify(stuarr)); 
      }else{
        let v={...values,pic:photodata}
        console.log(v)
        stuarr.push(v);
        console.log(stuarr)
        localStorage.setItem("stuarr",JSON.stringify(stuarr)); 
      } 
      ba()
    },
  });

  function updatework(values){
    // eslint-disable-next-line react/prop-types
    let upid=stuarr.findIndex(item=> item.id==erow.id)
    stuarr[upid].sname=values.sname;
    stuarr[upid].gender=values.gender;
    stuarr[upid].email=values.email;
    stuarr[upid].department=values.department;
    stuarr[upid].semester=values.semester;
    stuarr[upid].id=values.id;
    stuarr[upid].date=values.date;
    stuarr[upid].code=values.code;
    stuarr[upid].pic=photodata;
    // eslint-disable-next-line react/prop-types
    if(ch){
      // eslint-disable-next-line react/prop-types
      let ui=mararr.findIndex(ite=> ite.id==erow.id)
      mararr[ui][`sem`]=values.semester;
      localStorage.setItem("mararr",JSON.stringify(mararr)); 
    }
  }

  function ba(){
    document.getElementById("closebtn").click();
  }
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleDateChange = (date) => {
    // Convert date to dayjs object
    const dayjsDate = dayjs(date).format('YYYY-MM-DD');
    console.log(dayjsDate)
    depchange(depn)
    //formik.setFieldValue(date);
    formik.setFieldValue("date", date, true)
    //formik.handleChange(date)
    let f3 = depn.slice(0, 3).toUpperCase();
    let y2 = dayjsDate.slice(2, 4);
    let r5 = f3 + y2 + "R";
    setrol(r5);
  };

  const depchange =(e)=>{
    if(e.target){
      //formik.setFieldValue('department', e.target.value);
      formik.handleChange(e)
      setdepn(e.target.value)
      var co=subarr.find(item=> item.dep==e.target.value)
      formik.setFieldValue("code", co.code, true)
      let f3 = e.target.value.slice(0, 3).toUpperCase();
      if (rol && !formik.touched.id) {
        // Only update if the 'id' field has not been manually touched
        setrol((prevRol) => f3 + prevRol.slice(3, 5));
      }
    }else{
      setdepn(e)
      let f3 = e.slice(0, 3).toUpperCase();
      if (rol && !formik.touched.id) {
        // Only update if the 'id' field has not been manually touched
        setrol((prevRol) => f3 + prevRol.slice(3, 5));
      }
    }
  }

  const handleIdChange = (e) => {
    // Update the 'rol' state when the user manually types the roll ID
    setrol(e.target.value);
    formik.handleChange(e);
  };

  const depoptio = () => {
    const menuItems = [];
      subarr.forEach(item => {
        let a = [];
        for (let i = 1; i <= 4; i++) {
          for (let j = 1; j <= 6; j++) {
            //a.push(item[`s${i}m${j}`]);
            if((i < 3 && j < 7) || (i > 2 && j < 5))
              a.push(item[`sem${i}`][`b${j}`])
          }
        }
        if (!a.some(subject => subject === "")) {
          menuItems.push(
            <MenuItem value={item.dep} key={item.dep}>
              {item.dep}
            </MenuItem>
          );
        }
      });
      return menuItems;
  };
  function handleImgChange(e) {
    console.log(e.target.files);
    //setPhoto(URL.createObjectURL(e.target.files[0]));
    console.log(e)
    const input = e.target;
    const files = input.files;
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        const imageObject = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: imageData,
        };
        console.log(imageObject)
        setPhotodata(imageObject)
      };
      reader.readAsDataURL(file);
  } 
  return (
    <Card>
      <CardHeader title={"STUDENT ENTRY"} sx={{backgroundColor:"#ece8d9"}}/>
      <CardContent>
        <form className="myform" onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item sm={3} style={{display:'flex',alignItems: 'center',justifyContent: 'space-around'}}>
              <div style={{width:"11rem",height:'11rem',border: open && '1px solid red' }}  
                onMouseEnter={() => ch ?  setIsHovered(false):  setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <label htmlFor="photopic" style={{position:'relative',pointerEvents:ch&&'none'}}>
                  {/* <div style={{position:'relative'}}> */}
                    <img src={photodata.data} alt='profile' width='170' height='170' style={{ opacity: isHovered ? 0.3 : 1, transition: 'opacity 0.3s' }}/>
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '18px', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s',}}>
                      <IconButton><PhotoCameraRoundedIcon/></IconButton>
                    </span>
                  {/* </div> */}
                </label>                
                <input style={{display:'none'}}
                  type="file" id="photopic" name="photopic" accept=".jpg, .png" onChange={handleImgChange}
                  readOnly={ch?true:false}
                />
              </div>
            </Grid>
            <Grid item container sm={9} spacing={1}>
              <Grid item sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  id="sname"
                  name="sname"
                  label="NAME"
                  InputProps={{readOnly:ch?true:false}}
                  value={formik.values.sname}
                  onChange={(e) => { formik.handleChange(e); }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sname && Boolean(formik.errors.sname)}
                  helperText={formik.touched.sname && formik.errors.sname}
                />
              </Grid>
              <Grid item sm={6}>
              <TextField
                size="small"
                fullWidth
                type="email"
                id="email"
                name="email"
                label="EMAIL"
                InputProps={{readOnly:ch?true:false}}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              </Grid>
              <Grid item sm={3} xs={12} >
                {/* <TextField
                  size="small"
                  fullWidth
                  id="age"
                  name="age"
                  label="AGE"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                /> */}
                <TextField
                  select
                  size="small"
                  fullWidth
                  id="gender"
                  name="gender"
                  label="GENDER"
                  InputProps={{readOnly:ch?true:false}}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={ formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={ formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem value="Male" key="Male"> Male </MenuItem>
                  <MenuItem value="Female" key="Female"> Female </MenuItem>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  id="department"
                  name="department"
                  label="DEPARTMENT"
                  InputProps={{readOnly:ch?true:false}}
                  value={formik.values.department}
                  //onChange={formik.handleChange}
                  onChange={depchange}
                  onBlur={formik.handleBlur}
                  error={ formik.touched.department && Boolean(formik.errors.department)}
                  helperText={ formik.touched.department && formik.errors.department}
                >
                  <MenuItem value=""> Select Department </MenuItem>
                  {/* {subarr.map((item) => (
                    <MenuItem value={item.dep} key={item.dep}>
                      {item.dep}
                    </MenuItem>
                  ))} */}
                    {depoptio()}
                </TextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  id="semester"
                  name="semester"
                  label="SEMESTER"
                  value={formik.values.semester}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={  formik.touched.semester && Boolean(formik.errors.semester)}
                  helperText={formik.touched.semester && formik.errors.semester}
                  >
                    {ch
                      ? [1, 2, 3, 4].filter(item => item >= upid.semester).map(item =>
                        <MenuItem value={item} key={item}> {item} </MenuItem>)
                      : [1, 2, 3, 4].map(item =>
                        <MenuItem value={item} key={item}> {item} </MenuItem>)
                    }
                </TextField>
              </Grid>
              <Grid item sm={5} > 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker
                    label="DOB"   
                    disableFuture   
                    onChange={handleDateChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    slotProps={{ textField: {
                        size: 'small', fullWidth: true, 
                        style: {
                          border: `1px solid ${formik.touched.date && formik.errors.date ? 'red' : '#ced4da'}`,
                        }, 
                        helperText: formik.touched.date && formik.errors.date ? (
                          <span style={{ color: 'red' }}>{formik.errors.date}</span>
                        ) : null,
                      }
                    }}
                  /> */}
                  <DatePicker
                    disableFuture
                    label="DOB"
                    format="DD/MM/YYYY"
                    value={formik.values.date}
                    readOnly={ch?true:false}
                    //onChange={(value) => formik.setFieldValue("date", value, true)}
                    onChange={handleDateChange}
                    onBlur={formik.handleBlur}
                    slotProps={{
                      textField: {
                        size: 'small', fullWidth: true,
                        error: formik.touched.date && Boolean(formik.errors.date),
                        helperText: formik.touched.date && formik.errors.date,
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={7}>
                  <TextField
                    size="small"
                    fullWidth
                    id="id"
                    name="id"
                    label="ROLL_ID"
                    InputProps={{readOnly:ch?true:false}}
                    value={rol}
                    onChange={handleIdChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.id && Boolean(formik.errors.id)}
                    helperText={formik.touched.id && formik.errors.id}
                  />
              </Grid>
            </Grid>
            <Grid item sm={12} sx={{ textAlign: "center",marginY:'1rem' }}>
              {erow ? (<Button  variant="contained"  color="info"  sx={{ marginX: "1rem" }}  type="submit"> Update </Button>) : 
              (<Button  variant="contained"  color="success"  sx={{ marginX: "1rem" }}  type="submit"> Save </Button>)}
              <Button  variant="contained"  color="error"  sx={{ marginX: "1rem" }}  id="closebtn"  onClick={handleBack}> Cancel</Button>
            </Grid>
          </Grid>
          {/* <Grid>
            <Avatar src={photodata.data} alt='alt' width='200' height='200'  />
          </Grid> */}
        </form>
        <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Need To Select Photo
        </Alert>
      </Snackbar>
    </Stack>
      </CardContent>
    </Card>
  );
}
export default Student;
