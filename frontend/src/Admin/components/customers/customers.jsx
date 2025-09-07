// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader, Pagination, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomers, deleteCustomer } from '../../../State/Customer/Action'

const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant',
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer',
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist',
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative',
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it',
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]



const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((store) => store.customers);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomer(customerId));
    }
  };

  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }
  return (
    <Box>
         <Card>
      <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
        />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                  Loading customers...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : customers && customers.length > 0 ? (
              customers.map((customer, index) => (
                <TableRow hover key={customer._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{customer._id}</TableCell>
                  <TableCell> 
                    <Avatar alt={`${customer.firstName} ${customer.lastName}`} src={customer.profileImage || ""}>
                      {customer.firstName?.charAt(0)}
                    </Avatar> 
                  </TableCell>
                  <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      onClick={() => handleDeleteCustomer(customer._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </Box>
   
  )
}

export default Customers;
