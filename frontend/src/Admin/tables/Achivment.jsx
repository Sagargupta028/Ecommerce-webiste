// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import trophy from "../../images/trophy-icn.png"
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardAnalytics } from '../../State/Analytics/Action'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})



const Achivement = () => {
  const theme = useTheme()
  const dispatch = useDispatch();
  const { analytics } = useSelector(store => store);
  
  useEffect(() => {
    dispatch(getDashboardAnalytics());
  }, [dispatch]);

  const data = analytics.analytics;
  const totalSalesAmount = data?.totalRevenue || 0;
  
  // Format the total sales amount
  const formatSales = (num) => {
    if (num >= 1000000) {
      return `₹${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)}k`;
    }
    return `₹${num}`;
  };

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6' sx={{ letterSpacing: '0.25px' }}>
          Shop With Zosh
        </Typography>
        <Typography variant='body2'>Congratulations 🥳</Typography>
        
        <Typography variant='h5' sx={{ my: 3.1, color: 'primary.main' }}>
          {formatSales(totalSalesAmount)}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Total Sales All Time
        </Typography>
        {/* <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} /> */}
        <TrophyImg alt='trophy' src={trophy} />
      </CardContent>
    </Card>
  )
}

export default Achivement;