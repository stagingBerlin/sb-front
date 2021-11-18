import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({jobs, inputJob, handleChangeJob}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Jobs</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputJob}
          label="Job"
          onChange={handleChangeJob}
        >
        {jobs.map((job, i) => 
          <MenuItem key={i} value={job._id} >
          {job.title}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}