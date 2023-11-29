import { Box, Button, Card, CardContent, CardHeader, Container, MenuItem, Snackbar, TextField, Typography } from "@mui/material"
//import { useFormik } from "formik";
import React,{ useEffect, useState,Fragment} from "react";
//import * as Yup from 'yup'
import MuiAlert from '@mui/material/Alert';
import { DataGrid } from "@mui/x-data-grid";
function Marks(){

  const [add, setAdd] = useState(false);
  function handleAdd() {
    setAdd(false);
  }
  function handleBack() {
    setAdd(true);
    //seterow();
  }
    return(
        <Container sx={{marginY:"3rem"}}>
            {add ? <MarkList handleAdd={handleAdd}/>:<MarkEntry handleBack={handleBack}/>}
        </Container>
    )
}

// eslint-disable-next-line react/prop-types
function MarkList({handleAdd}){
  const viewid='COM01R001'
  const mararr = JSON.parse(localStorage.getItem("mararr"));
  

  const [tcon,settcon]=useState()
  const [selectedStudent,setselectedStudent]=useState(mararr.find(item => item.id==viewid));
  const [to,setto]=useState('')
  const [ocg,setocg]=useState('')
  useEffect(()=>{
    const ss=mararr.find(item => item.id==viewid)
    setselectedStudent(ss)
    settcon(load(ss))
  },[])
  
  
  const column = [
    { field: 'sem', headerName: 'Semester',align:'center',headerAlign:'center' },
    { 
      field: 'subject',  
      headerName: 'Subject',
      headerAlign:'center' ,
      width:300,
      renderCell: (params) => (
        <>
          {params.value.map((subject, index) => (
            <Fragment key={index}>    
              {subject}
              {index < params.value.length - 1 && <br />}
            </Fragment>
          ))}
        </> 
      )
    },
    { 
      field: 'mark',  
      headerName: 'Marks',
      headerAlign:'center' ,
      align:'center',
      renderCell: (params) => (
        <>
          {params.value.map((subject, index) => (
            <Fragment key={index}>    
              {subject}
              {index < params.value.length - 1 && <br />}
            </Fragment>
          ))}
        </> 
      )
    },
    { field: 'tm', headerName: 'Total Marks',align:'center',headerAlign:'center' },
    { field: 'cgpa', headerName: 'CGPA',align:'center',headerAlign:'center' },
    // { 
    //   field: 'action', 
    //   headerName: 'Action', 
    //   headerClassName: 'super-app-theme--header', 
    //   headerAlign:'center' ,
    //   align:'center',
    //   sortable: false ,
    //   renderCell: (params) => (
    //     <Button variant='contained' color='info' size='small' onClick={() => handleEdit(params.row)}>Edit</Button>  
    //   )
    // }
  ];
  
  
  function load(item){
    console.log(item)
    // const mararr = JSON.parse(localStorage.getItem("mararr"));
    // const item= mararr.find(item => item.id == de);
    var rf=[
        {
          sem: 1,
          id:1,
          subject: [item.s1b1, item.s1b2, item.s1b3, item.s1b4, item.s1b5, item.s1b6],
          mark: [item.s1m1, item.s1m2, item.s1m3, item.s1m4, item.s1m5, item.s1m6],
          tm:sum(item.s1m1, item.s1m2, item.s1m3, item.s1m4, item.s1m5, item.s1m6),
          cgpa:cgp(item.s1m1, item.s1m2, item.s1m3, item.s1m4, item.s1m5, item.s1m6)
        },
        {
          sem: 2,
          id: 2,
          subject: [item.s2b1, item.s2b2, item.s2b3, item.s2b4, item.s2b5, item.s2b6],
          mark: [item.s2m1, item.s2m2, item.s2m3, item.s2m4, item.s2m5, item.s2m6],
          tm:sum(item.s2m1, item.s2m2, item.s2m3, item.s2m4, item.s2m5, item.s2m6),
          cgpa:cgp(item.s2m1, item.s2m2, item.s2m3, item.s2m4, item.s2m5, item.s2m6)
        },
        {
          sem: 3,
          id: 3,
          subject: [item.s3b1, item.s3b2, item.s3b3, item.s3b4, item.s3b5 ,item.s3b6],
          mark: [item.s3m1, item.s3m2, item.s3m3, item.s3m4,item.s3m5 ,item.s3m6],
          tm:sum(item.s3m1, item.s3m2, item.s3m3, item.s3m4,item.s3m5,item.s3m6),
          cgpa:cgp(item.s3m1, item.s3m2, item.s3m3, item.s3m4,item.s3m5,item.s3m6)
        },
        {
          sem: 4,
          id: 4,
          subject: [item.s4b1, item.s4b2, item.s4b3, item.s4b4, item.s4b5, item.s4b6 ],
          mark: [item.s4m1, item.s4m2, item.s4m3, item.s4m4, item.s4m5, item.s4m6 ],
          tm:sum(item.s4m1, item.s4m2, item.s4m3, item.s4m4, item.s4m5, item.s4m6 ),
          cgpa:cgp(item.s4m1, item.s4m2, item.s4m3, item.s4m4, item.s4m5, item.s4m6 ),
        }
      ];
      var nrf=rf.filter(x=> x.sem<=item.sem)

      var a=0;
      var aa=[];
      var bb=[];
      for (let j = 1; j <= 4; j++) {
        var oc1 = [];
        for (let i = 1; i <= 6; i++) {
          if (item[`s${j}m${i}`]) {
          a = a + parseInt(item[`s${j}m${i}`]);
          oc1.push(parseInt(item[`s${j}m${i}`]));
          }
        }
        aa.push(a);
        a=0;
        let inn = 0;
        let oc1v = oc1.reduce((acc, cur) => acc + cur, inn);
        bb.push((oc1v / (oc1.length * 10)).toFixed(2));
      }
      var to = 0;
      aa.forEach((x) => {
        if (x) to += x;
      });
      setto(to)
      var ocga = [];
      bb.forEach((x) => {
        if (parseInt(x)) ocga.push(parseFloat(x));
      });
      let inn = 0;
      let cgv = ocga.reduce((acc, cur) => acc + cur, inn);
      console.log((cgv / ocga.length).toFixed(2));
      setocg((cgv / ocga.length).toFixed(2))
  
      return nrf;
  }
  
  function sum(...arg){
    let to=0;
    for (const x of arg) {
      if(x){
          to += parseInt(x);
      }
    }
    return to; 
  }
  function cgp(...arg){
    var cpgarr=[];
    for(const x of arg){
        if(x != "" && x!=null){
           cpgarr.push(parseInt(x));  
        }
    }
    let inn=0;
    let cgpa=cpgarr.reduce((acc,cur)=>acc+cur,inn);
    return (cgpa/(cpgarr.length*10)).toFixed(2);
}



  return(
    <Card style={{width:"100%"}}>
      <CardHeader
        title="MARKLIST"
        action={<Button variant="contained" color="primary" id="addbtn" onClick={handleAdd}> ADD </Button>}
      ></CardHeader>
      <CardContent>
        <div className="row gap-2">
          <div className="row">
            <Typography fontWeight='bold' className="col-sm-2" >NAME:  </Typography>
            <Typography fontWeight='bold' className="col-sm-4" fontFamily='Verdana'>{selectedStudent.sname}</Typography>
          </div>
          <div className="row">
            <Typography fontWeight='bold' className="col-sm-2">ROLL:  </Typography>
            <Typography fontWeight='bold' className="col-sm-4" fontFamily='Verdana'>{selectedStudent.id}</Typography>
          </div>
          <div className="row">
            <Typography fontWeight='bold' className="col-sm-2">DEPARTMENT: </Typography>
            <Typography fontWeight='bold' className="col-sm-4" fontFamily='Verdana'> {selectedStudent.dep} </Typography>
          </div> 
        <Box width='auto' minWidth='70vw' marginX='auto'><DataGrid rows={tcon || []} columns={column} getRowHeight={() => 'auto'} hideFooter /></Box>
        
        <div className="row">
          <span className="col-sm-9"></span>
          <Typography fontWeight='bold' className="col-sm-2 my-2">Total Marks</Typography><Typography  fontWeight='bold' className="col-sm-1 my-2">{to}</Typography>
          <span className="col-sm-9"></span>
          <Typography fontWeight='bold' className="col-sm-2 ">Overall CGPA</Typography><Typography  fontWeight='bold' className="col-sm-1 ">{ocg}</Typography>
        </div>
        </div>
      </CardContent>
    </Card>
  )
}


// eslint-disable-next-line react/prop-types
function MarkEntry({handleBack}){

    const stuarr = JSON.parse(localStorage.getItem("stuarr")) || [];
    const subarr =JSON.parse(localStorage.getItem("subarr")) ||[];
    const mararr=JSON.parse(localStorage.getItem("mararr")) ||[];

    const [selectedSname, setSelectedSname] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [selectedsub ,setselectedsub]=useState('');
    const [sdep,setsdep]=useState('');
    const [ssem,setssem]=useState('');
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const selectedStudent = stuarr.find(item => item.id === selectedId);
        if (selectedStudent) {
            setSelectedSname(selectedStudent.sname);
            setsdep(selectedStudent.department);
            setssem(selectedStudent.semester);
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

    function changename(e){
        setSelectedSname(e.target.value)
        setSelectedId("")
        setsdep("")
        setssem('')
    }
    function changeroll(e){
        setSelectedId(e.target.value)
        setsdep('')
        setssem("")
    }
    function handleErInputChange(e, i, j) {
        const inputValue = e.target.value;
        if (inputValue === '') {
          setError(`s${j}m${i}`);
        } else if (!regex(inputValue)) {
          setError(`s${j}m${i}`);
        } else {
          setError(null);
        }
    }
  
    const semElements = [];
    for (let i = 1; i <= ssem; i++) {
    semElements.push(
    <div id={`sem${i}`} className="col-sm-6 row" key={`sem${i}`}>
      <div className="col-sm-9 text-center h5">Semester {i}</div>
      <div className="col-sm-3 text-center">Marks</div>
      {[1, 2, 3, 4, 5, 6].map(j => (selectedsub && selectedsub[`sem${i}`][`b${j}`] &&
        (<Fragment key={`s${i}b${j}`}>
          <div className={`col-sm-9 my-2 s${i}sub${j}`}>
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
              onChange={(e) => {
                handleErInputChange(e, i, j);
              }}
              
              helperText={error === `s${j}m${i}` ? (  <span style={{ color: 'red' }}>Need Valid Mark</span>) : (  '')}
            />
          </div>
        </Fragment>)
      ))}
    </div>
  );
}
    
    function val() {
        for (let i = 1; i <= ssem; i++) {
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
        }
        return true; // If all checks pass
      }
    function regex(mv) {
        let rege = /^[1-9]?[0-9]{1}$|^100$/gm;
        return rege.test(mv);
    }
    const saveon = () => {
      if(val()){
        var newdataa=newinn()
        mararr.push(newdataa)
        console.log(mararr)
        localStorage.setItem("mararr",JSON.stringify(mararr));
      }
    };

    function newinn(){
      const newmark1={
        id:selectedId,
        sname:selectedSname,
        dep:sdep,
        sem:ssem,
      }
      const newmars={}
      for(let i=1;i<=ssem;i++){
        for(let j=1;j<=6;j++){
          if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
            newmars[`s${i}b${j}`] = document.getElementById(`s${i}b${j}`).value;
          }
        }
      }
      const newmark2={}
      for(let i=1;i<=ssem;i++){
        for(let j=1;j<=6;j++){
          if(selectedsub && selectedsub[`sem${i}`][`b${j}`]){
            newmark2[`s${i}m${j}`] = document.getElementById(`s${i}m${j}`).value;
          }
        }
      }
      const newmark={ ...newmark1,...newmars, ...newmark2 }
      return newmark
    }
    
    return (
        <Card>
            <CardHeader title={<Typography variant="h6" component="div">{" "}STUDENT ENTRY{" "}</Typography>} />
            <CardContent>
                <form id="myform" >
                <div className="row">
                    <div className="col-sm-3 py-3">
                        <TextField
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
                        </TextField>
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
                        </TextField>
                    </div>
                    <div className="col-sm-3 py-3">
                        <TextField
                            select
                            fullWidth
                            id="sdep"
                            name='sdep'
                            label="DEPARTMENT"
                            value={sdep}
                            sx={{pointerEvents:"none"}}
                        >
                            {stuarr.map(item => (
                                <MenuItem value={item.department} key={item.department}>{item.department}</MenuItem>
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
                            value={ssem}
                            sx={{pointerEvents:"none"}}
                        >
                            {stuarr.map(item => (
                                <MenuItem value={item.semester} key={item.semester}>{item.semester}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    {semElements}
                </div>
                </form>
                <div className="text-end my-2">
                    <Button  variant="contained"  color="success"  sx={{ margin: "1rem" }} onClick={saveon} > Save </Button>
                    <Button  variant="contained"  color="error"  sx={{ margin: "1rem" }}  id="closebtn" onClick={handleBack}> Cancel</Button>
                </div>
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