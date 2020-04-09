import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import { palette } from "@material-ui/system";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// For Radio Components
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function SimpleSelect(props) {
  const classes = useStyles();
  // console.log("Property: " + props.teams["data"]);
  // console.log(typeof props.teams);
  const [week, setWeek] = React.useState("");
  const [team, setTeam] = React.useState("");

  const handleWeekChange = (event) => {
    setWeek(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  //   Radio
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Record all attended
  const handleAllAttended = (event) => {
    setSelectedValue(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        All attended
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Save
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Successfully saved!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <div className="teamMember">
        <Title>Daniel</Title>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="attended"
              control={<Radio color="primary" />}
              label="attended"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="absent unexcused"
              control={<Radio color="secondary" />}
              label="absent unexcused"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="excused"
              control={<Radio color="default" />}
              label="excused"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Title>Zion</Title>{" "}
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="attended"
              control={<Radio color="primary" />}
              label="attended"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="absent unexcused"
              control={<Radio color="secondary" />}
              label="absent unexcused"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="excused"
              control={<Radio color="default" />}
              label="excused"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Title>Abraham</Title>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="attended"
              control={<Radio color="primary" />}
              label="attended"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="absent unexcused"
              control={<Radio color="secondary" />}
              label="absent unexcused"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="excused"
              control={<Radio color="default" />}
              label="excused"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Title>Patrick</Title>{" "}
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="attended"
              control={<Radio color="primary" />}
              label="attended"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="absent unexcused"
              control={<Radio color="secondary" />}
              label="absent unexcused"
              labelPlacement="start"
            />{" "}
            <FormControlLabel
              value="excused"
              control={<Radio color="default" />}
              label="excused"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}
