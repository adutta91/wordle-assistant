import { forwardRef } from 'react';
import { Input } from '@mui/material';
import './CharInput.scss';

const COLOR_OPTIONS = ["black", "yellow", "green"]

const CharInput = forwardRef(({ prev, onUpdateLetter, onUpdateColor, idx, value, color, ...props }, ref) => {
  const onChange = e => {
    onUpdateLetter(e.currentTarget.value.toUpperCase(), idx)
  }

  const toggleColor = () => {
    const prevIdx = COLOR_OPTIONS.findIndex(c => c === color)
    let newIdx = prevIdx + 1
    newIdx = newIdx < COLOR_OPTIONS.length ? newIdx : 0

    onUpdateColor(COLOR_OPTIONS[newIdx], idx)
  }

  return (
    <div
      className="char-input-wrapper"
      data-idx={idx}
      onClick={() => {
        ref.current.focus()
        value && toggleColor()
      }}
    >
      <Input
        className={`char-input ${color}`}
        sx={{ width: "20px" }}
        inputProps={{ maxLength: "1", ref: ref }}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  )
})

export default CharInput;
