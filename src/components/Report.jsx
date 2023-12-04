import { Box, Button, Card, CardContent, CardHeader, Container, Fab, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, Fragment } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

function Report (){
  const [add, setAdd] = useState(true);
  const [selsem,setselsem]=useState('1')

  function handleAdd() {
    setAdd(false);
  }
  function handleBack() {
    setAdd(true);
  }
  function selectsem(item){
    console.log(item)
    setselsem(item.toString())
    setAdd(false);
  }
  return(
  <Container sx={{marginY:"3rem"}}>
    {add? <ReportList handleAdd={handleAdd} selectsem={selectsem}/>:<ReportCard handleBack={handleBack} selsem={selsem}/>}
  </Container>
  )
}

// eslint-disable-next-line react/prop-types
function ReportList({handleAdd,selectsem}){
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[];
  const [selectedSname, setSelectedSname] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedStudent,setselectedStudent]=useState([])
  function changename(e){
    setSelectedSname(e.target.value)
    setSelectedId('')
    setselectedStudent('')
  }
  function changeroll(e){
    setSelectedId(e.target.value)
    const ss = mararr.find(item => item.id === e.target.value);
    setselectedStudent(ss)
    setSelectedSname(ss.sname);
  }
  return(
    <Card style={{width:"100%"}}>
      <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title="REPORTLIST"
        action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn" onClick={handleAdd} sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}} > <AddIcon/></Fab></Tooltip>}
      />
      <CardContent>
        <div className="row">
          <div className="col-sm-6">
            <TextField size="small" select fullWidth id='selname' name='selname' label ="Select Student_Name"
              onChange={changename} value={selectedSname}
            >
              <MenuItem value="" key='select' >SELECT STUDENT</MenuItem>
              {mararr.map(item=> (<MenuItem value={item.sname} key={item.sname} >{item.sname}</MenuItem>))}
            </TextField>
          </div>
          <div className="col-sm-6">
            <TextField size="small" select fullWidth id='selid' name='selid' label ="Select Student_ID"
              onChange={changeroll} value={selectedId}
            >
            <MenuItem value="" key='select' >SELECT ID</MenuItem>
              {selectedSname 
                ? (mararr.filter(item=> item.sname===selectedSname).map(itemm=> (<MenuItem value={itemm.id} key={itemm.id}>{itemm.id}</MenuItem>)))
                : (mararr.map(item=> (<MenuItem value={item.id} key={item.id} >{item.id}</MenuItem>)))  
              }
            </TextField>
          </div> 
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' ,marginTop:"2rem"}}  >
          {[1,2,3,4].filter(i=> i<=selectedStudent.sem).map(item => (
            <div className="col-sm-3" key={item} id={item} name={item} onClick={() => selectsem(item)} style={{ width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
              <Button>
              <img src="src/assets/reportpic.png" alt={`rep${item}`} width="200" height="200" style={{ marginBottom: '10px' }}></img>              
              </Button>
              <div style={{textAlign:'center',pointerEvents:'none'}}>{`SEMESTER ${item}`}</div> 
            </div>
          ))}
        </div>
        {selectedStudent.sem==4 && (
          <div className="row mt-4" >
          <Button sx={{color:'black'}}>OverAll Report Card</Button>
        </div>  
        )}
      </CardContent>
    </Card> 
  )
}









// eslint-disable-next-line react/prop-types
function ReportCard({handleBack,selsem}){
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[];
  const stuarr = JSON.parse(localStorage.getItem("stuarr"))||[];
    const [tcon,settcon]=useState()
    const [selectedStudent,setselectedStudent]=useState(mararr.find(item => item.id=='INF00R001'));
    const [sdat,setsdat]=useState(stuarr.find(item => item.id=='INF00R001'))
    const [to,setto]=useState('')
    const [ocg,setocg]=useState('')
    const [arc,setarc]=useState(0)
    
    useEffect(() =>{
        const ss=mararr.find(item => item.id=='INF00R001')
        setselectedStudent(ss)
        const dd=stuarr.find(item => item.id=='INF00R001')
        setsdat(dd)
        setarc(0)
        arccheck(ss.sem)
        if(mararr.length>0)
            settcon(load(ss))
    },[])
    const column = [
        { field: 'sem', headerName: 'Semester',align:'center',headerAlign:'center',headerClassName: 'headercol',flex:1, },
        { 
          field: 'subject',  
          headerName: 'Subject',
          headerAlign:'center' ,
          minWidth:200,headerClassName: 'headercol',flex:2,
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
          align:'center',headerClassName: 'headercol',flex:1,
          renderCell: (params) => (
            <div>
              {params.value.map((subject,index)=>(
                <div key={index} style={{color:subject <35 ? 'red' : 'inherit' }}>
                  {subject}
                </div>
              ))}
            </div>
          )
        },
        { field: 'tm', headerName: 'Total Marks',align:'center',headerAlign:'center' ,headerClassName: 'headercol',flex:1,},
        { field: 'cgpa', headerName: 'CGPA',align:'center',headerAlign:'center' ,headerClassName: 'headercol',flex:1,},
      ];
      console.log(sdat)
      console.log(sdat.date)
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
    
    function che(){
      var chh=mararr.find(item => item.id=='INF00R001');
      return hasEmptyValues(chh)
    }
    function hasEmptyValues(obj) {
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null || obj[key] === undefined)) {
          return true; // Found an empty value
        }
      }
      return false; // No empty values found
    }
    function arccheck(a){
      for(let i=0;i<=a;i++){
        for(let j=0;j<=6;j++){
          if(selectedStudent[`s${i}m${j}`]){
            selectedStudent[`s${i}m${j}`]<35 && setarc(c=>c+1)
          }
        }
      }
    }

    
   return(
    <Card>
        <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title="MARKLIST"
        // action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn"  sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}} > ADD</Fab></Tooltip>}
        action={<Tooltip title="CLOSE" placement="top" arrow><IconButton onClick={handleBack}><CloseIcon/></IconButton></Tooltip>}
      ></CardHeader>

      <CardContent>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <div className="mx-2">
            <img src="src/assets/pngtree-university-logo-in-flat-style-png-image_6402853.png" alt="ulogo" width='100px' height='100px'></img>
          </div>
          <div className="mx-2">
            <Typography variant="h4">ABC University</Typography>
          </div>
        </div>
        <div style={{display:'flex'}}>
          <div style={{flex:'1'}}>
            <img src={`src/assets/Avatar/avatar${Math.floor(Math.random() * 10)}.jpg`} alt="dp" width='200px' height='200px' style={{marginLeft:"5rem"}} ></img>
          </div>
          <div style={{flex:'3'}}>
            <div className="row m-2">
              <Typography fontWeight='bold' className="col-sm-3" >NAME :  </Typography>
              <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'>{selectedStudent.sname}</Typography>
            </div>
            <div className="row m-2">
              <Typography fontWeight='bold' className="col-sm-3">ROLL :  </Typography>
              <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'>{selectedStudent.id}</Typography>
            </div>
            <div className="row m-2">
              <Typography fontWeight='bold' className="col-sm-3">D.O.B :  </Typography>
              <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'>{(sdat.date).substring(0,10)}</Typography>
            </div>
            <div className="row m-2">
              <Typography fontWeight='bold' className="col-sm-3">DEPARTMENT : </Typography>
              <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'> {selectedStudent.dep} </Typography>
            </div> 
            <div className="row m-2">
              <Typography fontWeight='bold' className="col-sm-3">SEMESTER : </Typography>
              <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'> {selectedStudent.sem} </Typography>
            </div> 
          </div>
        </div>
        <div className="mt-4">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{backgroundColor:"#8f8787"}}>
                  <TableCell style={{color:'white',textAlign:"center"}}>SEMESTER</TableCell>
                  <TableCell style={{color:'white',textAlign:"center"}}>SUBJECT</TableCell>
                  <TableCell style={{color:'white',textAlign:"center"}}>MARKS</TableCell>
                  {/* <TableCell>TOTALMARKS</TableCell>
                  <TableCell>CGPA</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{textAlign:'center'}}>{selsem}</TableCell>
                  <TableCell sx={{paddingLeft:"4rem"}}>
                    <Box>
                      {[1,2,3,4,5,6].map(j => (
                        <Typography sx={{marginY:"1rem" }} key={j}>{selectedStudent[`s${selsem}b${j}`]}</Typography>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                  <div>
                      {[1,2,3,4,5,6].map(j => (
                        <Typography sx={{marginY:"1rem",color:selectedStudent[`s${selsem}m${j}`] <35 ? 'red' : 'inherit' }} key={j}>{selectedStudent[`s${selsem}m${j}`]}</Typography>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CardContent>



      {mararr.length>0 ? 
        (che() 
            ? (<CardContent>Need to Enter mark till Current Semester</CardContent>) 
            : (<CardContent>
                <div className="row gap-2">
                <Box width='auto' minWidth='70vw' marginX='auto' sx={{ '& .headercol': {backgroundColor: 'gray',color:"white"}}}><DataGrid rows={tcon || []} columns={column} getRowHeight={() => 'auto'} hideFooter hideScrollbar disableRowSelectionOnClick/></Box>  
                <div className="row mt-4">
                <span className="col-sm-9"></span>
                <Typography fontWeight='bold' className="col-sm-2 ">Total Marks</Typography><Typography  fontWeight='bold' className="col-sm-1 ">{to}</Typography>
                <span className="col-sm-9"></span>
                <Typography fontWeight='bold' className="col-sm-2 ">Overall CGPA</Typography><Typography  fontWeight='bold' className="col-sm-1 ">{ocg}</Typography>
                <span className="col-sm-9"></span>
                <Typography fontWeight='bold' className="col-sm-2 ">Arrer Count</Typography><Typography  fontWeight='bold' className="col-sm-1 ">{arc}</Typography>
                </div>
                <Button  >Close</Button>
                </div>
            </CardContent>)) 
        : (<CardContent>NO record</CardContent>)
      }
    </Card>
    )
}


export default Report;