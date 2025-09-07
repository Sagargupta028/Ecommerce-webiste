import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../State/Product/Action'

const RecentlyAddeddProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
    
    useEffect(() => {
        dispatch(findProducts({
            category: "",
            colors: [],
            sizes: [],
            minPrice: 0,
            maxPrice: 10000,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: 0,
            pageSize: 10,
            stock: ""
        }));
    }, [dispatch]);

    const recentProducts = products.products?.content?.slice(0, 5) || [];

    return (
        <Card>
            <CardHeader
                title='Recently Added Products'
                sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                action={<Typography onClick={()=>navigate("/admin/products")} variant='caption' sx={{color:"blue",cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
                titleTypographyProps={{
                    variant: 'h5',
                    sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                }}
            />
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentProducts.map(product => (
                            <TableRow hover key={product._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell> 
                                    <Avatar alt={product.title} src={product.imageUrl} />
                                </TableCell>
                                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                                            {product.title}
                                        </Typography>
                                        <Typography variant='caption'>{product.brand}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{product.category?.name || "N/A"}</TableCell>
                                <TableCell>₹{product.discountedPrice}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default RecentlyAddeddProducts