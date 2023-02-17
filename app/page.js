"use client"

import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';
import { useState } from "react";
import ChipInput from 'material-ui-chip-input';
import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

const categoryOptions = [
  {value: 'chair', label: "Chair"}, 
  {value: 'table', label: "Table"}, 
  {value: 'cupboard', label: "Cupboard"}, 
  {value: 'sofa', label: "Sofa"},
];

export default function Home() {

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('')
  const handleChange = file => {
    setFile(file);
  };

  return (
    <Box
      m={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
     
    <Grid 
      container
      spacing={4}
      sx={{
        marginTop: 8,
        pt: 2, pb: 2,
        mt: 2, mb: 2,
        width: {
          xs: 9/10,
          sm: 7/10,
          md: 1/2,
          lg: 1/2,
          xl: 1/2,
        },
      }}
    >
        <Grid item xs={12} sm={12} md={12}>
          <h1 style={{textAlign: 'center'}}>Add Category</h1>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <TextField 
            id="product_name" 
            label="Name of Product" 
            variant="outlined"
            inputProps={{
              style: {
                height: "23px",
              },
            }}
            fullWidth 
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <TextField
            id="category"
            label="Category"
            select
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            value={category}
            fullWidth 
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <TextField
            id="price"
            label="Price"
            type="number"
            fullWidth
          />
        </Grid>




        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <DropzoneArea 
              onChange={(file)=> {
                console.log("Successful upload, File: ", file)
              }}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              dropzoneText={"Drag and drop or browse"}
            />
          </Box>

        </Grid>


        <Grid item xs={12} sm={12} md={12}>
          <ChipInput
            defaultValue={[]}
            fullWidth
            label='tags'
            placeholder='Enter some tags'
            variant="outlined" 
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="multiline-description"
            label="Description"
            multiline
            rows={4}
            fullWidth
          />
        </Grid>

        
        <Grid item 
          xs={12} sm={12} md={12} 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="outlined" href="/">
            Clear
          </Button>

          <Button variant="contained" color="success" href="/">
            Submit
          </Button>
        </Grid>
        
      </Grid>    
    </Box>
  )
}
