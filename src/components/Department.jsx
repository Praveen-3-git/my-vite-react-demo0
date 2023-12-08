/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Button, Container, TextField, ButtonGroup, Snackbar,InputAdornment, Fab, Tooltip, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Department() {
  const [add, setAdd] = useState(true);
  const [erow, seterow] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("dataarr")) || [];
    const formattedData = data.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
    }));
    setDepartmentData(formattedData);
  }, [add]);
  const subarr= JSON.parse(localStorage.getItem("subarr")) || [];
  var ch = subarr.map((item) => item.dep);

  const handleClick = (e) => {
    setError(e)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function handleAdd() {
    setAdd(false);
    handleClose()
  }

  function handleBack() {
    setAdd(true);
    seterow();
    handleClose()
  }

  const handleEdit = (row) => {
    if(ch.some((itemm) => itemm == row.name)){
      handleClick("Can't Edit Value already used ")
      return;
    }
    handleClose()
    seterow(row)
    document.getElementById("addbtn").click();
  }

  

  const handleDelete = (row) => {
    if(ch.some((itemm) => itemm == row.name)){
      handleClick("Can't Delete Value already used ")
      return;
    }
    const data = JSON.parse(localStorage.getItem("dataarr")) || [];
    const filteredData = data.filter(item => item.id !== row.id);
    localStorage.setItem("dataarr", JSON.stringify(filteredData));
    setDepartmentData(filteredData);
  };
  return (
    <Container className='my-5'>
      {add ? <DepartmentList handleAdd={handleAdd} handleEdit={handleEdit} open={open} error={error} handleClose={handleClose} handleDelete={handleDelete} departmentData={departmentData}/> 
           : <DepartmentEntry handleBack={handleBack} erow={erow} open={open} error={error} handleClick={handleClick} handleClose={handleClose}/>}
    </Container>
  );
}

// eslint-disable-next-line react/prop-types
function DepartmentList({ handleAdd, handleEdit ,open,error,handleClose ,handleDelete ,departmentData}) {
  // const subarr= JSON.parse(localStorage.getItem("subarr")) || [];
  // var ch = subarr.map((item) => item.dep);
  
const columns = [
  {
    field: 'code',
    headerName: 'Department Code',
    flex: 0.3,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'headercol',
    renderCell: (params) => (
      <div style={{ textTransform: 'uppercase' }}>{params.value}</div>
    ),
  },
  { field: 'name', headerName: 'Department Name', flex: 1, minWidth: 200 ,headerClassName: 'headercol', align: 'center',headerAlign: 'center',},
  {
    field: 'act',
    headerName: 'Action',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    minWidth: 150,
    sortable: false ,
    headerClassName: 'headercol',
    renderCell: (params) => (
      <ButtonGroup variant='contained' size='small'>
        <Tooltip title="EDIT" placement="left" arrow> 
          <Button
            color='info'
            onClick={() => handleEdit(params.row)}
            //disabled={ch.some((itemm) => itemm === params.row.name)}
            sx={{ paddingY: '0.5rem' }}
          >  <EditIcon /> 
          </Button> 
        </Tooltip>
        <Tooltip title="DELETE" placement='right' arrow >
        <Button color='error' onClick={() => handleDelete(params.row)} >
          <DeleteIcon />
        </Button>
        </Tooltip>
      </ButtonGroup>
    ),
    // renderCell: (params) => (
    //   !ch.some((itemm) => itemm == params.row.name) && (
    //     <ButtonGroup variant='contained' size='small'>
    //     <Button color='primary' onClick={() => handleEdit(params.row)}>
    //       <EditIcon />
    //     </Button>
    //      {/* Note: This is outside the Button element, might be a typo */}
    //     <Button color='error' onClick={() => handleDelete(params.row)}>
    //       <DeleteIcon />
    //     </Button>
    //   </ButtonGroup>
    //   )
    // ),
  },
];

  return (
    <Card style={{ width:"100%"}}>
      <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title={"DEPARTMENT LIST"}
        action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn" onClick={handleAdd} sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}} > <AddIcon/></Fab></Tooltip>}
      ></CardHeader>
      {departmentData.length>0
        ?(<CardContent>
          <Box sx={{'& .headercol': {backgroundColor: 'gray',color:"white"}}}>
            <DataGrid 
              rows={departmentData}
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
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {open && error }
              </Alert>
            </Snackbar>
        </CardContent>)
        :(<CardContent>
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src='src/assets/empty-folder.png' alt='emptyfolder'  style={{opacity:'0.5',pointerEvents:'none',width:'9rem',height:'9rem'}}></img>
            <Typography align='center'>NO RECORD FOUND</Typography>
          </div>
          </CardContent>)}
      
    </Card>
  );
}

// eslint-disable-next-line react/prop-types
function DepartmentEntry({ handleBack, erow ,open ,error ,handleClick ,handleClose}) {
  const data = JSON.parse(localStorage.getItem("dataarr")) || [];

  function validate() {
    if (document.querySelector("#dcode").value === "") {
      
      handleClick("Department Code must be filled");
      return false;
    } else if (document.querySelector("#dname").value === "") {
      
      handleClick("Department Name must be filled");
      return false;
    } else {
      return true;
    }
  }
  function isUniqueCode() {
    const chemail = data.find(item => item.code.toLowerCase() === document.getElementById("dcode").value.toLowerCase());
    console.log(chemail);
    if (!chemail) {
      console.log("Check done");
      return true;
    } else {
      console.log("Try another Department Code");
      return false;
    }
  }
  function isUniqueName() {
    const chemail = data.find(item => item.name.toLowerCase() === document.getElementById("dname").value.toLowerCase());
    console.log(chemail);
    if (!chemail) {
      console.log("Check done");
      return true;
    } else {
      console.log("Try another Department Name");
      return false;
    }
  }
  function initialValidation() {
    if (!isUniqueCode()) {
      
      handleClick("Department Code already registered");
      return false;
    } else if (!isUniqueName()) {
      
      handleClick("Department Name already registered");
      return false;
    } else {
      return true;
    }
  }
  function addDepartment() {
    const dids = data.map((object) => object.id);
    //const maxid = Math.max(...dids);
    const maxid =dids.length > 0 ? Math.max(...dids) : 0;
    console.log(maxid);
    const newDepartment = {
      id: maxid + 1,
      code: document.getElementById("dcode").value,
      name: document.getElementById("dname").value,
    };
    data.push(newDepartment);
    console.log(data);
    localStorage.setItem("dataarr", JSON.stringify(data));
    document.getElementById("closebtn").click();
  }
  function saveInput() {
    if (validate()) {
      if (initialValidation()) {
        addDepartment();
      }
    }
  }

  function reval(){
    // eslint-disable-next-line react/prop-types
    let upid=data.findIndex(item => item.id==erow.id)
    let afe=data.find((item,index) => item.code.toLowerCase()==document.getElementById("dcode").value.toLowerCase() && index>upid);
    let bee=data.find((item,index) => item.code.toLowerCase()==document.getElementById("dcode").value.toLowerCase() && index<upid);
    let afr=data.find((item,index) => item.name.toLowerCase()==document.getElementById("dname").value.toLowerCase() && index>upid);
    let ber=data.find((item,index) => item.name.toLowerCase()==document.getElementById("dname").value.toLowerCase() && index<upid);
    if(afe || bee){  
      
      handleClick("Department Code already Registered");
      return false;
  }else if(afr || ber){
      
      handleClick("Department Name already Registered");
      return false; 
  } else{    
      console.log("ReCheck done");
      return true;           
  }
  }
  function updatedepartment(){
    // eslint-disable-next-line react/prop-types
    let upid=data.findIndex(item => item.id==erow.id)
    data[upid].code=document.getElementById("dcode").value
    data[upid].name=document.getElementById("dname").value
    console.log(data)
    localStorage.setItem("dataarr", JSON.stringify(data));
    document.getElementById("closebtn").click();
  }
  function updateinput(){
    if(validate()){
      if(reval()){
        updatedepartment()
      }
    }
  }
  return (
    <Card>
      <CardHeader title="DEPARTMENT ENTRY" sx={{backgroundColor:"#ece8d9"}} />
      <form id="myform">
        <CardContent>
          <div className='row gap-4 my-4'>
            {/*eslint-disable-next-line react/prop-types*/}
            <TextField className='px-2' size='small' required id="dcode" defaultValue={erow ? erow.code : ""} 
              InputProps={{
              startAdornment: <InputAdornment position="start">CODE</InputAdornment>,
              }}/>
            {/*eslint-disable-next-line react/prop-types*/}
            <TextField className='px-2' size='small' required id="dname" defaultValue={erow ? erow.name: ""}
            InputProps={{
              startAdornment: <InputAdornment position="start">NAME</InputAdornment>,
              }} />
          </div>
          <div className='text-center'>
            {erow ? (<Button variant="contained" color="info" className='m-3' onClick={updateinput}>Update</Button>):
            (<Button variant="contained" color="success" className='m-3' onClick={saveInput}>Save</Button>)}
            <Button variant="contained" color="error" className='m-3' id="closebtn" onClick={handleBack} >Cancel</Button>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {open ? error : ""}
            </Alert>
          </Snackbar>
        </CardContent>
      </form>
    </Card>
  );
}

export default Department;
