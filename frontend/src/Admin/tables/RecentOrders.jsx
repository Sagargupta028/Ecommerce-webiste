import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../State/Admin/Orders/Action'

const RecentOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store);
    
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getOrders({ jwt, sort: "newest" }));
        }
    }, [dispatch]);

    const recentOrders = adminOrder.orders?.slice(0, 5) || [];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'placed': return 'secondary';
            case 'confirmed': return 'info';
            case 'shipped': return 'warning';
            case 'delivered': return 'success';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    return (
        <Card>
            <CardHeader
                title='Recent Orders'
                sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                action={<Typography onClick={()=>navigate("/admin/orders")} variant='caption' sx={{color:"blue",cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
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
                            <TableCell>Total Price</TableCell>
                            <TableCell>Order Id</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentOrders.map((order) => (
                            <TableRow hover key={order._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell> 
                                    <Avatar alt={order.orderItems?.[0]?.product?.title} src={order.orderItems?.[0]?.product?.imageUrl}>
                                        {order.orderItems?.[0]?.product?.title?.charAt(0)}
                                    </Avatar> 
                                </TableCell>
                                <TableCell>₹{order.totalPrice}</TableCell>
                                <TableCell>#{order._id.slice(-6)}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={order.orderStatus || 'PLACED'} 
                                        size='small' 
                                        color={getStatusColor(order.orderStatus)}
                                        sx={{color:"white"}}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default RecentOrders