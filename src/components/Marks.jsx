/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Autocomplete, Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Fab, MenuItem, Snackbar, TextField, Tooltip, Typography } from "@mui/material"
//import { useFormik } from "formik";
import React,{ useEffect, useState,Fragment} from "react";
//import * as Yup from 'yup'
import MuiAlert from '@mui/material/Alert';
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
function Marks(){

  const [add, setAdd] = useState(true);
  const [erow,seterow]=useState();
  const [pse,setpse]=useState('');
  function handleAdd() {
    setAdd(false);
  }
  function handleBack() {
    setAdd(true);
    seterow();
  }
  function handleEdit(row,e){
    seterow(row)
    console.log(e.target.innerText)
    setpse(e.target.innerText)
    document.getElementById("addbtn").click();
  }
    return(
        <Container sx={{marginY:"3rem"}}>
            {add ? <StudentMarkList handleAdd={handleAdd} handleEdit={handleEdit}/>:<MarkEntry handleBack={handleBack} erow={erow} pse={pse}/>}
        </Container>
    )
}

// eslint-disable-next-line react/prop-types
function StudentMarkList({handleAdd , handleEdit}){
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[];
  const col1=[
    {field:'id', headerName:"STUDENT_ID",align:"center",headerAlign:"center",flex:1,headerClassName: 'headercol',
    // renderCell: (params) => (
    //   <Tooltip title="Show data" followCursor> 
    //     <Button
    //       fullWidth
    //       color='info'
    //       onClick={() => {openlist(params.row);setviid(params.row.id)}}
    //       sx={{ color:'black'}}
    //     > {params.row.id}
    //     </Button> 
    //   </Tooltip>) 
      },
    {field:'sname', headerName:"STUDENT_NAME",align:"center",headerAlign:"center",flex:1,headerClassName: 'headercol',
    // renderCell: (params) => (
    //   <Tooltip title="Show data" followCursor> 
    //     <Button
    //       fullWidth
    //       color='info'
    //       onClick={() => {openlist(params.row);}}
    //       sx={{ color:'black'}}
    //     > {params.row.sname}
    //     </Button> 
    //   </Tooltip>) 
    },{field:'sem', headerName:"CURRENT_SEMESTER",align:"center",headerAlign:"center",flex:1,headerClassName: 'headercol',},
    {field:'act', headerName:"EDIT_SEMESTER",align:"center",headerAlign:"center",flex:1,headerClassName: 'headercol',renderCell: (params) => (
      <ButtonGroup  variant="text" >
        {[1,2,3,4].filter(item=> item<=params.row.sem).map(itt=> (
          <Tooltip title={`Edit Semester${itt}`} key={itt} placement='top' arrow >
            <Button sx={{color:'black'}} onClick={(e)=> handleEdit(params.row,e)} >{itt}</Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    ) }
  ]

  
  return(
    <Card style={{width:"100%"}}>
      <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title="MARKLIST"
        action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn" onClick={handleAdd} sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}} > <AddIcon/></Fab></Tooltip>}
      ></CardHeader>
      { mararr.length >0 
          ? (<CardContent><Box width='auto' minWidth='70vw' sx={{ '& .headercol': {backgroundColor: 'gray',color:"white"}}} marginX='auto'><DataGrid rows={mararr} columns={col1} disableRowSelectionOnClick/></Box></CardContent>) 
          : (<CardContent><Typography align='center'>NO RECORD FOUND</Typography></CardContent>) 
       }
    </Card>
  )
}


// eslint-disable-next-line react/prop-types
function MarkEntry({handleBack,erow,pse}){

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const stuarr = JSON.parse(localStorage.getItem("stuarr")) || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const subarr =JSON.parse(localStorage.getItem("subarr")) ||[];
    const mararr=JSON.parse(localStorage.getItem("mararr")) ||[];

    const [selectedSname, setSelectedSname] = useState(null);
    // eslint-disable-next-line react/prop-types
    const [selectedId, setSelectedId] = useState(erow? erow.id: '');
    const [selectedsub ,setselectedsub]=useState('');
    const [sdep,setsdep]=useState('');
    const [ssem,setssem]=useState('');
    const [sco,setsco]=useState('');
    const [semv,setsemv]=useState(erow? pse: "");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const empdat={
      id:"",
      code:"",
      dep:"",
      sem:"",
      sname:"",
    }
    for(let j=1;j<=6;j++){
      empdat[`s1b${j}`]="";
      empdat[`s1m${j}`]="";
    }
    const [dismar,setdismar]=useState(empdat);
    useEffect(()=>{
      if(erow){
        const ma=mararr.find(item => item.id==erow.id)
        const sma=subarr.find(item=> item.dep==ma.dep)
        console.log(sma)
        setselectedsub(sma)
        setSelectedId(ma.id)
        setSelectedSname(ma.sname);
        setsdep(ma.dep)
        setssem(ma.sem)
        setsco(ma.code)
        setdismar(ma)
      }
    },[])
    
    useEffect(() => {
        const selectedStudent = stuarr.find(item => item.id === selectedId);
        if (selectedStudent) {
            setSelectedSname(selectedStudent.sname);
            setsdep(selectedStudent.department);
            setssem(selectedStudent.semester);
            setsco(selectedStudent.code);
        }
    }, [selectedId, stuarr]);
    useEffect(()=>{
        const ssub=subarr.find(item=> item.dep==sdep)
        setselectedsub(ssub)
    },[sdep, subarr])
    const Alert =React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const handleClick = () => {
        setOpen(true);
      };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    
    function changename(value){
        setSelectedSname(value)
        setSelectedId("")
        setsdep('')
        setssem('')
        setsemv('')
        setsco('')
        setselectedsub('')
    }
    
    function changeroll(e){
        setSelectedId(e.target.value)
        setsdep('')
        setssem("")
        setsemv('1')
          var up=mararr.find(item=> item.id==e.target.value)
          up?  setdismar(up) :setdismar(empdat)    
    }
    function handleErInputChange(e, i, j) {
        const inputValue = e.target.value;
        if (inputValue === '') {
          setError(`s${j}m${i}`);
        // } else if (!regex(inputValue)) {
        //   setError(`s${j}m${i}`);
        } else {
          setError(null);
        }
    } 
    var ma1={};
    if(erow){
      ma1=mararr.find(item => item.id==erow.id)
    }
    const semElements = [];
    let i=semv
    semElements.push(
    <div id={`sem${i}`} className="row" key={`sem${i}`}>
      <div className="col-sm-6 text-center h5">Semester {i}</div>
      <div className="col-sm-3 text-center">Marks</div>
      <div className="col-sm-3 text-center">Grade</div>
      {[1, 2, 3, 4, 5, 6].map(j => (selectedsub && selectedsub[`sem${i}`][`b${j}`] &&
        (<Fragment key={`s${i}b${j}`}>
          <div className={`col-sm-6 my-2 s${i}sub${j}`}>
            <TextField id={`s${i}b${j}`} name={`s${i}b${j}`} size="small"  fullWidth
            value={selectedsub ? selectedsub[`sem${i}`][`b${j}`] : ""} 
            InputProps={{readOnly: true}}/>
          </div>
          <div className={`col-sm-3 my-2 s${i}sub${j}`}>
            <TextField
              id={`s${i}m${j}`}
              name={`s${i}m${j}`}
              size="small"
              error={error === `s${j}m${i}`}
              value={dismar[`s${i}m${j}`]}
              onChange={(e) => {
                const updatedValue = e.target.value;
                setdismar((prevData) => ({...prevData,[`s${i}m${j}`]: updatedValue}))
                handleErInputChange(e, i, j);
                console.log(dismar)
                //reflemark(e.target.value,i,j);
              }}
              InputProps={{readOnly:erow && ma1[`s${i}m${j}`] > 35? true:false}}
              helperText={error === `s${j}m${i}` ? (  <span style={{ color: 'red' }}>Need Valid Mark</span>) : ('')}
            />
          </div>
          <div className={`col-sm-3 my-2 s${i}sub${j}`}>
            <TextField size="small"  id={`s${i}g${j}`} name={`s${i}g${j}`} value={dismar ? getmark(dismar[`s${i}m${j}`]) :""} 
              InputProps={{inputProps: { style: { textAlign: "center" ,color: dismar && getmark(dismar[`s${i}m${j}`]) === 'F' ? 'red' : 'inherit' } }}} 
            />
          </div>
        </Fragment>)
      ))}
    </div>
  );
  function getmark(m) {
      let mark=parseInt(m)
      if (mark >= 90) {
        return 'A';
      } else if (mark >= 75) {
        return 'B';
      } else if (mark >= 60) {
        return 'C';
      } else if (mark >= 45){
        return 'D';
      } else if (mark >= 35){
        return 'E';
      } else if (mark >= 0){
        return 'F';
      }else {
        return " ";
      }
  }
 
    function val() {
        // for (let i = 1; i <= ssem; i++) {
          let i=semv
          for (let j = 1; j <= 6; j++) {
            if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
              const inputValue = document.getElementById(`s${i}m${j}`).value;
              if (inputValue === '') {
                setError(`s${j}m${i}`);
                handleClick();
                return false;
              } else if (!regex(inputValue)) {
                setError(`s${j}m${i}`);
                handleClick();
                return false;
              }
            }
          }
        // }
      return true; // If all checks pass
    }
    function regex(mv) {
        let rege = /^(0{2}|100|[0-9][0-9])$/gm;
        return rege.test(mv);
    }
    const saveon = (e) => {
      e.preventDefault();
      if(val()){
        if(mararr.some(item=> item.id==selectedId)){
          updateon(semv);
        }else{
          var newdataa=newinn()
          mararr.push(newdataa)
          console.log(mararr)
          localStorage.setItem("mararr",JSON.stringify(mararr));
        }
        if(semv<ssem){
          let c=(parseInt(semv)+1).toString()
          setsemv(c)
        }else{
          document.getElementById('closebtn').click()
        }
      }
    };

    function updateon(ss){
      let upid=mararr.findIndex(item=> item.id==selectedId)
      console.log(upid)
      mararr[upid][`sem`]=ssem
      console.log(ss)
        if(ss){
          for(let j=1;j<=6;j++){
            if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
              mararr[upid][`s${ss}b${j}`]=document.getElementById(`s${ss}b${j}`).value
              mararr[upid][`s${ss}m${j}`]=document.getElementById(`s${ss}m${j}`).value
            }
            
          }
        }
        localStorage.setItem("mararr", JSON.stringify(mararr));
        console.log(mararr)
    }

    function newinn(){
      const newmark1={
        id:selectedId,
        sname:selectedSname,
        dep:sdep,
        sem:ssem,
        code:sco,
      }
      const newmars={}
      let i=1;
      for(let j=1;j<=6;j++){
        if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
          newmars[`s${i}b${j}`] = document.getElementById(`s${i}b${j}`).value;
        }
      }
      for(let i=2;i<=ssem;i++){
        for(let j=1;j<=6;j++){
          if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
            newmars[`s${i}b${j}`] = "";
          }
        }
      }

      const newmark2={}
      i=1;
      for(let j=1;j<=6;j++){
        if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
          newmark2[`s${i}m${j}`] = document.getElementById(`s${i}m${j}`).value;
        }
      }
      for(let i=2;i<=ssem;i++){
        for(let j=1;j<=6;j++){
          if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
            newmark2[`s${i}m${j}`] ="";
          }
        }
      }
      const newmark={ ...newmark1,...newmars, ...newmark2 }
      return newmark
    }

    return (
        <Card>
            <CardHeader title={'STUDENT ENTRY'} sx={{backgroundColor:"#ece8d9"}}/> 
            <CardContent>
                <form id="myform" onSubmit={saveon}>
                <div className="row">
                    <div className="col-sm-3 py-3">
                        {/* <TextField
                            select
                            fullWidth
                            id="sname"
                            name='sname'
                            label="Select Student"
                            value={selectedSname}
                            onChange={changename}
                        >
                            {stuarr.map(item => (
                                <MenuItem value={item.sname} key={item.sname}>{item.sname}</MenuItem>
                            ))}
                        </TextField> */}
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={stuarr.map(item => item.sname)}
                          onChange={(e, value) => {
                            console.log(value);
                            changename(value)
                          }}
                          value={selectedSname}
                          renderInput={(params) => (
                            <TextField
                              label="SELECT STUDENT"
                              {...params}
                            />
                          )}
                        />
                    </div>
                    <div className="col-sm-3 py-3">
                        <TextField
                            select
                            fullWidth
                            id="sroll"
                            name='sroll'
                            label="Select Student_ID"
                            value={selectedId}
                            onChange={changeroll}
                        >
                            {selectedSname
                                ? (stuarr.filter(item => item.sname === selectedSname).map(item => (mararr.some((itemm)=> itemm.id==item.id))
                                  ?(<MenuItem value={item.id} key={item.id} disabled>{item.id}</MenuItem>)
                                  :(<MenuItem value={item.id} key={item.id}>{item.id}</MenuItem>)))
                                : stuarr.map(item=> ((mararr.some((itemm)=> itemm.id==item.id))
                                  ?(<MenuItem value={item.id} key={item.id} disabled>{item.id}</MenuItem>)
                                  :(<MenuItem value={item.id} key={item.id}>{item.id}</MenuItem>)) )
                            }
                            {/* {stuarr.map(item => (<MenuItem value={item.id} key={item.id} >{item.id}</MenuItem>))} */}
                        </TextField>
                    </div>
                    <div className="col-sm-3 py-3">
                        <TextField
                            select
                            fullWidth
                            id="sco"
                            name='sco'
                            label="DEPARTMENT"
                            value={sco}
                            sx={{pointerEvents:"none"}}
                            InputProps={{readOnly:selectedId?false:true}}
                        >
                            {stuarr.map(item => (
                                <MenuItem value={item.code} key={item.code}>{item.code}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-sm-3 py-3">
                        <TextField
                            select
                            fullWidth
                            id="ssem"
                            name='ssem'
                            label="SEMESTER"
                            value={semv}
                            InputProps={{readOnly:selectedId?false:true}}
                            sx={!selectedId ? { pointerEvents: "none" } : {}}
                            onChange={(e)=>setsemv(e.target.value)}
                        >
                            {/* {stuarr.map(item => (
                                <MenuItem value={item.semester } key={item.semester}>{item.semester}</MenuItem>
                            ))} */}
                            {ssem? [1,2,3,4].filter(item=> item<=ssem).map(itemm=>(<MenuItem value={itemm} key={itemm}>{itemm}</MenuItem>) )
                                :[1,2,3,4].map(item=> (<MenuItem value={item} key={item}>{item}</MenuItem>))}
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    {semv!=0 && semElements}
                </div>
                <div className="text-end my-2">
                    <Button  variant="contained"  color="success"  sx={{ margin: "1rem" }} type="submit" > Save </Button>
                    <Button  variant="contained"  color="error"  sx={{ margin: "1rem" }}  id="closebtn" onClick={handleBack}> Cancel</Button>
                </div>
                </form>
                { <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {open && "Please Fill Correctly"}
                    </Alert>
                </Snackbar> }
            </CardContent>
        </Card>
    )
}

export default Marks

// for (let i = 1; i <= ssem; i++) {
//   semElements.push(
//   <div id={`sem${i}`} className="row" key={`sem${i}`}>
//     <div className="col-sm-9 text-center h5">Semester {i}</div>
//     <div className="col-sm-3 text-center">Marks</div>
//     {[1, 2, 3, 4, 5, 6].map(j => (selectedsub && selectedsub[`sem${i}`][`b${j}`] &&
//       (<Fragment key={`s${i}b${j}`}>
//         <div className={`col-sm-9 my-2 s${i}sub${j}`}>
//           <TextField id={`s${i}b${j}`} name={`s${i}b${j}`} size="small"  fullWidth
//           value={selectedsub ? selectedsub[`sem${i}`][`b${j}`] : ""} 
//           InputProps={{readOnly: true}}/>
//         </div>
//         <div className={`col-sm-3 my-2 s${i}sub${j}`}>
//           <TextField
//             id={`s${i}m${j}`}
//             name={`s${i}m${j}`}
//             size="small"
//             error={error === `s${j}m${i}`}
//             onChange={(e) => {
//               handleErInputChange(e, i, j);
//             }}
            
//             helperText={error === `s${j}m${i}` ? (  <span style={{ color: 'red' }}>Need Valid Mark</span>) : (  '')}
//           />
//         </div>
//       </Fragment>)
//     ))}
//   </div>
// );
// }