import { Box, Chip } from '@mui/material';

const Solutions = ({ solutions }) => {
  if (!solutions.length) return null

  return (
    <>
      <h3>Potential solutions (total: {solutions.length}):</h3>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        {solutions.slice(0, 100).map(solution => (
          <Chip
            sx={{ margin: "5px"}}
            key={solution}
            label={solution}
            variant="outlined"
          />
        ))}
      </Box>
    </>
  )
}

export default Solutions;
