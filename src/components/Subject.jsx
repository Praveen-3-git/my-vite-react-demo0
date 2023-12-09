/* eslint-disable react/prop-types */
import { Card, CardHeader, CardContent, Button, Container, TextField, Box, Typography, MenuItem, Fab, Tab, IconButton, Tooltip} from '@mui/material';
//import {Snackbar, Alert,} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function Subject(){
  const [add, setAdd] = useState(true);
  const [erow, seterow] = useState();
  function handleAdd() {
    setAdd(false);
  }
  function handleBack() {
    setAdd(true);
    seterow();
  }
  function handleEdit(row){
    seterow(row)
    document.getElementById("addbtn").click();
  }
//lifting list
  const [depn,setdepn]=useState("");
  
  const [tableon,settableon]=useState(true);

  const handlerEdit=(row)=>{
    console.log(row.name)
    setdepn(row.name)
    //settcon(load(row.name));
    settableon(false)
  }
  
  const tableonback=()=>{
    settableon(true)
    setdepn('')
  }
//
    return (
    <Container className='my-5' >
      {add ? 
      <SubjectList handleAdd={handleAdd} handleEdit={handleEdit} depn={depn} tableon={tableon} handlerEdit={handlerEdit} tableonback={tableonback}/> :
      <SubjectEntry handleBack={handleBack} erow={erow} depn={depn}/>}
    </Container>
    )
}

// eslint-disable-next-line react/prop-types
function SubjectList({handleAdd , handleEdit ,depn ,tableon,handlerEdit,tableonback}){
  const data= JSON.parse(localStorage.getItem("dataarr"))||[]
  const [tcon,settcon]=useState(depn && load(depn));
  
  const subarr = JSON.parse(localStorage.getItem("subarr"))||[]
  const column1=[
    {field :'id', headerName:'S.NO',flex:0.2 ,headerClassName: 'headercol',minWidth:100},
    {field :'name', headerName:'DEPARTMENT', flex:1, headerAlign: 'center',headerClassName: 'headercol',minWidth:300,renderCell: (params) => (
            <Tooltip title="Show data" placement="left" arrow> 
              <Button
                fullWidth
                color='info'
                onClick={() => {handlerEdit(params.row);settcon(load(params.row.name));}}
                sx={{ color:'black'}}
              > {params.row.name}
              </Button> 
            </Tooltip>
        ),},
    // {field: 'act',
    //   headerName: 'Action',
    //   flex: 0.5,
    //   align: 'center',
    //   headerAlign: 'center',
    //   sortable: false ,
    //   renderCell: (params) => (
    //       <Tooltip title="Show data" placement="left" arrow> 
    //         <Button
    //           color='info'
    //           onClick={() => {handlerEdit(params.row);settcon(load(params.row.name));}}
    //           //disabled={ch.some((itemm) => itemm === params.row.name)}
    //           sx={{ paddingY: '0.5rem' }}
    //         >  <FormatListBulletedIcon /> 
    //         </Button> 
    //       </Tooltip>
  
    //   ),
    // },
  ]

  var row1=data.filter((item) => subarr.some((itemm) => itemm.dep === item.name))

  const column = [
    { field: 'sem', headerName: 'Semester',align:'center',headerAlign:'center' , headerClassName: 'headercol',flex:1,minWidth:80},
    { 
      field: 'subject',  
      headerName: 'Subject', 
      headerClassName: 'headercol', 
      headerAlign:'center' ,
      flex:2,
      sortable: false ,
      minWidth:250,
      renderCell: (params) => (
        <div>
          {params.value.map((subject, index) => (
            <div className="my-1" key={index} style={{ color: subject === 'Pending' ? 'red' : 'inherit' }}>
              {subject}
            </div>
          ))}
        </div>
      )
    },
    {field: 'act',
      headerName: 'Action',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'headercol', 
      sortable: false ,
      minWidth:100,
      renderCell: (params) => (
          <Tooltip title="Show data" placement="left" arrow> 
            <Button
              color='info'
              onClick={() => handleEdit(params.row)}
              //disabled={ch.some((itemm) => itemm === params.row.name)}
              sx={{ paddingY: '0.5rem' }}
            >  <EditIcon /> 
            </Button> 
          </Tooltip>
      ),
    },
    
  ];
  function load(de){
    const subarr = JSON.parse(localStorage.getItem("subarr"));
    const item= subarr.find(item => item.dep == de);
   
    const rf = [];
    for (let i = 1; i <= 4; i++) {
      rf.push({
        dep: item.dep,
        sem: item[`sem${i}`].sem,
        id: item[`sem${i}`].sem,
        subject: Array.from({ length: 6 }, (_, j) => {
          if ((i < 3 && j+1 < 7) || (i > 2 && j+1 < 5)) {
              return item[`sem${i}`][`b${j + 1}`] !== "" ? item[`sem${i}`][`b${j + 1}`] : "Pending";
          } else {
              return item[`sem${i}`][`b${j + 1}`];
          }
      })
      });
    }
      return rf;
  }
  // [
  //     { id:1, dep: 'Computer Science Engineering',sem : '1', subject: ''},
  //     { id:2, dep: 'Computer Science Engineering',sem : '2', subject: ''},
  //     { id:3, dep: 'Computer Science Engineering',sem : '3', subject: ''},
  //     { id:4, dep: 'Computer Science Engineering',sem : '4', subject: ''},
  // ];
  // function changefun(e){
  //   console.log(e.target.value)
  //   setdepn(e.target.value)
  //   settcon(load(e.target.value));
  // }

  return(
        <Card sx={{width:"100%"}}>
        <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title={'SUBJECT LIST'}
        action={<><Fab color='primary' size='small'  id="addbtn" onClick={handleAdd} sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}}  > <AddIcon/></Fab>
          {(depn) &&(<IconButton id='closeBtn' onClick={tableonback}><CloseIcon/></IconButton>)} </>}
        />
        {subarr.length>0
          ?(<CardContent>
            { tableon?
              ( <Box sx={{'& .headercol': {backgroundColor: 'gray',color:"white"}}}>
                <DataGrid rows={row1} columns={column1} disableRowSelectionOnClick pageSizeOptions={[5, 10, 25]}
                 initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }} />
              </Box>):
              (<Box  sx={{ '& .headercol': {backgroundColor: 'gray',color:"white"}}}>
                <div className='row'>
                  <Typography fontWeight='bold' className='px-3 my-3'> DEPARTMENT : {depn} </Typography>
                </div>
                
                <DataGrid rows={tcon || []} columns={column} getRowHeight={() => 'auto'} disableRowSelectionOnClick hideFooter />
              </Box>)  
            }
          </CardContent>)
          :(<CardContent>
            <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src='src/assets/empty-folder.png' alt='emptyfolder'  style={{opacity:'0.5',pointerEvents:'none',width:'9rem',height:'9rem'}}></img>
              <Typography align='center'>NO RECORD FOUND</Typography>
            </div>
            </CardContent>)}
      </Card>
  )
}

// eslint-disable-next-line react/prop-types
function SubjectEntry( {handleBack ,erow ,depn}){
  const data= JSON.parse(localStorage.getItem("dataarr"))||[]
  const mararr=JSON.parse(localStorage.getItem('mararr')) || [];
  const subarr= JSON.parse(localStorage.getItem("subarr")) || [];
  //const [error, setError] = useState("");
  //const [open, setOpen] = useState(false);
  const [sdep,setsdep]=useState(erow? depn:"")
  const [rdo,setrdo] =useState('')
  const [err,seterr]=useState('')
  const empdata = {
    id: "",
    dep: "",
    code:"",
  };
  for (let i = 1; i <= 4; i++) {
    const semester = `sem${i}`;
    empdata[semester] = {
      sem: `${i}`,
    };
    for (let j = 1; j <= 6; j++) {
      const subject = `b${j}`;
      empdata[semester][subject] ="";
    }
  }
  //console.log(empdata)
  const [tvalue, settValue] =useState('1');
  const handletChange = (event, newValue) => {
    settValue(newValue);
  };
  
  const [subdata,setsubdata]=useState(empdata);

  // const handleClick = (e) => {
  //   setOpen(true);
  //   setError(e)
  // };
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  useEffect(() => {
    if(erow){
      settValue(erow.sem)
      setsdep(depn)
      if(subarr.some(item => item.dep == depn)){
        let upid=subarr.find(item => item.dep==depn)
        setsubdata(upid)
      }
      var fildep=mararr.filter(item=> item.dep==depn)
      console.log(fildep)
      if(fildep.some(item=> item.s4m1)){
        console.log("found 4")
        setrdo('4')
      }  
      else if(fildep.some(item=> item.s3m1)){
        console.log("found 3")
        setrdo('3')
      }
      else if(fildep.some(item=> item.s2m1)){
        console.log("found 2")
        setrdo('2')
      }
      else if(fildep.some(item=> item.s1m1)){
        console.log("found 1")
        setrdo('1')
      }
    }
  }, [])
  
  function semren(i){
    var semele=[];
    semele.push([1, 2, 3, 4, 5, 6].map(j => (
      <Fragment key={`s${i}b${j}`}>
        <div className={`my-2 col-sm-6 s${i}sub${j}`}>
          <TextField id={`s${i}b${j}`} name={`s${i}b${j}`} size="small" label={`Subject${j}`} fullWidth required={(i < 3 && j < 7) || (i > 2 && j < 5)}
            value={subdata[`sem${i}`][`b${j}`]}
            InputProps={{readOnly: (rdo>=i?true:false)}}
            error={err===`s${i}b${j}`}
            helperText={err === `s${i}b${j}` ? (  <span style={{ color: 'red' }}>No Duplicate Subjects</span>) : (  '')}
            onChange={(e) => {
              const updatedValue = e.target.value;
              setsubdata((prevSelectedDep) => ({
                ...prevSelectedDep,
                [`sem${i}`]: {
                  ...prevSelectedDep[`sem${i}`],
                  [`b${j}`]: updatedValue,
                },
              })); //dup(e ,i,j)
              //(subarr.some(item => item.dep === sdep) ? updatesub(updatedValue) : addSubject(updatedValue))
            }}
          />
        </div>
      </Fragment>
    )))
    return semele
  }
  
  function dup( i) {
    //let kk = e.target.value;
    for(let j=1;j<=6;j++){
      let kk= document.getElementById(`s${i}b${j}`).value.toLowerCase()
      if (kk !== "") {
        for (let j1 = 1; j1 <= j; j1++) {
          if (j1 !== j) {
            // Check for duplicate in other text fields
            let otherValue = document.getElementById(`s${i}b${j1}`).value.toLowerCase();
            if (kk === otherValue) {
              seterr(`s${i}b${j}`)
              //alert(`Duplicate value found in s${i}b${j}`);
              return false;
            }
          }
        }
      }
    }
    seterr(null)
    return true
  }
  function dup2(ss){
    let up=subarr.find(item => item.dep==sdep)
    var c1=0;
    for(let w=1;w<=6;w++){
      let kk= document.getElementById(`s${ss}b${w}`).value
      if (kk !== "") {
        for(let i=1;i<ss;i++){
          for (let j1 = 1; j1 <= w; j1++) {
            if (j1 !== w) {
              // Check for duplicate in other text fields
              //let otherValue = document.getElementById(`s${i}b${j1}`).value;
              let otherValue=up[`sem${i}`][`b${j1}`]
              if (kk === otherValue) {
                seterr(`s${ss}b${w}`)
                //alert(`Duplicate value found in s${i}b${j}`);
                c1++;
                //return false;
              }
            }
          }
        }
      }
    }
    if(c1!=0){
      return false;
    }
    else{
      seterr(null)
      return true
    }
  }
  
  function addSubject() {
    const ids = subarr.map((object) => object.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    console.log(maxId)
    const newSubject = inpu(maxId);
    subarr.push(newSubject);
    console.log(subarr);
    localStorage.setItem("subarr", JSON.stringify(subarr));
    //handleClick('New Department Added')
  }
  
  function inpu(maxId) {
    if(sdep){
      var co=data.find(it=> it.name==sdep)
    }
    const newInputData = {
      id: maxId + 1,
      dep: sdep,
      code:co.code,
    };
    //create for sem 1 value must
    const semester = 'sem1';
      newInputData[semester] = {
        sem: '1',
      };
    const i=1;
    for (let j = 1; j <= 6; j++) {
          const subject = `b${j}`;
          newInputData[semester][subject] = document.getElementById(`s${i}b${j}`).value      
    }
    //create for remaining sem empty value
    for (let i = 2; i <= 4; i++) {
      const semester = `sem${i}`;
      newInputData[semester] = {
        sem: `${i}`,
      };
      for (let j = 1; j <= 6; j++) {
        const subject = `b${j}`;
        newInputData[semester][subject] = "";
      }
    }
    return newInputData;
  }
  
  function savework(e){
    e.preventDefault();
    if(dup(tvalue)){
      if(dup2(tvalue)){
        if(subarr.some(item => item.dep == sdep)){        
          updatesub(tvalue)        
        }else{
          addSubject()
        }
        if(tvalue=="4"){
          settValue('1')
          document.getElementById("closeBtn").click();
        }
        else{settValue( (parseInt(tvalue)+1).toString() )}
        console.log("adddd")
      }
      }
  }

  function updatesub(ss){
    let upid=subarr.findIndex(item => item.dep==sdep)
      console.log(dup2(ss))
      if(ss){
        for(let i=1;i<=6;i++){
          if((ss < 3 && i < 7) || (ss > 2 && i < 5)){
            subarr[upid][`sem${ss}`][`b${i}`]=(document.getElementById(`s${ss}b${i}`).value !=( "" || "Pending"))? (document.getElementById(`s${ss}b${i}`).value) :"Pending"
          }else{
            subarr[upid][`sem${ss}`][`b${i}`]=document.getElementById(`s${ss}b${i}`).value 
          }
        }
      }else{
        for(let j=1;j<=4;j++){
          for(let i=1;i<=6;i++){
            if((j < 3 && i < 7) || (j > 2 && i < 5)){
              subarr[upid][`sem${j}`][`b${i}`]=(document.getElementById(`s${j}b${i}`).value !=( "" || "Pending"))? (document.getElementById(`s${j}b${i}`).value) :"Pending"
            }else{
              subarr[upid][`sem${j}`][`b${i}`]=document.getElementById(`s${j}b${i}`).value 
            }
          }
        }
      }
      localStorage.setItem("subarr", JSON.stringify(subarr));
      console.log(subarr)
  }

  function depchange(e){
    e.preventDefault()
    setsdep(e.target.value)
    settValue('1')
    if(subarr.some(item => item.dep == e.target.value)){
      let upid=subarr.find(item => item.dep==e.target.value)
      setsubdata(upid)
    }else{
      setsubdata(empdata)
    }
  }
 
  return (
    <Container>
      <Card>
        <form id='myform' onSubmit={savework}>
        <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title={"SUBJECT ENTRY"}
        action={<IconButton sx={{marginX:"1rem"}} id='closeBtn' onClick={handleBack}>
        <CloseIcon/>
      </IconButton>}
        />
        <CardContent sx={{width:'80vw'}}>
          <div className='my-2'>
            <TextField fullWidth select id="seldep" name="seldep" value={sdep} sx={{ backgroundColor: "white" }} size='small' label="SELECT DEPARTMENT"
              InputProps={{readOnly: erow?true:false}} required
              onChange={(e) => { depchange(e); }}  //onChange={(e)=>setsdep(e.target.value)}
            >
              <MenuItem value="" disabled> Select Department </MenuItem>
                {/* {erow 
                  ?(data.map((item) => (
                    <MenuItem value={item.name} key={item.name}> {item.name} </MenuItem>
                  )))
                  :(data.filter((item) => !subarr.some((itemm) => itemm.dep === item.name)).map((item) => (
                    <MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>
                  )))} */}
                {erow 
                  ? (data.map((item) => (
                    <MenuItem value={item.name} key={item.name}> {item.name} </MenuItem>
                  )))
                  : (data.map(item=> ((subarr.some((itemm)=> itemm.dep==item.name))
                      ?(<MenuItem value={item.name} key={item.name} disabled>{item.name}</MenuItem>)
                      :(<MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>)) ))
                }
            </TextField>
          </div>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tvalue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' ,borderRadius:"0.5rem"}}>
                <TabList onChange={handletChange} aria-label="lab API tabs example" >
                  <Tab label="SEMESTER One" value="1" sx={{pointerEvents: 'none'}} />
                  <Tab label="SEMESTER Two" value="2" sx={{pointerEvents: 'none'}}/>
                  <Tab label="SEMESTER Three" value="3" sx={{pointerEvents: 'none'}}/>
                  <Tab label="SEMESTER Four" value="4" sx={{pointerEvents: 'none'}}/>
                </TabList>
              </Box>
              <TabPanel value="1">
                SEMESTER 1 
                <div className='row'>
                  {semren(1)}
                </div>
                <div className='text-end'>
                  <Button variant='contained' type='submit' /*onClick={()=>settValue('2')}*/ sx={{margin:'1rem'}}>Next</Button>
                </div>
                </TabPanel>
              <TabPanel value="2">
                SEMESTER 2
                <div className='row'>
                {semren(2)}
                </div>
                <div className='text-end'>
                  <Button variant='contained' onClick={()=>settValue('1')} sx={{margin:'1rem'}}>Previous</Button><Button variant='contained' type='submit'  sx={{margin:'1rem'}}>Next</Button>
                </div>
              </TabPanel>
              <TabPanel value="3">
                SEMESTER 3
                <div className='row'>
                  {semren(3)}
                </div>
                <div className='text-end'>
                  <Button variant='contained' onClick={()=>settValue('2')} sx={{margin:'1rem'}}>Previous</Button><Button variant='contained' type='submit' sx={{margin:'1rem'}}>Next</Button>
                </div>
              </TabPanel>
              <TabPanel value="4">  
                SEMESTER 4
                <div className='row'>
                  {semren(4)}
                </div>
                <div className='text-end'>
                  <Button variant='contained' onClick={()=>settValue('3')} sx={{margin:'1rem'}}>Previous</Button>
                  <Button variant='contained' color='success' type='submit' sx={{margin:'1rem'}}>Save</Button>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
          {/* <div className='text-center'> */}
            {/* <Button variant="contained" color="primary" className='m-3' >Update</Button> */}
            {/* <Button variant="contained" color="success" className='m-3' type='submit'>Save</Button>
            <Button variant="contained" color="error" className='m-3' id="closebtn" onClick={handleBack}>Cancel</Button>
          </div> */}
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {open && error}
            </Alert>
          </Snackbar> */}
        </CardContent>
        </form>
      </Card>
    </Container>
  );
}

export default Subject

// const subarr=[
//       {
//           "id": 1,
//           "dep": "Information Technology",
//           "sem1": {
//               "sem": "1",
//               "b1": "English",
//               "b2": "Mathematics I",
//               "b3": "Applied Physics",
//               "b4": "Applied Chemistry",
//               "b5": "Basic Civil & Mechanical Engg",
//               "b6": "Basic Computer Science and Engg"
//           },
//           "sem2": {
//               "sem": "2",
//               "b1": "Mathematics II",
//               "b2": "Signals & Systems",
//               "b3": "Digital Principles & system Design",
//               "b4": "Principles of Communication",
//               "b5": "Computer System architecture",
//               "b6": "Object Oriented Programming"
//           },
//           "sem3": {
//               "sem": "3",
//               "b1": "Numerical Methods and Statistics",
//               "b2": "Information Coding Technique",
//               "b3": "Computer Networks",
//               "b4": "Relational Database Management System",
//               "b5": "Java Programming",
//               "b6": ""
//           },
//           "sem4": {
//               "sem": "4",
//               "b1": "Computer Graphicss",
//               "b2": "Operating Systems",
//               "b3": "Network Operating Systems",
//               "b4": "Advanced Networking",
//               "b5": "",
//               "b6": ""
//           }
//       },
//       {
//           "id": 2,
//           "dep": "Computer Science Engineering",
//           "sem1": {
//               "sem": "1",
//               "b1": "English",
//               "b2": "Mathematics I",
//               "b3": "Applied Physics",
//               "b4": "Applied Chemistry",
//               "b5": "Basic Computer Science and Engg",
//               "b6": "Basic Civil & Mechanical Engg"
//           },
//           "sem2": {
//               "sem": "2",
//               "b1": "Data Structures",
//               "b2": "Analog Electronics",
//               "b3": "Object Oriented Programming",
//               "b4": "Discrete Structures",
//               "b5": "Engineering Economics",
//               "b6": "Digital Electronics"
//           },
//           "sem3": {
//               "sem": "3",
//               "b1": "Software Engineering",
//               "b2": "Theory of Computation",
//               "b3": "Fundamentals of Management",
//               "b4": "Computer Organization and Architecture",
//               "b5": "Database Management Systems",
//               "b6": ""
//           },
//           "sem4": {
//               "sem": "4",
//               "b1": "Computer Architecture ",
//               "b2": "Computer Networks\t",
//               "b3": "Software Engineering\t",
//               "b4": "Mobile Computing ",
//               "b5": "",
//               "b6": ""
//           }
//       }
//   ]
//localStorage.setItem("subarr", JSON.stringify(subarr));