import { useState } from 'react';
import { Dialog, Grid, Box } from '@mui/material';
import './ColorPicker.scss';

const colorOptions = [
  {
    value: 'black',
    background: "#e9e9e9"
  },
  {
    value: 'green',
    background: "#6ae168"
  },
  {
    value: 'yellow',
    background: "#fdff7e"
  }
]

const ColorPicker = ({ setColor, ...props }) => {
  return (
    <Dialog
      className="color-picker"
      {...props}
    >
      <Box sx={{
        padding: "0 40px 20px"
      }}>
        <h3>Choose a color:</h3>
        <div className="colors">
          {colorOptions.map(color => (
            <div
              key={color.value}
              className="color-option"
              onClick={() => setColor(color.value)}
              style={{ background: color.background }}
            />
          ))}
        </div>
      </Box>
    </Dialog>
  )
}

export default ColorPicker;
