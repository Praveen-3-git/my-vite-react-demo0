/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Box, Button, Card, CardContent, CardHeader, Container, Fab, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useRef} from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import {useReactToPrint} from "react-to-print";
import generatePDF from 'react-to-pdf';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import dayjs from "dayjs";

function Report (){
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[];
  const [add, setAdd] = useState(true);
  const [selsem,setselsem]=useState('1')
  const [selectedSname, setSelectedSname] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedStudent,setselectedStudent]=useState([])
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
  <Container sx={{marginY:"3rem"}}>
    {add
      ? <ReportList handleAdd={handleAdd} selectsem={selectsem} selectedSname={selectedSname} selectedId={selectedId} selectedStudent={selectedStudent} changename={changename} changeroll={changeroll}/>
      :<ReportCard handleBack={handleBack} selsem={selsem} selectedId={selectedId}/>}
  </Container>
  )
}

// eslint-disable-next-line react/prop-types
function ReportList({handleAdd,selectsem,selectedSname,selectedId,selectedStudent,changename,changeroll}){
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[];
  
  
  return(
    <Card style={{width:"100%"}}>
      <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title="REPORTLIST"
        action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn" onClick={handleAdd} sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"},display:'none'}} > <AddIcon/></Fab></Tooltip>}
      />
      <CardContent>
        <div className="row">
          <div className="col-sm-6">
            <TextField size="small" select fullWidth id='selid' name='selid' label ="Select Student_ID"
              onChange={changeroll} value={selectedId}
            >
            <MenuItem value="" key='select' disabled >SELECT ID</MenuItem>
              {/* {selectedSname 
                ? (mararr.filter(item=> item.sname===selectedSname).map(itemm=> (<MenuItem value={itemm.id} key={itemm.id}>{itemm.id}</MenuItem>)))
                : (mararr.map(item=> (<MenuItem value={item.id} key={item.id} >{item.id}</MenuItem>)))  
              } */}
              {mararr.map(item=> (<MenuItem value={item.id} key={item.id} >{item.id}</MenuItem>))}
            </TextField>
          </div> 
          <div className="col-sm-6">
            <TextField size="small" select fullWidth id='selname' name='selname' label ="Select Student_Name"
              onChange={changename} value={selectedSname} InputProps={{readOnly: true}} sx={{pointerEvents:'none'}}
            >
              <MenuItem value="" key='select'disabled >SELECT STUDENT</MenuItem>
              {mararr.map(item=> (<MenuItem value={item.sname} key={item.sname} >{item.sname}</MenuItem>))}
            </TextField>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' ,marginTop:"2rem"}}  >
          {[1,2,3,4].filter(i=> i<=selectedStudent.sem).map(item => (
            <div className="col-sm-3" key={item} id={item} name={item} onClick={() => selectsem(item)} style={{ width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
              <Button>
              <img src="src/assets/reportpic.png" alt={`rep${item}`} style={{width:"10em", height:"10em"}}></img>              
              </Button>
              <div style={{textAlign:'center',pointerEvents:'none'}}>{`SEMESTER ${item}`}</div> 
            </div>
          ))}
        </div>
        {selectedStudent.sem==4 && (
          <div className="row mt-4" >
          <Button sx={{color:'black'}} startIcon={<DescriptionIcon/>} onClick={() => selectsem(5)}>OverAll Report Card</Button>
        </div>  
        )}
      </CardContent>
    </Card> 
  )
}

// eslint-disable-next-line react/prop-types
function ReportCard({handleBack,selsem,selectedId}){
  const mararr = JSON.parse(localStorage.getItem("mararr"))||[];
  const stuarr = JSON.parse(localStorage.getItem("stuarr"))||[];
    const [tcon,settcon]=useState()
    const [selectedStudent,setselectedStudent]=useState(mararr.find(item => item.id==selectedId));
    const [sdat,setsdat]=useState(stuarr.find(item => item.id==selectedId))
    //const [to,setto]=useState('')
    const [ocg,setocg]=useState('')
    const [arc,setarc]=useState(0)
    
    useEffect(() =>{
        const ss=mararr.find(item => item.id==selectedId)
        setselectedStudent(ss)
        const dd=stuarr.find(item => item.id==selectedId)
        setsdat(dd)
        setarc(0)
        if(selsem<=4)
          arcchecks(selsem)
        else if(selsem==5)
          arcchecka(ss.sem)
        
        if(mararr.length>0)
            settcon(load(ss))
    },[])
    // const column = [
    //     { field: 'sem', headerName: 'Semester',align:'center',headerAlign:'center',headerClassName: 'headercol',flex:1, },
    //     { 
    //       field: 'subject',  
    //       headerName: 'Subject',
    //       headerAlign:'center' ,
    //       minWidth:200,headerClassName: 'headercol',flex:2,
    //       renderCell: (params) => (
    //         <>
    //           {params.value.map((subject, index) => (
    //             <Fragment key={index}>    
    //               {subject}
    //               {index < params.value.length - 1 && <br />}
    //             </Fragment>
    //           ))}
    //         </> 
    //       )
    //     },
    //     { 
    //       field: 'mark',  
    //       headerName: 'Marks',
    //       headerAlign:'center' ,
    //       align:'center',headerClassName: 'headercol',flex:1,
    //       renderCell: (params) => (
    //         <div>
    //           {params.value.map((subject,index)=>(
    //             <div key={index} style={{color:subject <35 ? 'red' : 'inherit' }}>
    //               {subject}
    //             </div>
    //           ))}
    //         </div>
    //       )
    //     },
    //     // { field: 'tm', headerName: 'Total Marks',align:'center',headerAlign:'center' ,headerClassName: 'headercol',flex:1,},
    //     { field: 'cgpa', headerName: 'GPA',align:'center',headerAlign:'center' ,headerClassName: 'headercol',flex:1,},
    //   ];
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
          var sss=selsem <=4 ? selsem : 4 
          for (let j = 1; j <= sss; j++) {
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
          // eslint-disable-next-line no-unused-vars
          var to = 0;
          aa.forEach((x) => {
            if (x) to += x;
          });
          //setto(to)
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
    function arcchecks(a){
      for(let j=0;j<=6;j++){
        if(selectedStudent[`s${a}m${j}`]){
          selectedStudent[`s${a}m${j}`]<35 && setarc(c=>c+1)
        }
      }
    }
    function arcchecka(a){
      for(let i=1;i<=a;i++){
        for(let j=0;j<=6;j++){
          if(selectedStudent[`s${i}m${j}`]){
            selectedStudent[`s${i}m${j}`]<35 && setarc(c=>c+1)
          }
        }
      }
    }
    const targetRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => targetRef.current,
      fileName: 'your-desired-filename.pdf'
    });
    function ches(){
      let sm=`s${selsem}m1` in selectedStudent
      if (!sm)
        return true
      else if(selsem<=4 && selectedStudent[`s${selsem}m1`]=="")
        return true
      else 
        return false
    }
    function chea(){
      var chh=mararr.find(item => item.id==selectedId);
      console.log(selectedId)
      return hasEmptyValues(chh)
    }
    function hasEmptyValues(obj) {
        for (const key in obj) {
          // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null || obj[key] === undefined)) {
            console.log(key)
            return true; // Found an empty value
          }
        }
      return false; // No empty values found
    }
    const col1=[
      { field: 'sem', headerName: 'Semester',align:'center',headerAlign:'center',headerClassName: 'headercol',flex:1,renderCell:(params)=>(<Typography>{params.row.sem}</Typography>) },
      { field: 'subject', headerName: 'Subject',headerAlign:'center',headerClassName: 'headercol',flex:2.5, 
        renderCell:(params)=>(
          <div>
            {[1,2,3,4,5,6].map(j=> (
              <Typography key={j}>{params.row.subject[j-1]}</Typography>
            ) )}
          </div>
        )  
      },
      { field: 'mark', headerName: 'Mark',align:'center',headerAlign:'center',headerClassName: 'headercol',flex:1,
        renderCell:(params)=>(
          <div>
            {[1,2,3,4,5,6].map(j=> (
              <Typography style={{color:params.row.mark[j-1]<35? 'red':'inherit'}} key={j}>{params.row.mark[j-1]}</Typography>
            ) )}
          </div>
        ) 
      },
      // { field: 'tm', headerName: 'Total_Mark',align:'center',headerAlign:'center',headerClassName: 'headercol',flex:1, },
      { field: 'cgpa', headerName: 'CGPA',align:'center',headerAlign:'center',headerClassName: 'headercol',flex:1,renderCell:(params)=>(<Typography>{params.row.cgpa}</Typography>)},
    ]
  return(
    <Card>
        <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title="REPORT CARD"
        // action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn"  sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}} > ADD</Fab></Tooltip>}
        action={<Tooltip title="CLOSE" placement="top" arrow><IconButton onClick={handleBack}><CloseIcon/></IconButton></Tooltip>}
      ></CardHeader>
      {(selsem <=4 ? ches() : chea())
       ?(<CardContent>
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',margin:'2rem' }}>
              <img src='src/assets/work-in-progress.png' alt='emptyfolder'  style={{opacity:'0.5',pointerEvents:'none',width:'9rem',height:'9rem'}}></img>
              {/* <Typography className="m-3" align='center'>NO RECORD FOUND</Typography> */}
            </div>
       </CardContent>): (
        <CardContent sx={{width: 'auto' }}>
            <div ref={targetRef} >
            <div className="mx-auto" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor:"#f9f9f9" ,width:'50rem',}}>
              <div className="mx-2">
                <img src="src/assets/pngtree-university-logo-in-flat-style-png-image_6402853.png" alt="ulogo" width='100px' height='100px'></img>
              </div>
              <div className="mx-2">
                <Typography variant="h4">ABC University</Typography>
              </div>
            </div>
            <div style={{display:'flex',width:'50rem' , margin:'0 auto', backgroundColor:"#f9f9f9"}}>
              <div style={{flex:'1'}}>
                <img src={sdat.pic.data} alt="dp" width='150px' height='150px' style={{marginLeft:"1rem"}} ></img>
              </div>
              
              <div style={{flex:'4'}}>
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
                  <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'>{/*(sdat.date).substring(0,10)*/}{dayjs(sdat.date).format('YYYY-MM-DD')}</Typography>
                </div>
                <div className="row m-2">
                  <Typography fontWeight='bold' className="col-sm-3">DEPARTMENT : </Typography>
                  <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'> {selectedStudent.dep} </Typography>
                </div> 
                <div className="row m-2">
                  <Typography fontWeight='bold' className="col-sm-3">SEMESTER : </Typography>
                  <Typography fontWeight='bold' className="col-sm-9" fontFamily='Verdana'> {selsem ==5 ? selsem-1 : selsem} </Typography>
                </div> 
              </div>
            </div>
            {selsem <=4 && (
              <div className="mt-4" style={{margin:'0 auto',width:'50rem', backgroundColor:"#f9f9f9"}}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow style={{backgroundColor:"#8f8787"}}>
                        {/* <TableCell style={{color:'white',textAlign:"center"}}>SEMESTER</TableCell> */}
                        <TableCell style={{color:'white',textAlign:"center"}}>SUBJECT</TableCell>
                        <TableCell style={{color:'white',textAlign:"center"}}>MARKS</TableCell>
                        {/* <TableCell>TOTALMARKS</TableCell>
                        <TableCell>CGPA</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor:"#f9f9f9"}} >
                      <TableRow>
                        {/* <TableCell sx={{textAlign:'center',fontSize:"1rem"}}>{selsem}</TableCell> */}
                        <TableCell sx={{paddingLeft:"4rem"}}>
                          <Box>
                            {[1,2,3,4,5,6].map(j => (
                              <Typography sx={{marginY:"0.5rem" }} key={j}>{selectedStudent[`s${selsem}b${j}`]}</Typography>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell sx={{textAlign:'center'}}>
                        <div>
                            {[1,2,3,4,5,6].map(j => (
                              <Typography sx={{marginY:"0.5rem",color:selectedStudent[`s${selsem}m${j}`] <35 ? 'red' : 'inherit' }} key={j}>{selectedStudent[`s${selsem}m${j}`]}</Typography>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="row mt-4">
                  <div className="row">
                      {arc 
                        ? (<Typography fontWeight='bold' paddingLeft='2rem' className="col-sm-10 ">Arrear<span style={{margin:'0 1rem',color:'red'}} color='error'>{arc}</span></Typography>)
                        : (<div className="col-sm-10"/>) 
                      }
                      
                      {/* <Typography fontWeight='bold' paddingLeft='2rem' className="col-sm-2 ">Total Marks</Typography><Typography  fontWeight='bold' paddingLeft='2rem' className="col-sm-1 ">
                      {sum(
                        selectedStudent[`s${selsem}m1`],
                        selectedStudent[`s${selsem}m2`],
                        selectedStudent[`s${selsem}m3`],
                        selectedStudent[`s${selsem}m4`],
                        selectedStudent[`s${selsem}m5`],
                        selectedStudent[`s${selsem}m6`]
                      )}
                      </Typography> */}
                    
                      <Typography fontWeight='bold' paddingLeft='2rem' className="col-sm-2 ">GPA<span  style={{margin:'0 1.65rem'}} >
                      {cgp(
                        selectedStudent[`s${selsem}m1`],
                        selectedStudent[`s${selsem}m2`],
                        selectedStudent[`s${selsem}m3`],
                        selectedStudent[`s${selsem}m4`],
                        selectedStudent[`s${selsem}m5`],
                        selectedStudent[`s${selsem}m6`]
                      )}
                      </span></Typography>
                  </div>
                  <div className="row">
                    <div className="col-sm-10"></div>
                    <Typography fontWeight='bold' paddingLeft='2rem' className="col-sm-2 ">CGPA<span style={{margin:'0 1rem'}} >{ocg}</span>
                    </Typography>  
                  </div>
                </div>
              </div>
            )}

            {selsem==5 && mararr.length>0 && (
                    <div className="row gap-2">
                    <Box width='50rem' marginX='auto' sx={{ '& .headercol': {backgroundColor: 'gray',color:"white"}}}>
                      {/* <DataGrid rows={tcon || []} columns={column} getRowHeight={() => 'auto'} hideFooter hideScrollbar disableRowSelectionOnClick/> */}
                      <DataGrid rows={tcon || []} columns={col1} getRowHeight={() => 'auto'} hideFooter hideScrollbar disableRowSelectionOnClick/>
                    </Box>
                    <div style={{width:'50rem', margin:'1rem   auto',display:'flex',alignContent:'center',justifyContent:arc !==0 ? 'space-between' : 'end' }}>
                    {arc !=0
                    && (<><Typography fontWeight='bold'  >Arrear<span style={{margin:'1rem',color:'red'}} fontWeight='bold'>{arc}</span></Typography></>) 
                    }
                    {/* <Typography fontWeight='bold'>Total Marks<span  fontWeight='bold' style={{margin:'0 1rem'}}>{to}</span></Typography> */}
                    <Typography fontWeight='bold'>Overall CGPA<span  fontWeight='bold' style={{margin:'1rem'}}>{ocg}</span></Typography>
                    </div>
                    </div>
            )
          }
          </div>
          <div className="text-center">
            <Button variant="outlined" className="mx-2" color="secondary" startIcon={<PrintIcon/>} onClick={handlePrint}>Print</Button>
            <Button variant="outlined" className="mx-2" color="success" startIcon={<FileDownloadIcon/>} onClick={() => generatePDF(targetRef, {filename: `${selectedId}.pdf`})}>Download PDF</Button>
          </div>  
        </CardContent>
      )}
    </Card>
    )
}

export default Report;