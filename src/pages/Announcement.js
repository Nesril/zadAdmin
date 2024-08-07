import { Box, Typography,Button,
    ListItemIcon,
    MenuItem,
    Modal,
    InputAdornment,
    IconButton,
    Select,
    FormControl,
    InputLabel,
    Alert,
    TextField,
     } from '@mui/material'
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import React,{ useEffect, useMemo, useState } from 'react';
  import CustomInput from "../components/CustomInput"
  import {
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
  import BackpackIcon from "@mui/icons-material/Backpack";
  import AddIcon from '@mui/icons-material/Add';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { TimePicker } from '@mui/x-date-pickers/TimePicker';
  import { v4 as uuidv4 } from 'uuid';
  import { useDispatch, useSelector } from "react-redux";
  import { fethPrograms, createPrograms, updatePrograms, deletePrograms } from '../common/action/programAction';
  import CustomProgrss from '../components/CustomProgress';
  import moment from 'moment';
  import { message } from "antd";
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import CommonSection from '../components/commonSection';
  import Header from '../components/Header/Header';
  import PhotoCamera from '@mui/icons-material/PhotoCamera'; // Importing camera icon
  import Theme from '../assets/css/theme';
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);
  
  const listOfAvailableFeatures=[
    {label:"1 Day",value:'1d'},
    {label:"1 Week",value:'1w'},
    {label:"2 Week",value:'2w'},
    {label:"3 Week",value:'3w'},
    {label:"1 Month",value:'1m'},
    {label:"3 Month",value:'3m'},
    {label:"5 Month",value:'5m'},
    {label:"8 Month",value:'8m'},
    {label:"1 Year",value:'1y'},
  ]
  
  export default function Programs() {
    const dispatch = useDispatch()
    const programs= useSelector(state=>state.programs)
    useEffect(()=>{
      dispatch(fethPrograms())
    },[dispatch,fethPrograms])
    const [data,setData] =useState([]);
   
    useEffect(()=>{
          if(programs?.programs){
            if(programs?.programs.length===0){
              setData([])
            }
            else{
  
              setData(programs?.programs)
              
            }
          }
    },[programs])
  
    return programs.loading ? (
      <CustomProgrss />
    ) : (
      <Box sx={sxStyles.container}>
          <CommonSection />
          <Header />
          <Box sx={sxStyles.content}>
            <Typography variant='h4' sx={sxStyles.typography}>Announcements</Typography>
            <Box sx={{marginTop:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AllPrograms data={data} setData={setData} />
              </LocalizationProvider>
            </Box>
  
          </Box>
      </Box>
    )
  }
  
    
  const typesOfClasses = [
    { label: "Hadith", value: "Hadith" },
    { label: "Fiqih", value: "Fiqih" },
    { label: "Aqidah", value: "Aqidah" },
    { label: "Menhaj", value: "Menhaj" },
  ];
  
  const AllPrograms = ({data,setData}) => {
    const programs= useSelector(state=>state.programs)
  
    const dispatch = useDispatch()
  
    function getUniqueObjects(arr) {
      const uniqueMap = new Map();
      for (const obj of arr) {
        if (!uniqueMap.has(obj.day)) {
          uniqueMap.set(obj.day, obj);
        }
      }
        return Array.from(uniqueMap.values());
    }
  
    const columns = useMemo(
      () => [
            {
              accessorFn: (row) => `${row.name}`, //accessorFn used to join multiple data into a single cell
              id: 'name', //id is still required when using accessorFn instead of accessorKey
              header: 'Name',
              enableClickToCopy: true,
              size: 250,
              Cell: ({ renderedCellValue, row }) => {
  
                //console.log(row?.original, `${process.env.REACT_APP_BACKEND_API}/${row.original?.coverPicture}`);
                return   <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Box>{renderedCellValue}</Box>
              </Box>
              },
            },  
            {
              accessorFn: (row) => `${row.classType}`, //accessorFn used to join multiple data into a single cell
              id: 'classType', //id is still required when using accessorFn instead of accessorKey
              header: 'Type',
              enableClickToCopy: true,
              size: 250,
              Cell: ({ renderedCellValue, row }) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <Box>{renderedCellValue}</Box>
                </Box>
              ),
            },
            {
              accessorKey: 'schedule',
              // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
              //filterFn: 'between',
              header: 'Schedule',
              size: 200,
              //custom conditional format and styling 
              Cell: ({ cell }) => (
                <Box
                  component="span"
                  sx={(theme) => ({
                    backgroundColor:theme.palette.success.dark
                  })}
                >
                  {getUniqueObjects(cell.getValue())?.map((element,index)=>{
                       return(
                          <Box sx={(theme) => ({
                              color:"white",
                              padding:"3px",
                              width:"fit-content",
                              marginBottom:"4px",
                              borderRadius:"5px"
                            })} key={index}>
                              <Box>{element.day}</Box>
                          </Box>
                       )
                  })}
                  
                </Box>
              ),
            },      
            {
              accessorKey: 'startingDate',
              //enableClickToCopy: true,
              //filterVariant: 'autocomplete',
              header: 'Starting Date',
              size: 300,
              Cell: ({ renderedCellValue, row }) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                   
                  <Box>{moment(renderedCellValue).format('LL')}</Box>
                </Box>
              ),
            },
            {
              accessorKey: 'isActive', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
              header: 'Status',
              size: 200,
              Cell: ({ cell }) => (
                  <Box
                    component="span"
                    sx={(theme) => ({
                      color:cell.getValue()?'#9aeb96':'red',
                      fontWeight:"600"
                    })}
                  >
                  {cell.getValue() ? 'Active' : "Deactive"}
                  </Box>
                ),
            },
            {
              accessorKey: 'createdBy', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
              //filterVariant: 'autocomplete',
              header: 'Created By',
              size: 300,
              Cell: ({ renderedCellValue, row }) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                     {row.original?.createdBy?.email||'Admin'}
                  </Box>
                ),
            }, 
            {
              accessorKey: 'createdAt',
              //enableClickToCopy: true,
              //filterVariant: 'autocomplete',
              header: 'Created At',
              size: 300,
              Cell: ({ renderedCellValue, row }) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                   
                  <Box>{moment(renderedCellValue).format('lll')}</Box>
                </Box>
              ),
            }, 
         
      ],
      [],
    );
  
    const [selectedRow, setSelectedRow] = useState(null);
    const [openEdit, setOpenEdit]= useState(false)
    const [openAddModal, setOpenAddModal]= useState(false)
    const [newData, setNewData] = React.useState({
      name: "",
      file: "",
      classType:"",
      startingDate: dayjs(),
      imageUrl: "",
    });
    const [classSchedule, setClassSchedule]=useState([])
  
  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewData({ 
        ...newData, 
        file: file,
        imageUrl: URL.createObjectURL(file) // Store the image URL
      });
    }
  };;
  
  const handleDateChange = (date) => {
    setNewData({ ...newData, startingDate: date });
  };
  
    const handleclose=()=>{
      setOpenEdit(false)
      setSelectedRow(null)
      setNewData({
        name: "",
        file: "",
        classType:"",
        startingDate: dayjs(),
        imageUrl: "",
      })
      setOpenAddModal(false)
      setClassSchedule([])
    }
  
    const onEditRow=(row,closeMenu)=>{
      setSelectedRow(row.original);
      setNewData({
           programId: row.original?._id,
           name: row.original.name,
           file:row.original.coverPicture,
           classType:row.original.classType,
           startingDate:dayjs(row.original.startingDate),
           imageUrl:`${process.env.REACT_APP_BACKEND_API}${row.original?.coverPicture}`})
      setClassSchedule(row.original?.schedule||[])
      setOpenAddModal(true)
      setOpenEdit(true)
      closeMenu()
    }
  
    const onDeleteRow=(row,closeMenu)=>{
      const updatedData = data.filter(obj => obj !== row.original);
      dispatch(deletePrograms(row.original._id))
      closeMenu()
      
    }
    
  
    const table = useMaterialReactTable({
      columns,
      data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
      enableColumnFilterModes: true,
      enableColumnOrdering: true,
      enableGrouping: true,
      enableColumnPinning: true,
      enableFacetedValues: true,
      enableRowActions: true,
      initialState: {
        showColumnFilters: false,
        showGlobalFilter: true,
        columnPinning: {
          left: ['mrt-row-expand', 'mrt-row-select'],
          right: ['mrt-row-actions'],
        },
      },
      mrtTheme: (theme) => ({
        baseBackgroundColor:'rgba(5, 63, 107,0.1)',
      }),
      muiTableBodyRowProps: { hover: false },
      // muiTableProps: {
      //   sx: {
      //     border: '1px solid rgba(81, 81, 81, .5)',
      //     color:"red",
      //     caption: {
      //       captionSide: 'top',
      //     },
      //   },
      // },
      muiTableHeadCellProps: {
        sx: {
          background: '#490d5e',
          color:"white",
        },
      },
      muiTableBodyCellProps: {
        sx: {
          background:'rgba(78, 81, 110,0.1)',
          color:"white"
  
        },
      },
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      muiSearchTextFieldProps: {
        size: 'small',
        variant: 'outlined',
        color:"secondary",
      },
      muiPaginationProps: {
        color: 'secondary',
        rowsPerPageOptions: [10, 20, 30],
        shape: 'rounded',
        variant: 'outlined',
      },
      renderDetailPanel: ({ row }) => (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-around',
            left: '30px',
            maxWidth: '1000px',
            position: 'sticky',
            width: '100%',
            color:"white"
          }}
        >
          <img
            alt="avatar"
            height={130}
            src={`${process.env.REACT_APP_BACKEND_API}${row.original?.coverPicture}`}
            loading="lazy"
          /> 
           <Box
                  component="span"
                  sx={(theme) => ({})}
                >
                  <Typography variant='h5' sx={{textAlign:"center",opacity:0.6}}>All Schedules</Typography>
                  {row.original.schedule?.map((e,index)=>{
                       return(
                          <Box sx={(theme) => ({
                              marginBottom:"7px",
                            })} key={index}>
                              <Box sx={{paddingLeft:"20px"}}>
                                  <Typography sx={{marginBottom:"1px", fontWeight:"600"}}>{e.day}</Typography>
                                  <Box sx={{fontSize:"12px",opacity:0.7,paddingLeft:"15px"}}>
                                      <Box >Started At {moment(e.startTime).format('LT')}</Box>
                                      <Box >Ended At {moment(e.endTime).format('LT')}</Box>
                                  </Box>
                              </Box>
                          </Box>
                       )
                  })}
                  
            </Box>
        </Box>
      ),
      renderRowActionMenuItems: ({ row, closeMenu }) => [
          <MenuItem
            key={0}
            onClick={() =>onEditRow(row,closeMenu)}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
          </MenuItem>,
        
          <MenuItem
            key={1}
            onClick={() =>onDeleteRow(row,closeMenu)}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <DeleteIcon style={{ color: 'red' }} />
            </ListItemIcon>
          </MenuItem>,
        ],
      renderTopToolbar: ({ table }) => {
        const handleDeactivate = () => {
          setOpenAddModal(true)
        };   
        return (
          <Box
            sx={(theme) => ({
               display: 'flex',
              gap: '0.5rem',
              p: '8px',
              justifyContent: 'space-between',
            })}
          >
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {/* import MRT sub-components */}
              <MRT_GlobalFilterTextField table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                sx={sxStyles.button}
                onClick={handleDeactivate}
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Box>
        );
      },
    });
  
  
    const [addNewSchedle, setAdsNewSchedule]=useState(true)
    const [error, setError] = useState("")
    const onInputChange = (event) => {
      setNewData({ ...newData, [event.target.id]: event.target.value });
    };
  
    const [errorMessage,setErrorMessage]=message.useMessage();
    const [messageApi, contextHolder] = message.useMessage();
    //successfull message
    const success = (message) => {
      messageApi.open({
        type: 'success',
        content: message,
        duration: 3,
      });
    };
    
    //errror message
    const Error = (message) => {
     errorMessage.open({
       type: 'error',
       content: message,
       duration: 2,
     });
   
    };
  
  
    const handleChange = (event) => {
      setNewData({...newData,classType:event.target.value});
    };
  
    useEffect(()=>{
      if(programs?.info){
        success(programs?.info)
      }
      else if(programs.error){
        Error(programs?.error?.error||"Check your internate connection then try again !!")
      }
  
    },[programs])
  
    const handleSave=()=>{
      if(!newData.name || !newData.classType  || !newData.file || !newData.startingDate || classSchedule.length<1){
        setError("Please Fill All Necessery Fields")
        return
      }
       let dataToBeAdded = {...newData, schedule:classSchedule}
       if(openEdit){
        dispatch(updatePrograms(dataToBeAdded))
  
       }
       else{
         dispatch(createPrograms(dataToBeAdded))
       }
  
    }
  
  
  
    return (
     <div>
       {setErrorMessage}
       {contextHolder}
  
       <MaterialReactTable table={table} />
  
      {/**modal for adding and update*/}
      <Modal
            open={openAddModal}
            onClose={handleclose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box  sx={sxStyles.modal}>
                <Typography sx={{textAlign:"center",marginBottom:10}}>{!openEdit?"Add New":"Update"} Program</Typography>
  
                    <Box sx={sxStyles.eachInput} display="flex" justifyContent="center" alignItems="center">
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="upload-image"
                          type="file"
                          onChange={onImageChange}
                        />
                        <label htmlFor="upload-image" style={{ position: 'relative', display: 'inline-block' }}>
                          {newData.imageUrl && (
                            <img 
                              src={newData.imageUrl} 
                              alt="Selected" 
                              style={{ maxHeight: '200px', maxWidth: '100%', display: 'block' }} 
                            />
                          )}
                          <IconButton 
                            component="span" 
                            sx={{
                              backgroundColor: '#3c5969',
                              borderRadius: '50%',
                              padding: '10px',
                              boxShadow: '0 2px 4px rgba(0,0,0,1)',
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}>
                            <PhotoCamera style={{color:"wheat"}} />
                          </IconButton>
                        </label>
                    </Box>
  
                    <Box  sx={sxStyles.eachInput}>
                        <CustomInput
                          id="name"
                          labelText="Name"
                          labelColor="rgba(255, 255, 255, 0.7)"
                          value={newData.name}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                          }}
                          color="white"
                          onChange={onInputChange}
                        />
                    </Box>
  
                    <Box  sx={sxStyles.eachInput}>
                         <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '100%', }}>
                                <InputLabel style={{color:"rgba(255, 255, 255, 0.7)"}} id="demo-simple-select-standard-label">Class Type</InputLabel>
                                {(openEdit &&false) ?
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={newData.classType}
                                      onChange={handleChange}
                                      label=">Class Type"
                                      style={{color:"white"}}
                                      disabled={openEdit}
                                    >
                                      
                                      <MenuItem value={newData.classType}>{newData.classType}</MenuItem>
                                      
                                    </Select>
                                    :
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={newData.classType}
                                    onChange={handleChange}
                                    label="Class Type"
                                    style={{color:"white"}}
                                  >
                                    
                                    {typesOfClasses.map(e=>{
                                      return <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                      })
                                    }
                                    
                                  </Select>
                                
                              }
                          </FormControl>
                  </Box>
  
                    <Box sx={sxStyles.eachInput}>
                      <Typography sx={{marginBottom:1,color:'rgba(255, 255, 255, 0.7)'}}>Starting Date</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={newData.startingDate}
                            onChange={(newValue) => handleDateChange(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            // disabled={openEdit}
                            sx={{width:"100%"}}
                          />
                        </LocalizationProvider>
                    </Box>
                  
                    <Box sx={sxStyles.eachInput}>
                        <Typography sx={{color:'rgba(255, 255, 255, 0.7)'}}>Schedules <IconButton onClick={()=>setAdsNewSchedule(!addNewSchedle)}><AddIcon sx={{fontSize:"20px",color:"#6895ad"}}/></IconButton></Typography>
                        <ClassScheduleBox classSchedule={classSchedule} setAdsNewSchedule={setAdsNewSchedule} 
                            addNewSchedle={addNewSchedle} setClassSchedule={setClassSchedule}/>
                    </Box>
  
                    <Box sx={{textAlign:"center",marginTop:"10px",marginBottom:3,width:"100%"}}>
                        <Button onClick={handleSave} sx={{width:"60%",background:"#39d431",color:"black"}}>Save</Button>
                    </Box>
  
                    {error && <Alert style={{width:'60%'}} severity="error">{error}</Alert>}
  
          </Box>
          
      </Modal>
      
     </div>
  );
  };
  
  const ClassScheduleBox=({classSchedule,setClassSchedule,setAdsNewSchedule,addNewSchedle})=>{
  
    const [day,setDay]=useState("")
    const [startTime,setStartTime]=useState(null)
    const [endTime,setEndTime]=useState(null)
  
    const daysOfTheWeek = [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" }
    ];
  
    const handleChange = (event) => {
      setDay(event.target.value);
    };
  
    const AddSchedule=()=>{
      if(day&&startTime&&endTime){
        setClassSchedule(e=>[...e,{day,startTime,endTime,id:uuidv4()}])
        setDay("")
        setStartTime(null)
        setEndTime(null)
         setAdsNewSchedule(false)
      }
  
    }
  
    const cancelAdding=()=>{
      setDay("")
      setStartTime(null)
      setEndTime(null)
      setAdsNewSchedule(false)
    }
  
  
    return(
      <Box >
         {addNewSchedle&&
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",flexDirection:"column",marginTop:"10px"}}>
               <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:0,marginLeft:4,flexWrap:'wrap'}}>
                  <Box>
                      <Typography sx={{fontSize:"13px"}}>Select Day</Typography>
                      <Select  
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={day}
                            labelColor='#cc78b2'
                            label='Select Day'
                            onChange={handleChange}
                            sx={{color:"black",m: 1, minWidth: 120}}
                            
                          >
                            {daysOfTheWeek.map((e,index)=>{
                              return <MenuItem  ket={index}value={e.value}>{e.label}</MenuItem>
                            })}
                      </Select>
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box sx={{display:'flex',justifyContent:"center",alignItems:"center",gap:"6px"}}>
                        <Box>
                            <Typography sx={{fontSize:"13px"}}>Start Time</Typography>
                            <TimePicker
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                              />
                        </Box>
                        <Box>
                            <Typography sx={{fontSize:"13px"}}>End Time</Typography>
                            <TimePicker
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                              />
                        </Box>
  
                      </Box>
                  </LocalizationProvider>
  
                </Box>
  
               <Box sx={{marginTop:"10px",marginBottom:"10px"}}>
                  <Button sx={sxStyles.button} onClick={AddSchedule}>Add</Button> &ensp; &ensp;
                  <Button sx={sxStyles.button} onClick={cancelAdding}>Cancel</Button>
               </Box>
          </Box>
         }
  
          <Box sx={{marginTop:"10px",display:"flex",justifyContent:"center",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
                {classSchedule?.map((e,index)=>{
                  return <EachSchedules setClassSchedule={setClassSchedule} data={e} key={index}/>
                })}
          </Box>
  
      </Box>
    )
  }
  
  const EachSchedules=({data,setClassSchedule})=>{
    const [day,setDay]=useState(null)
    const [startTime,setStartTime]=useState(null)
    const [endTime,setEndTime]=useState(null)
  
    useEffect(() => {
      setDay(data.day);
      setStartTime(dayjs(data.startTime));
      setEndTime(dayjs(data.endTime));
    }, [data]);
  
    const deleteSchedule=()=>{
       setClassSchedule(ele=>ele.filter(e=>{
         return e.id !== data.id
        }))
    }
    return (
      <Box sx={{border:'1px solid red',borderRadius:"10px",padding:"15px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"3px"}}>
          <Box>{day}</Box>
          <Box sx={{fontSize:"13px",opacity:0.7}}>{startTime&&startTime?.format('h:mm A')} - {endTime&&endTime?.format('h:mm A')}</Box>
          <Box><IconButton onClick={deleteSchedule}><DeleteIcon sx={{fontSize:"18px",color:"red"}}/></IconButton></Box>
      </Box>
    )
  }
  
  const sxStyles={
    container:{
      background: `linear-gradient(-20deg,${Theme.COLOR_THEME_TWO} 0%, ${Theme.COLOR_THEME_ONE} 100%)`,
      minHeight: "90vh",
      padding: "120px 40px 30px 40px",
    },
    content: {
      position: "relative",
      top: "0px",
      width: "100%",
      zIndex: 2,
      color: 'white'
    },
    typography:{
      padding:"10px 0 0 20px"
    }, 
    modal:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width:"60%",
      bgcolor: 'rgba(62, 64, 62)',
      border: '2px solid #000',
      borderRadius:"20px",
      boxShadow: 24,
      p: 4,
      color:'white',
      zIndex:10,
      height: "60vh",
      overflow:"auto",
      color: "white",
      "::-webkit-scrollbar": {
        width: "1px",
      },
      display:"flex",
      flexDirection:'column',
      alignItems:"center",
      '@media(max-width:800px)':{
        width:"80%",
      },
    },
    eachInput:{
      marginBottom:2,
      width:'60%',
      '@media(max-width:800px)':{
        width:"80%",
      },
      
    },
    button:{
      backgroundColor: "#371238",
      color: "white",
      textTransform: "inherit",
      "&:hover": {
        background: "#371238",
        //background: "#00bab4",
      },
    }
  }