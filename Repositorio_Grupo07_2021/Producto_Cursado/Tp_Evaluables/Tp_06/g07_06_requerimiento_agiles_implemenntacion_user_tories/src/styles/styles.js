import { createStyles, makeStyles } from "@material-ui/core";

import { colorInstitucional } from "../utils/constants";

const useStyles = makeStyles((theme) =>
  createStyles({
    tableHead: {
      textAlign: "left",
      justifyContent: "left",
      fontWeight: 700,
      fontSize: "1.25em",
      [theme.breakpoints.between(0, 700)]: {
        fontSize: "4.5vw",
      },
    },
    tableHeadCampoDinamico: {
      textAlign: "left",
      justifyContent: "left",
      fontWeight: 500,
      fontSize: "0.85em",
      marginLeft: "1em",
      marginBottom: 0,
      marginTop: "0.5em",
    },
    tableBody: {
      alignSelf: "center",
      textAlign: "right",
      lineHeight: "1.3em",
      [theme.breakpoints.between(0, 700)]: {
        fontSize: "4vw",
      },
    },
    tableBodyCampoDinamico: {
      fontWeight: 400,
      fontSize: "0.85em",
    },
    tableRow: {
      //marginBottom: "1em",
      fontFamily: "Maven Pro",
      fontSize: "1.2em",
      textTransform: "none",
      //padding: "1em 2.25em",
      padding: "0.75em 4em",
      [theme.breakpoints.down(700)]: {
        padding: "2vw 6vw",
        fontSize: "5vw",
      },
    },
    tableRowPadding: {
      padding: "2em 4em",
      [theme.breakpoints.down(700)]: {
        padding: "4vw 6vw",
      },
    },
    buttonReq: {
      backgroundColor: "white",
      borderRadius: "3em",
      width: "27em",
      height: "15em",
      boxShadow: "0 0.3em 0.6em rgb(0,0,0,0.2)",
      padding: 0,
      marginBottom: "2em",
      [theme.breakpoints.down(700)]: {
        borderRadius: "7vw",
        width: "90vw",
        height: "40vw",
        marginBottom: "4vw",
        boxShadow: "0 0.5vw 1vw rgb(0,0,0,0.2)",
      },
    },
    detalleContainter: {
      borderRadius: "3em",
      //boxShadow: "0 0.3em 0.6em rgb(0,0,0,0.2)",
      boxShadow: "0 0 4em rgb(0,0,0,0.1)",
      padding: 0,
      backgroundColor: "white",
    },
    cardHeader: {
      borderRadius: "3em 3em 0 0",
      padding: "1.25em 2.25em 1.25em 2.25em",
      lineHeight: "normal",
      [theme.breakpoints.down(700)]: {
        borderRadius: "7vw 7vw 0 0",
        padding: "3vw 5vw",
      },
    },
    labelTitle: {
      fontFamily: "Maven Pro",
      fontWeight: 500,
      fontSize: "1.5em",
      [theme.breakpoints.between(0, 700)]: {
        fontSize: "4vw",
        marginBottom: "3vw",
      },
    },
    option: {
      fontFamily: "Maven Pro",
      fontWeight: 500,
      fontSize: "1.25em",
      textDecoration: "underline",
      cursor: "pointer",
      margin: "1.5em 0",
      [theme.breakpoints.between(0, 700)]: {
        fontSize: "4vw",
        margin: "6vw 0",
      },
    },
    containter: {
      padding: "0 !important",
    },
    containerGrid: {
      margin: "0 !important",
    },
    item: {
      padding: "1em !important",
      [theme.breakpoints.between(0, 700)]: {
        padding: "2vw !important",
      },
    },
    containterList: {
      height: "20em",
      borderRadius: "1.5em",
      backgroundColor: "white",
      overflowY: "scroll",
      border: "1.5em solid white",
      boxShadow: "0 0 2em rgba(0,0,0,0.1)",
      marginTop: "1.5em",
      [theme.breakpoints.down(700)]: {
        border: "2vw solid white",
        boxShadow: "0 0 5vw rgba(0, 0, 0, 0.1)",
      },
    },
    listContainter: {
      //border: "1px solid lightgray",
      borderRadius: "1.5em",
      marginTop: "1em",
    },
    listItem: {
      display: "block",
      [theme.breakpoints.down(700)]: {
        fontSize: "4vw",
        //padding: 0,
      },
    },
    outlined: { borderRadius: "2em" },
    icon: {
      backgroundColor: "white",
      height: "0.8em",
      width: "0.8em",
      boxShadow: "0 0 1em rgb(0, 0, 0, 0.1)",
      borderRadius: "0.25em",
      "input:hover ~ &": {
        boxShadow: "0 0.05em 0.25em rgb(0, 0, 0, 0.3)",
      },
    },
    checkedIcon: {
      backgroundColor: colorInstitucional,
      boxShadow: "0 0 1em rgb(0, 0, 0, 0.1)",
    },
    check: {
      color: "white",
      height: "auto",
      width: "0.8em",
      position: "relative",
      verticalAlign: "top",
    },
    input: {
      display: "none",
    },
    buttonMaps: {
      //border: "1px solid lightgray",
      boxShadow: "0 0 2em rgb(0, 0, 0, 0.1)",
      backgroundColor: "white",
      cursor: "pointer",
      borderRadius: "50%",
      height: "3em",
      width: "3em",
      justifyContent: "center",
      backgroundSize: "2em 2em",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    fileLogo: {
      width: "auto",
      height: "1.75em",
      display: "inline-block",
      marginLeft: "0.2em",
    },
    dropbox: {
      height: "15em",
      backgroundColor: "white",
      borderRadius: "1.5em",
      //border: "1px solid lightgray",
      boxShadow: "0 0 2em rgba(0,0,0,0.1)",
      padding: "1em",
    },
    listItemText: {
      fontFamily: "unset",
      fontWeight: 500,
    },
    popoverUser: {
      borderRadius: "1em",
      boxShadow: "0 0 1em rgba(0,0,0,0.1)",
    },
    nameUserPopover: {
      opacity: "1 !important",
      color: "black",
      fontWeight: 500,
    },
  })
);

export { useStyles };
