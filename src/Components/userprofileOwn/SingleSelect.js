import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserContext } from '../../context/UserContext'
import { updateJobSlot, updateOwnProject } from '../../helpers/apiCalls'

function SingleSelect({jobName, setJobName, data, setData,}) {
  const { jobs, setJobs } = useContext(UserContext)
  const [jobData, setJobData] = useState({})

  const handleChange = (e) => {
    setJobName(e.target.value);
  };

  const onInput = (e) => {
    setJobData({ 
      ...jobData, 
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await updateOwnProject(data._id, jobData)
        setData(res)
        console.log(jobData);
    } catch(error) {
        console.log(error)
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Jobs</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={jobs.title}
          name="jobId"
          label="job"
          onChange={onInput}
        >
          {jobs.map((job, i) => 
          <MenuItem key={i} value={job._id} >
          {job.title}</ MenuItem >)}
          </Select>

          <textarea
                name="description"
                type="text"
                onChange={(e) => onInput(e) }
                rows="2" 
                cols="8"
                required
                placeholder="Detailed description of the required role"
          ></textarea>
         <input type="submit" value="Add & Update" className="button-grid-2fr grid-col-2" onClick={handleSubmit} />
      </FormControl>
    </Box>
  );
}

export default SingleSelect
