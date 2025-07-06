import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Restore as RestoreIcon } from "@mui/icons-material";
import toast from "react-hot-toast";

export default function ResetDataButton() {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    localStorage.removeItem("car-assessment-data");

    // Reload page to reset MSW
    window.location.reload();

    toast.success("Data reset to original mock data!");
  };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        startIcon={<RestoreIcon />}
        onClick={() => setOpen(true)}
        sx={{ ml: 1 }}
      >
        Reset Data
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Reset Mock Data</DialogTitle>
        <DialogContent>
          <Typography>
            This will remove all added cars and reset to the original mock data.
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleReset} color="error" variant="contained">
            Reset Data
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
