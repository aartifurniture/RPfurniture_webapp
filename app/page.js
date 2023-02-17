"use client"

import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Grid from '@mui/material/Grid';
import axios, { Axios } from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import app from './firebase';
import Button from '@mui/material/Button';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from "react";
import ChipInput from 'material-ui-chip-input';
import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

const categoryOptions = [
  {value: 'chair', label: "Chair"}, 
  {value: 'table', label: "Table"}, 
  {value: 'cupboard', label: "Cupboard"}, 
  {value: 'sofa', label: "Sofa"},
];

const db = getFirestore(app);

export default function Home() {
  const [name, setname] = useState("");
  const [categ, setcateg] = useState("");
  const [imageSelected, setimageSelected] = React.useState([]);
  const [quant,setquant] = useState();
  const [price, setprice] = useState();
  const [tag, settag] = useState([]);
  const [desc, setdesc] = useState("");
  const [publicid, setpublicid] = useState();
  const [version, setversion] = useState();

  const handleAddChip = (event) => {
    if (event.key === 'Enter') {
      const newChip = event.target.value.trim();
      if (newChip) {
        settag((prevChips) => [...prevChips, newChip]);
        event.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("file",imageSelected);
    formdata.append("upload_preset", "rp_furniture1");
    console.log(formdata);
    try {
          await axios.post("https://api.cloudinary.com/v1_1/dtlv6lk0i/image/upload", formdata).then((response)=>{
            console.log(response);
            const pb = response.data.public_id;
            const vr = response.data.version;
            setpublicid(...publicid, ...pb);
            console.log(publicid);
            setversion(...version, ...vr);
            console.log(version);
          }); 
    } catch (error) {
      console.log(error);
    }

    console.log("Product Name: ",name);
    console.log("Category",categ);
    console.log("Quantity",quant);
    console.log("Public ID: ", publicid);
    console.log("Version No: ",version);
    console.log("Price: ",price);
    console.log("Tags: ",tag);
    console.log("Dsc: ",desc);

    const docRef = await addDoc(collection(db,"catalog"), {
      productname: name,
      category: categ,
      public_id_img:publicid,
      version_img: version,
      quantity: quant,
      price:price,
      tag:tag,
      description:desc,
    }).then(() => {
      alert('Catalog has been added.');
      console.log("Document uploaded with ID: ",docRef.id)
    }).catch(error => {
      alert(error.message);
    });
  }

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
          <h1 style={{textAlign: 'center'}}>Add Catalog</h1>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <TextField 
            value={name}
            onChange={(e)=>{
              setname(e.target.value);
            }}
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
            value={categ}
            onChange={(e)=>{
              setcateg(e.target.value);
            }}
            id="category"
            label="Category"
            select
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
            value={quant}
            onChange={(e)=>{
              setquant(e.target.value);
            }}
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <TextField
            value={price}
            onChange={(e)=>{
              setprice(e.target.value);
            }}
            id="price"
            label="Price"
            type="number"
            fullWidth
          />
        </Grid>




        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <DropzoneArea 
              multiple={true}
              onChange={(event)=>{
                setimageSelected(...event);
              }}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              dropzoneText={"Drag and drop or browse"}
            />
          </Box>

        </Grid>


        <Grid item xs={12} sm={12} md={12}>
          <ChipInput
            onKeyPress={handleAddChip}
            // multiple={true}
            defaultValue={[]}
            fullWidth
            label='tags'
            placeholder='Enter some tags'
            variant="outlined" 
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            value={desc}
            onChange={(e)=>{
              setdesc(e.target.value);
            }}
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

          <Button onClick={handleSubmit} variant="contained" color="success" href="/">
            Submit
          </Button>
        </Grid>
        
      </Grid>    
    </Box>
  )
}
