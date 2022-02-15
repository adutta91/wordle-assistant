import { forwardRef } from 'react';
import { Input } from '@mui/material';
import './CharInput.scss';

const CharInput = forwardRef((props, ref) => (
  <Input className="char-input" sx={{ width: "20px" }} inputProps={{ maxLength: "1", ref: ref }} {...props} />
))

export default CharInput;
