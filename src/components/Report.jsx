import { Box, Button, Card, CardContent, CardHeader, Fab, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, Fragment } from "react";

function Report (){
    const mararr = JSON.parse(localStorage.getItem("mararr"))||[];
    
    
    const [tcon,settcon]=useState()
    const [selectedStudent,setselectedStudent]=useState(mararr.find(item => item.id=='COM00R001'));
    const [to,setto]=useState('')
    const [ocg,setocg]=useState('')
    useEffect(() =>{
        const ss=mararr.find(item => item.id=='COM00R001')
        setselectedStudent(ss)
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
      var chh=mararr.find(item => item.id=='COM00R001');
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

   return(
    <Card>
        <CardHeader sx={{backgroundColor:"#ece8d9"}}
        title="MARKLIST"
        action={<Tooltip title="ADD" placement='top' arrow><Fab color='primary' size='small'  id="addbtn"  sx={{marginX:'1rem',backgroundColor:"white",color:'black',":hover": {backgroundColor: "lightyellow"}}} > ADD</Fab></Tooltip>}
      ></CardHeader>
      {mararr.length>0 ? 
        (che() 
            ? (<CardContent>Need to Enter mark till Current Semester</CardContent>) 
            : (<CardContent>
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
                <Box width='auto' minWidth='70vw' marginX='auto' sx={{ '& .headercol': {backgroundColor: 'gray',color:"white"}}}><DataGrid rows={tcon || []} columns={column} getRowHeight={() => 'auto'} hideFooter hideScrollbar disableRowSelectionOnClick/></Box>
                
                <div className="row">
                <span className="col-sm-9"></span>
                <Typography fontWeight='bold' className="col-sm-2 my-2">Total Marks</Typography><Typography  fontWeight='bold' className="col-sm-1 my-2">{to}</Typography>
                <span className="col-sm-9"></span>
                <Typography fontWeight='bold' className="col-sm-2 ">Overall CGPA</Typography><Typography  fontWeight='bold' className="col-sm-1 ">{ocg}</Typography>
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