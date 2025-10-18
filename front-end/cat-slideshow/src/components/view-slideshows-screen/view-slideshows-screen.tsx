import { Container, Typography, Box } from '@mui/material'
import TopNavBar from '../design-system/top-nav-bar'

function ViewSlideshowsScreen() {
  return (
    <>
      <TopNavBar />
      <Container maxWidth="lg" sx={{ padding: 4, textAlign: 'center' }}>
        <Box sx={{ marginTop: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            View Slideshows
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This page will display available slideshows. (Coming Soon)
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default ViewSlideshowsScreen
