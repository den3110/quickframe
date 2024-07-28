import { Checkbox, FormControlLabel } from "@mui/material";

export function RHFCheckbox({ name, ...other }) {
  
    return (
      <FormControlLabel
        control={
         <Checkbox {...field} checked={field.value} />}
        {...other}
      />
    );
  }
  