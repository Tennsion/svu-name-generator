import React, { useState } from 'react'
import {  Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
// import { makeStyles } from '@mui/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/system';

import knightLast from './data/knightLast.json'
import knightFirst from './data/knightFirst.json'
import monthsList from '../data/monthsList.json'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function NameGen({closeFunction}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastName, setLastName] = useState("")
  const [birthMonth, setBirthMonth] = useState("JAN")
  const [knightName, setKnightName] = useState("")
  const [gender, setGender] = useState("DTS") 

  function getFirstPart() {
    const firstLetter = lastName.substring(0,1).toUpperCase()
    console.log(firstLetter)
    const firstPart = knightFirst[firstLetter]
    return firstPart
  }

  function getLastPart() {
    const lastPart = knightLast[birthMonth.toUpperCase()]
    return lastPart
  }

  function getTitle(){
    if(gender === 'M'){
      return "Your Hero Name is "
    } else if (gender === "F"){
      return "Your Villain name is "
    } else {
      return "Your other name is "
    }
  } 

  function getNewName() {
    const firstPart = getFirstPart()
    const lastPart = getLastPart()
    const title = getTitle()
    setKnightName(title + "\n" + lastPart + " with the power of " + firstPart )
    setCurrentPage(2)
  }
   


  return (
    <>
    <Grid container  spacing={0}>
        <Grid item xs={12}>
          <Box sx={style}>
          <Box textAlign="right" alignContent="end">
              <IconButton onClick={closeFunction}  >
                  <CancelIcon sx={{color:"blue"}} fontSize='large'/>
              </IconButton>
            </Box>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Superhero Name
            </Typography>
            <Divider/>
            {(currentPage === 1) ? (
              <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Find out your superhero name and power
              </Typography>
              <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '45ch' },
                }}
                noValidate
                autoComplete="off"
                >

                <FormControl component="fieldset">
                  <FormLabel component="legend">Destiny</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="M" onChange={e => setGender(e.target.value)} control={<Radio />} label="Hero" />
                    <FormControlLabel value="F" onChange={e => setGender(e.target.value)} control={<Radio />} label="Villain" />
                   
                  </RadioGroup>
                </FormControl>


                <TextField value={lastName} onChange={e => setLastName(e.target.value)} id="first-name" label="First Name" variant="outlined" />

                <FormControl>
                      <InputLabel htmlFor="birthMonth">Birth Month</InputLabel>
                      <Select
                      
                      native
                      value={birthMonth}
                      onChange={e => setBirthMonth(e.target.value)}
                      inputProps={{
                          name: 'birthMonth',
                          id: 'birthMonth',
                      }}
                      >
                        {monthsList.map((option) => (
                            <option key={option.value} value={option.value}  >
                            {option.label}
                            </option>
                        ))}

                      </Select>
                  </FormControl>
                
                
                <Button onClick={getNewName} variant="outlined">Get Your Hero Name</Button>
              </Box>
              </>  
            ) : (
              <>
                <Typography id="modal-modal-title" variant="h3" component="h2" sx={{marginTop:"1em"}}>
                  {knightName}
                </Typography>
              </>
              
            )}
          </Box>
        </Grid>
    </Grid> 
    </>
  )
}

export default NameGen