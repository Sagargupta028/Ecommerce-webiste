import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../State/Order/Action'
import { useNavigate } from 'react-router-dom'
import { fetchAddressUser } from '../../../State/Auth/Action'


const DeliveryAddressForm = ({handleNext}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedAddress, setSelectedAdress] = useState(null);
    const {order}=useSelector(store=>store)
    // const { auth, user } = useSelector((store) => store);
  
    const { auth, userAddress } = useSelector((store) => store);
    // console.log('auth', auth.user);

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const address = {
            firstName:data.get("firstName"),
            lastName:data.get("lastName"),
            streetAddress:data.get("address"),
            city:data.get("city"),
            state:data.get("state"),
            zipCode:data.get("zip"),
            mobile:data.get("phoneNumber")
        }  
        const orderData = {address,navigate}
        dispatch(createOrder(orderData))
        console.log("address", address);
        handleNext();
         
    }

    useEffect(() => {
        if (auth?.user?.email) {
          dispatch(fetchAddressUser(auth.user.email)); // Fetch user address on mount
        }
      }, [dispatch, auth?.user?.email]);

      const handleCreateOrder = (item) => {
    dispatch(createOrder({ address: item, navigate }));
    handleNext();
  };
  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12} lg={5} className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll">
        {  auth?.user?.data?.address?.map((item)=>(
            <div onClick={()=> setSelectedAdress(item)} className="p-5 py-7 border-b cursor-pointer">
                <AddressCard address={item}/>
                {selectedAddress?._id === item._id && (
                <Button sx={{mt:2, bgcolor:"RGB(145 85 253)"}} size='large' variant='contained' onClick={()=>handleCreateOrder(item)}>Deliver Here</Button>
                )}
            </div>
        ))}
        </Grid>
        <Grid item xs={12} lg={7}>
            <Box className="border rounded-s-md shadow-md p-5">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='firstName'
                                name='firstName'
                                label="First Name"
                                fullWidth
                                autoComplete='given-name'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='lastName'
                                name='lastName'
                                label="Last Name"
                                fullWidth
                                autoComplete='family-name'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='address'
                                name='address'
                                label="Address"
                                fullWidth
                                autoComplete='street-address'
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='city'
                                name='city'
                                label="City"
                                fullWidth
                                autoComplete='address-level2'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='state'
                                name='state'
                                label="State/Province/Region"
                                fullWidth
                                autoComplete='address-level1'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='zip'
                                name='zip'
                                label="Zip/Postal Code"
                                fullWidth
                                autoComplete='shipping postal-code'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='phoneNumber'
                                name='phoneNumber'
                                label="Phone Number"
                                fullWidth
                                autoComplete='tel'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button sx={{py:1.5, mt:2, bgcolor:"RGB(145 85 253)"}} size='large' variant='contained' type='submit'>Deliver Here</Button>
                        </Grid>
                        

                    </Grid>
                </form>
            </Box>
        </Grid>

      </Grid>
    </div>
  )
}

export default DeliveryAddressForm
