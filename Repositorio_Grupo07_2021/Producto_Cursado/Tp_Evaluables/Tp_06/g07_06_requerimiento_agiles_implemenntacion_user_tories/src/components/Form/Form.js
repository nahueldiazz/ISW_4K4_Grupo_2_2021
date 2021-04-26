import React, { useState, useRef, useEffect } from "react";
import {
  Snackbar,
  Select,
  FormControl,
  MobileStepper,
  CardContent,
  Card,
  createStyles,
  InputAdornment,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  CircularProgress,
  FormHelperText,
  IconButton,
  TextField,
  Grid,
  Container,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  makeStyles,
  Typography,
  Grow,
} from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";
import clsx from "clsx";
import DateFnsUtils from "@date-io/date-fns";
import { es } from "date-fns/esm/locale";
import moment from "moment";
import SwipeableViews from "react-swipeable-views";
import { Heading, SlideFade, ScaleFade } from "@chakra-ui/react";
import { getOnlyNumbers, getOnlyLetters, getOnlyNumbers2 } from "../../utils";
import MapsIcon from "../../assets/maps-icon-min.png";
import GoogleMaps from "../google-maps";
import "./Form.scss";
import Lottie from "react-lottie";
import DoneLottie from "../../assets/lotties/done.json";
import DeliveryLottie from "../../assets/lotties/delivery.json";
import LoadingLottie from "../../assets/lotties/loading2.json";
//import PedidoLogo from "../../assets/pedido-logo.jpg";
import PedidoLogo from "../../assets/pedido-logo-b.png";
//import PedidoLogo from "../../assets/pedido-logo-covid.jpg";

moment.locale("es");

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "3em",
      boxShadow: "0 0 3em rgb(0 0 0 / 15%)",
      borderRadius: "2em",
      padding: "1em",
      [theme.breakpoints.down(700)]: {
        margin: "8vw",
        padding: "2vw",
        boxShadow: "0 0 10vw rgb(0 0 0 / 15%)",
      },
    },
    appBar: {
      backgroundColor: "#4299E1",
      //boxShadow: "0 0 1em rgb(0 0 0 / 15%)",
    },
    mobileStepper: {
      borderTop: "1px solid lightgray",
      //boxShadow: "0 0 0.5em rgb(0 0 0 / 15%)",
      [theme.breakpoints.down(700)]: {
        //boxShadow: "0 0 10vw rgb(0 0 0 / 15%)",
      },
    },
    mobileStepperProgress: {
      [theme.breakpoints.down(700)]: {
        width: "30%",
      },
    },
    dialog: { borderRadius: "1em" },
    button: { fontWeight: 600, color: "black" },
    dialogMaps: {
      textAlign: "center",
      borderRadius: "2em",
      padding: "2em",
      height: "70%",
      width: "100%",
      [theme.breakpoints.between(0, 700)]: {
        width: "80vw",
        margin: "0 0 0 0",
        padding: "1vw",
        minHeight: "90%",
        borderRadius: "4vw",
      },
    },
    buttonMaps: {
      border: "1px solid lightgray",
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
    root: {
      "&:hover": {
        backgroundColor: "transparent",
      },
      justifyContent: "center",
    },
    icon: {
      borderRadius: "50%",
      width: 16,
      height: 16,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      "$root.Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    },
    checkedIcon: {
      backgroundColor: "#137cbd",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: "#106ba3",
      },
    },
  })
);

function StyledRadio(props) {
  const classes = useStyles();
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export const MyForm = () => {
  const submitButton = useRef();
  const classes = useStyles();

  // PEDIDO
  const [pedido, setPedido] = useState("");
  const [adjuntos, setAdjuntos] = useState([]);
  const [errorPedido, setErrorPedido] = useState(true);
  const [errorPedidoDescripcion, setErrorPedidoDescripcion] = useState(false);
  const maxCapacity = 1;
  // ------

  // COMERCIO
  const [calleComercio, setCalleComercio] = useState("");
  const [numeroComercio, setNumeroComercio] = useState("");
  const [ciudadComercio, setCiudadComercio] = useState("");
  const [referenciaComercio, setReferenciaComercio] = useState("");
  const [datosDomicilioMaps, setDatosDomicilioMaps] = useState("");
  const [errorComercio, setErrorComercio] = useState(true);
  const [openDialogMaps, setOpenDialogMaps] = useState(false);
  const [ubicacionPorMaps, setUbicacionPorMaps] = useState(false);
  const [errorCalleComercio, setErrorCalleComercio] = useState(false);
  const [errorNumeroComercio, setErrorNumeroComercio] = useState(false);

  useEffect(() => {
    if (datosDomicilioMaps.length) {
      setUbicacionPorMaps(true);
      let direccion = datosDomicilioMaps.split(",")[0];
    }
  }, [datosDomicilioMaps]);
  // --------

  // ENTREGA
  const [calleEntrega, setCalleEntrega] = useState("");
  const [numeroEntrega, setNumeroEntrega] = useState("");
  const [ciudadEntrega, setCiudadEntrega] = useState("");
  const [referenciaEntrega, setReferenciaEntrega] = useState("");
  const [metodoEntrega, setMetodoEntrega] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState(new Date());
  const [errorCalleEntrega, setErrorCalleEntrega] = useState(false);
  const [errorNumeroEntrega, setErrorNumeroEntrega] = useState(false);
  const [errorFechaEntrega, setErrorFechaEntrega] = useState(false);
  const [errorEntrega, setErrorEntrega] = useState(true);
  // -------

  // PAGO
  const [metodoPago, setMetodoPago] = useState("");
  const [nroTarjeta, setNroTarjeta] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [apellidoTitular, setApellidoTitular] = useState("");
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState("");
  const [cvcTarjeta, setCVCTarjeta] = useState("");
  const [montoEfectivo, setMontoEfectivo] = useState(0);
  const [errorMontoEfectivo, setErrorMontoEfectivo] = useState(false);
  const [errorNumeroTarjeta, setErrorNumeroTarjeta] = useState(false);
  const [errorCVC, setErrorCVC] = useState(false);
  const [errorFechaTarjeta, setErrorFechaTarjeta] = useState(false);
  const [errorNombreTitular, setErrorNombreTitular] = useState(false);
  const [errorApellidoTitular, setErrorApellidoTitular] = useState(false);
  const [errorPago, setErrorPago] = useState(false);
  // ----

  //Monto a pagar
  const [montoAPagar, setMontoAPagar] = useState(500);

  const [ciudades, setCiudades] = useState("");

  const [nombreImagen, setNombreImagen] = useState("");

  const [mensajeErrorSnack, setMensajeErrorSnack] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  // DIALOGS
  const [openDialogConfirmar, setOpenDialogConfirmar] = useState(false);
  const [openDialogExito, setOpenDialogExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  // -------

  const ciudadesSel = [
    {
      value: "Córdoba",
      label: "Córdoba",
    },
    {
      value: "Carlos Paz",
      label: "Carlos Paz",
    },
    {
      value: "Jesús Maria",
      label: "Jesus Maria",
    },
    {
      value: "Cosquín",
      label: "Cosquín",
    },
  ];

  const handleCapture = (e) => {
    var fileInput = document.getElementById("file");

    let adjuntosAntes = Array.from(adjuntos);
    let archivos = [];
    archivos.push(adjuntosAntes);

    let files = Array.from(e.target.files);
    //archivos.push(files);

    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg)$/i;

    if (archivos.length <= 5) {
      files.forEach((archivo) => {
        if (allowedExtensions.exec(archivo.name)) {
          archivos.push(archivo);
        } else {
          alert("Pueden ser 5 archivos como máximo");
          return;
        }
      });
    } else {
      alert("Pueden ser 5 archivos como máximo");
      return;
    }
    setAdjuntos(archivos);

    if (allowedExtensions.exec(filePath)) {
      if (archivos.length <= 5) {
        setAdjuntos(archivos);
      } else {
        alert("Pueden ser 5 archivos como máximo");
        return;
      }
    } else {
      alert("No es un tipo de imagen .jpg");
      return;
    }

    /*if (!allowedExtensions.exec(filePath)) {
              alert("No es un tipo de imagen .jpg");
              //fileInput.value = "";
              return;
            } else {
              let reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
        
              reader.onload = () => {
                let preview = document.getElementById("preview");
                preview.src = reader.result;
              };
              setNombreImagen(filePath);
            }*/
  };

  const handleFiles = (event) => {
    let selectedFilesBefore = [];
    let fileArray = [];
    let acceptedFiles = [];
    var fileInput = document.getElementById("file");
    var filePath = fileInput.value;

    let incomingFiles = Array.from(event.target.files);

    // Si habia archivos antes, los agrego

    if (adjuntos.length > 0) {
      selectedFilesBefore = selectedFilesBefore.concat(adjuntos);
    }

    if (selectedFilesBefore.length > 0) {
      fileArray = fileArray.concat(selectedFilesBefore);
    }

    acceptedFiles = incomingFiles.filter((incomingFile) => {
      for (let index = 0; index < selectedFilesBefore.length; index++) {
        if (selectedFilesBefore[index].name !== incomingFile.name) {
          return true;
        } else {
          setOpenSnackbar(true);
          setMensajeErrorSnack("Ya se cargó el archivo seleccionado");
          return false;
        }
      }
      return true;
    });

    if (adjuntos.length < maxCapacity) {
      // No tengo archivos o tengo menos del maximo de archivos permitidos
      let cantidadPermitida = maxCapacity - adjuntos.length;
      if (acceptedFiles.length <= cantidadPermitida) {
        // Puedo seguir subiendo archivos
        for (let index = 0; index < acceptedFiles.length; index++) {
          // Por cada archivo
          if (acceptedFiles[index].name.includes("jpg")) {
            // ARCHIVO CON FORMATO VALIDO (JPG)
            if (acceptedFiles[index].size <= 5242880) {
              // SI EL ARCHIVO ES MENOR A 5 MB
              // TODO OK
              fileArray.push(acceptedFiles[index]);
              setAdjuntos(fileArray);
              let reader = new FileReader();
              reader.readAsDataURL(event.target.files[0]);

              reader.onload = () => {
                let preview = document.getElementById("preview");
                preview.src = reader.result;
              };
              setNombreImagen(filePath);
            } else {
              // ARCHIVO MUY PESADO
              setOpenSnackbar(true);
              setMensajeErrorSnack("El archivo debe pesar menos de 5 MB");
            }
          } else {
            // ARCHIVO CON FORMATO INVALIDO
            setOpenSnackbar(true);
            setMensajeErrorSnack("El archivo debe ser Imagen (.jpg)");
            //alert("El archivo debe ser Imagen y/o PDF");
          }
          //setSelectedFiles(fileArray);
          //setOnHover(listaHovers);
        }
      } else {
        setOpenSnackbar(true);
        setMensajeErrorSnack("Puede subir hasta un máximo de 5 archivos");
        //alert("Puede subir hasta un máximo de 5 archivos");
      }
    } else {
      // Limite de archivos alcanzado
      setOpenSnackbar(true);
      setMensajeErrorSnack("Usted ha llegado al límite de archivos");
      //alert("Usted ha llegado al límite de archivos");
    }
  };

  const handleChange = (event) => {
    setCiudades(event.target.value);
  };

  const onChangePedido = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      /*if (value.length > 1 && value.trim() === "") {
        setErrorPedido(true);
        setErrorPedidoDescripcion(true);
        return;
      }*/
      if (value.trim().length === 0) {
        setErrorPedido(true);
        setErrorPedidoDescripcion(true);
      } else {
        setErrorPedido(false);
        setErrorPedidoDescripcion(false);
      }
      setPedido(value);
    } else {
      setErrorPedido(true);
      setErrorPedidoDescripcion(true);
    }
  };
  const onChangeCalleComercio = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      if (value.length === 0) {
        setErrorComercio(true);
        setErrorCalleComercio(true);
      } else {
        setErrorComercio(false);
        setErrorCalleComercio(false);
      }
      setCalleComercio(value);
    } else {
      setErrorComercio(true);
      setErrorCalleComercio(true);
    }
    setCalleComercio(value);
  };
  const onChangeNumeroComercio = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 5) {
      if (value.length === 0) {
        setErrorComercio(true);
        setErrorNumeroComercio(true);
      } else {
        setErrorComercio(false);
        setErrorNumeroComercio(false);
      }
      setNumeroComercio(value);
    } else {
      //setErrorComercio(true);
      //setErrorNumeroComercio(true);
    }
  };

  const onChangeCiudadComercio = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      setCiudadComercio(value);
    }
  };
  const onChangeReferenciaComercio = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      setReferenciaComercio(value);
    }
  };
  const onChangeCalleEntrega = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      if (value.length === 0) {
        setErrorCalleEntrega(true);
        setErrorEntrega(true);
      } else {
        setErrorCalleEntrega(false);
        setErrorEntrega(false);
      }
      setCalleEntrega(value);
    } else {
      setErrorCalleEntrega(true);
      setErrorEntrega(true);
    }
  };
  const onChangeNumeroEntrega = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 5) {
      if (value.length === 0) {
        setErrorNumeroEntrega(true);
        setErrorEntrega(true);
      } else {
        setErrorNumeroEntrega(false);
        setErrorEntrega(false);
      }
      setNumeroEntrega(value);
    } else {
      //setErrorNumeroEntrega(true);
      //setErrorEntrega(true);
    }
  };
  const onChangeCiudadEntrega = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      setCiudadEntrega(value);
    }
  };
  const onChangeReferenciaEntrega = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      setReferenciaEntrega(value);
    }
  };
  const onChangeFechayHora = (event) => {
    let value = event;
    let now = new Date();
    if (value <= now) {
      setErrorFechaEntrega(true);
      setErrorEntrega(true);
    } else {
      setFechaEntrega(value);
      setErrorFechaEntrega(false);
      setErrorEntrega(false);
    }
  };

  const onChangeMontoEfectivo = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 8) {
      if (value < montoAPagar) {
        setErrorMontoEfectivo(true);
        setErrorPago(true);
      } else {
        setErrorMontoEfectivo(false);
        setErrorPago(false);
      }
      setMontoEfectivo(value);
    } else {
      //setErrorMontoEfectivo(true);
      //setErrorPago(true);
    }
  };

  const onChangeNroTarjeta = (event) => {
    var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

    let value = event.target.value;

    if (value.length <= 300) {
      if (visa.test(value)) {
        setErrorPago(false);
        setErrorNumeroTarjeta(false);
      } else {
        setErrorNumeroTarjeta(true);
        setErrorPago(true);
      }
      setNroTarjeta(value);
    }
  };
  const onChangeNombreTitular = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      if (value.length === 0) {
        setErrorNombreTitular(true);
        setErrorPago(true);
      } else {
        setErrorNombreTitular(false);
        setErrorPago(false);
      }
      setNombreTitular(value);
    }
  };
  const onChangeApellidoTitular = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      if (value.length === 0) {
        setErrorApellidoTitular(true);
        setErrorPago(true);
      } else {
        setErrorApellidoTitular(false);
        setErrorPago(false);
      }
      setApellidoTitular(value);
    }
  };

  /*const onChangeFechaVencimientoTarjeta = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      if (value.length === 0) {
        setErrorFechaTarjeta(true);
        setErrorPago(true);
      } else {
        setErrorFechaTarjeta(false);
        setErrorPago(false);
      }
      if (value.length === 2) {
        setFechaVencimientoTarjeta(value + "/");
      } else {
        setFechaVencimientoTarjeta(value);
      }
    }
    validateExpirationDate(value);
  };*/

  const onChangeFechaVencimientoTarjeta = (event) => {
    let value = getOnlyNumbers2(event.target.value);
    if (value.length <= 7) {
      if (value.length === 0) {
        setErrorFechaTarjeta(true);
        setErrorPago(true);
      } else {
        setErrorFechaTarjeta(false);
        setErrorPago(false);
      }
      if (value.length === 2) {
        if (fechaVencimientoTarjeta.length === 1) {
          setFechaVencimientoTarjeta(value + "/");
        } else {
          setFechaVencimientoTarjeta(value);
        }
      } else {
        setFechaVencimientoTarjeta(value);
      }
      validateExpirationDate(value);
    }
  };

  const validateCardExpiryDate = (expiryDate) => {
    //return /(?:0[1-9]|1[0-2])[0-9]{2}/.test(expiryDate);
    return /(?:0[1-9]|1[0-2]){2}\/\d{2}$/.test(expiryDate);
  };

  const validateExpirationDate = (date) => {
    const month = parseInt(date.substring(0, 2));
    if (month > 12) {
      setErrorFechaTarjeta(true);
      return;
    }
    const year = parseInt(date.substring(3, 7));

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if ((year === currentYear && month <= currentMonth) || year < currentYear) {
      setErrorFechaTarjeta(true);
    }
  };

  const onChangeCVCTarjeta = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 3) {
      if (value.length <= 2) {
        setErrorCVC(true);
        setErrorPago(true);
      } else {
        setErrorCVC(false);
        setErrorPago(false);
      }
      setCVCTarjeta(value);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const deleteFile = (archivo) => {
    let archivosActual = Array.from(adjuntos);

    let nuevaListaArchivos = archivosActual.filter((file) => {
      return file.name !== archivo.name ? true : false;
    });

    //listaArchivos = Array.from(nuevaListaArchivos);

    setAdjuntos(nuevaListaArchivos);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const disableEnterKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const Pedido = () => {
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} lg={11}>
              <div style={{ textAlign: "start" }}>
                <Heading style={{ margin: "0" }} as="h6" size="lg">
                  ¡Pedí lo que sea!
                </Heading>
              </div>
            </Grid>
            <Grid item xs={12} lg={11}>
              <FormControl required fullWidth error={errorPedidoDescripcion}>
                <TextField
                  className="inputs"
                  id="standard-basic"
                  label="Lo que sea"
                  variant="outlined"
                  value={pedido}
                  onChange={onChangePedido}
                  onKeyDown={disableEnterKey}
                  multiline
                  rows="3"
                  fullWidth
                  required
                  placeholder="Ingrese una descripción de lo que desea pedir..."
                  error={errorPedidoDescripcion}
                />
                {errorPedidoDescripcion && (
                  <FormHelperText className={classes.input}>
                    {`El campo es requerido y no puede superar los 300 caracteres`}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={11} style={{ textAlign: "start" }}>
              <input
                ref={submitButton}
                accept="image/.jpg"
                id="file"
                multiple
                type="file"
                style={{ display: "none", textAlign: "start" }}
                label="algo"
                onChange={handleFiles}
              />
              <Button
                variant="outlined"
                component="span"
                color="primary"
                onClick={() => submitButton.current.click()}
              >
                Adjuntar imagen
              </Button>
            </Grid>
            <Grid item xs={12} lg={11} style={{ textAlign: "start" }}>
              {adjuntos.map((adjunto) => {
                return (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <div className="file">
                        {nombreImagen && (
                          <img
                            alt="algo"
                            id="preview"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "1em",
                              marginRight: "1em",
                            }}
                          />
                        )}
                        <Typography variant="body1" align="left">
                          {adjunto.name}
                        </Typography>
                        <IconButton
                          id="deleteIcon"
                          onClick={() => deleteFile(adjunto)}
                          style={{ height: "fit-content", padding: 0 }}
                        >
                          <ClearRoundedIcon id="deleteFile" />
                        </IconButton>
                        {/*<div
                          id="deleteIcon"
                          onClick={() => deleteFile(adjunto)}
                        >
                          <ClearRoundedIcon id="deleteFile" />
                        </div>*/}
                      </div>
                    </Grid>
                    {/*<Grid item xs={11}>
                      <div className="file">
                        <Typography variant="body1" align="left">
                          {adjunto.name}
                        </Typography>
                        <IconButton
                          id="deleteIcon"
                          onClick={() => deleteFile(adjunto)}
                          style={{ height: "fit-content", padding: 0 }}
                        >
                          <ClearRoundedIcon id="deleteFile" />
                        </IconButton>
                        {/*<div
                          id="deleteIcon"
                          onClick={() => deleteFile(adjunto)}
                        >
                          <ClearRoundedIcon id="deleteFile" />
                        </div>
                      </div>
                    </Grid>*/}
                  </Grid>
                );
              })}
              {/*
              <TextField
                id="nameFile"
                label="Imagen"
                disabled
                value={nombreImagen}
              ></TextField>
              {nombreImagen && (
                <img
                  alt="algo"
                  id="preview"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              )}*/}
            </Grid>
            {/*nombreImagen && <Grid item xs={12}></Grid>*/}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const onClickMaps = () => {
    setOpenDialogMaps(true);
  };

  const handleCloseMaps = () => {
    setDatosDomicilioMaps("");
    setUbicacionPorMaps(false);
    setOpenDialogMaps(false);
  };
  const handleContinuarMaps = () => {
    setUbicacionPorMaps(true);
    setOpenDialogMaps(false);
  };

  const Comercio = () => (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} lg={11}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={8} sm={9} md={10}>
                <div style={{ textAlign: "start" }}>
                  <Heading style={{ margin: "0" }} as="h6" size="lg">
                    ¿Dónde lo buscamos?
                  </Heading>
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                sm={3}
                md={2}
                style={{
                  textAlign: navigator.userAgent.includes("Chrome")
                    ? "-webkit-right"
                    : "-moz-right",
                }}
              >
                <div
                  className={classes.buttonMaps}
                  onClick={onClickMaps}
                  style={{ backgroundImage: `url(${MapsIcon})` }}
                ></div>
              </Grid>
              {ubicacionPorMaps ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      id="standard-basic"
                      label="Dirección"
                      fullWidth
                      disabled
                      value={datosDomicilioMaps}
                      onChange={onChangeReferenciaComercio}
                      onKeyDown={disableEnterKey}
                      multiline
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => {
                              setUbicacionPorMaps(false);
                            }}
                            style={{ height: "fit-content", padding: 0 }}
                          >
                            <InputAdornment position="start">
                              <ClearRoundedIcon />
                            </InputAdornment>
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={7} sm={8}>
                    <FormControl required fullWidth error={errorCalleComercio}>
                      <TextField
                        id="standard-basic"
                        label="Calle"
                        variant="outlined"
                        fullWidth
                        required
                        value={calleComercio}
                        onChange={onChangeCalleComercio}
                        onKeyDown={disableEnterKey}
                        error={errorCalleComercio}
                      />
                      {errorCalleComercio && (
                        <FormHelperText className={classes.input}>
                          {`El campo es requerido y no puede superar los 300 caracteres`}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} sm={4}>
                    <FormControl required fullWidth error={errorNumeroComercio}>
                      <TextField
                        id="standard-basic"
                        label="Numero"
                        variant="outlined"
                        fullWidth
                        required
                        value={numeroComercio}
                        onChange={onChangeNumeroComercio}
                        error={errorNumeroComercio}
                      />
                      {errorNumeroComercio && (
                        <FormHelperText className={classes.input}>
                          {`El campo es requerido y no puede superar los 5 caracteres`}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Ciudad"
                      variant="outlined"
                      fullWidth
                      value={ciudadComercio}
                      onChange={onChangeCiudadComercio}
                      onKeyDown={disableEnterKey}
                      required
                      style={{ textAlign: "start" }}
                      placeholder="Seleccione una ciudad"
                    >
                      {ciudadesSel.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="standard-basic"
                  label="Referencia"
                  fullWidth
                  value={referenciaComercio}
                  onChange={onChangeReferenciaComercio}
                  onKeyDown={disableEnterKey}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const Entrega = () => (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} lg={11}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={12}>
                <div style={{ textAlign: "start" }}>
                  <Heading style={{ margin: "0" }} as="h6" size="lg">
                    ¿Dónde te lo llevamos?
                  </Heading>
                </div>
              </Grid>
              <Grid item xs={7} sm={8}>
                <FormControl required fullWidth error={errorCalleEntrega}>
                  <TextField
                    id="standard-basic"
                    label="Calle"
                    variant="outlined"
                    value={calleEntrega}
                    onChange={onChangeCalleEntrega}
                    required
                    fullWidth
                    onKeyDown={disableEnterKey}
                    error={errorCalleEntrega}
                  />
                  {errorCalleEntrega && (
                    <FormHelperText className={classes.input}>
                      {`El campo es requerido y no puede superar los 300 caracteres`}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={5} sm={4}>
                <FormControl fullWidth required error={errorNumeroEntrega}>
                  <TextField
                    id="standard-basic"
                    label="Numero"
                    variant="outlined"
                    value={numeroEntrega}
                    onChange={onChangeNumeroEntrega}
                    fullWidth
                    required
                    onKeyDown={disableEnterKey}
                    error={errorNumeroEntrega}
                  />
                  {errorNumeroEntrega && (
                    <FormHelperText className={classes.input}>
                      {`El campo es requerido y no puede superar los 5 caracteres`}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={errorEntrega}>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Ciudad"
                      variant="outlined"
                      value={ciudadEntrega}
                      onChange={onChangeCiudadEntrega}
                      fullWidth
                      required
                      onKeyDown={disableEnterKey}
                      style={{ textAlign: "start" }}
                      placeholder="Seleccione una ciudad"
                    >
                      {ciudadesSel.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Referencia"
                  variant="outlined"
                  value={referenciaEntrega}
                  onChange={onChangeReferenciaEntrega}
                  multiline
                  fullWidth
                  rows={3}
                  onKeyDown={disableEnterKey}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={12}>
                    <div style={{ textAlign: "start" }}>
                      <Heading style={{ margin: "0" }} as="h4" size="md">
                        ¿Cuándo quiere recibirlo?
                      </Heading>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioGroup
                      defaultValue={metodoEntrega}
                      value={metodoEntrega}
                      aria-label="gender"
                      name="customized-radios"
                      style={{ alignItems: "start" }}
                      onChange={(e) => setMetodoEntrega(e.target.value)}
                    >
                      <FormControlLabel
                        className="radio"
                        value="LoQueSea"
                        control={<StyledRadio />}
                        label="¡Lo antes posible!"
                      />
                      <FormControlLabel
                        className="radio"
                        value="FechaHora"
                        control={<StyledRadio />}
                        label="En otro momento..."
                      />
                    </RadioGroup>
                  </Grid>

                  {metodoEntrega === "FechaHora" && (
                    <>
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          required
                          error={errorFechaEntrega}
                        >
                          <MuiPickersUtilsProvider
                            libInstance={moment}
                            utils={DateFnsUtils}
                            locale={es}
                          >
                            <DateTimePicker
                              autoOk
                              fullWidth
                              inputVariant="outlined"
                              ampm={false}
                              minDate={new Date()}
                              value={fechaEntrega}
                              onChange={onChangeFechayHora}
                              required
                              label="Fecha y hora de recepción"
                              format="dd/MM/yyyy HH:mm"
                              error={errorFechaEntrega}
                            />
                            {errorFechaEntrega && (
                              <FormHelperText className={classes.input}>
                                {`Se debe ingresar Fecha y Hora futuro`}
                              </FormHelperText>
                            )}
                          </MuiPickersUtilsProvider>
                        </FormControl>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const Pago = () => (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} lg={11}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={12}>
                <div style={{ textAlign: "start" }}>
                  <Heading style={{ margin: "0" }} as="h6" size="lg">
                    ¿Cómo deseas pagar?
                  </Heading>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={{ textAlign: "start" }}>
                  <Heading style={{ margin: "0" }} as="h4" size="md">
                    Monto a pagar: ${montoAPagar}
                  </Heading>
                </div>
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  defaultValue={metodoPago}
                  value={metodoPago}
                  aria-label="gender"
                  name="customized-radios"
                  style={{ alignItems: "start" }}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={6}>
                      <FormControlLabel
                        className="radio"
                        value="efectivo"
                        control={<StyledRadio text="Efectivo" />}
                        label="Efectivo"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        className="radio"
                        value="tarjeta"
                        control={<StyledRadio text="Tarjeta VISA" />}
                        label="Tarjeta VISA"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Grid>

              {metodoPago === "efectivo" && (
                <Grid item xs={12}>
                  <FormControl fullWidth required error={errorMontoEfectivo}>
                    <TextField
                      id="standard-basic"
                      label="Monto a pagar"
                      variant="outlined"
                      value={montoEfectivo}
                      onChange={onChangeMontoEfectivo}
                      fullWidth
                      onKeyDown={disableEnterKey}
                      required
                      error={errorMontoEfectivo}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                    {errorMontoEfectivo && (
                      <FormHelperText className={classes.input}>
                        {`El monto no debe ser menor a $500`}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              )}

              {metodoPago === "tarjeta" && (
                <>
                  <Grid item xs={12}>
                    <FormControl fullWidth required error={errorNumeroTarjeta}>
                      <TextField
                        id="standard-basic"
                        label="Numero de tarjeta"
                        variant="outlined"
                        value={nroTarjeta}
                        onChange={onChangeNroTarjeta}
                        fullWidth
                        required
                        onKeyDown={disableEnterKey}
                        inputProps={{
                          maxLength: 16,
                        }}
                        error={errorNumeroTarjeta}
                      />
                      {errorNumeroTarjeta && (
                        <FormHelperText className={classes.input}>
                          {`El número de tarjeta ingresado no es VISA`}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth required error={errorNombreTitular}>
                      <TextField
                        id="standard-basic"
                        label="Nombre"
                        variant="outlined"
                        value={nombreTitular}
                        onChange={onChangeNombreTitular}
                        fullWidth
                        onKeyDown={disableEnterKey}
                        error={errorNombreTitular}
                      />
                      {errorNombreTitular && (
                        <FormHelperText className={classes.input}>
                          {`El campo es requerido`}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      required
                      error={errorApellidoTitular}
                    >
                      <TextField
                        id="standard-basic"
                        label="Apellido"
                        variant="outlined"
                        value={apellidoTitular}
                        onChange={onChangeApellidoTitular}
                        fullWidth
                        onKeyDown={disableEnterKey}
                        error={errorApellidoTitular}
                      />
                      {errorApellidoTitular && (
                        <FormHelperText className={classes.input}>
                          {`El campo es requerido`}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required error={errorFechaTarjeta}>
                      <TextField
                        id="standard-basic"
                        label="F. Vencimiento"
                        placeholder="MM/AAAA"
                        variant="outlined"
                        value={fechaVencimientoTarjeta}
                        onChange={onChangeFechaVencimientoTarjeta}
                        fullWidth
                        required
                        onKeyDown={disableEnterKey}
                        inputProps={{
                          maxLength: 7,
                        }}
                        error={errorFechaTarjeta}
                      />
                      {errorFechaTarjeta && (
                        <FormHelperText className={classes.input}>
                          {`Fecha invalida`}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required error={errorCVC}>
                      <TextField
                        id="standard-basic"
                        variant="outlined"
                        label="CVC"
                        value={cvcTarjeta}
                        onChange={onChangeCVCTarjeta}
                        fullWidth
                        required
                        onKeyDown={disableEnterKey}
                        inputProps={{
                          maxLength: 3,
                        }}
                        error={errorCVC}
                      />
                      {errorCVC && (
                        <FormHelperText className={classes.input}>
                          {`El campo es requerido`}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const FormLoQueSea = [Pedido, Comercio, Entrega, Pago];

  const maxSteps = FormLoQueSea.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpenDialogConfirmar(false);
    setOpenDialogExito(false);
  };

  const onClickFinalizar = () => {
    setOpenDialogConfirmar(true);
  };

  const onClickConfirmarPedido = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setOpenDialogConfirmar(false);
      setOpenDialogExito(true);
    }, 2700);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const errorComercio2 = ubicacionPorMaps
    ? datosDomicilioMaps.length === 0
      ? true
      : false
    : calleComercio.length === 0 ||
      numeroComercio.length === 0 ||
      ciudadComercio.length === 0
    ? true
    : false;

  /*const errorComercio2 =
    (calleComercio.length === 0 ||
      numeroComercio.length === 0 ||
      ciudadComercio.length === 0) &&
    datosDomicilioMaps.length === 0
      ? true
      : false;*/

  const errorEntrega2 =
    calleEntrega.length === 0 ||
    errorCalleEntrega ||
    numeroEntrega.length === 0 ||
    errorNumeroEntrega ||
    ciudadEntrega.length === 0 ||
    metodoEntrega.length === 0 ||
    (metodoEntrega === "FechaHora" && errorFechaEntrega)
      ? true
      : false;

  /*const errorPago2 =
    metodoPago === "efectivo" && montoEfectivo.length === 0
      ? true
      : metodoPago === "tarjeta" &&
        (nroTarjeta.length === 0 ||
          cvcTarjeta.length === 0 ||
          errorCVC ||
          nombreTitular.length === 0 ||
          errorNombreApellidoTar ||
          fechaVencimientoTarjeta.length === 0)
      ? true
      : false;*/

  const errorPago2 =
    metodoPago === ""
      ? true
      : metodoPago === "efectivo"
      ? montoEfectivo.length === 0
        ? true
        : montoEfectivo < montoAPagar
        ? true
        : false
      : metodoPago === "tarjeta"
      ? nroTarjeta.length === 0 ||
        errorNumeroTarjeta ||
        cvcTarjeta.length === 0 ||
        errorCVC ||
        nombreTitular.length === 0 ||
        errorNombreTitular ||
        errorApellidoTitular ||
        fechaVencimientoTarjeta.length === 0
        ? true
        : false
      : false;

  const disableNextStep =
    activeStep === 0
      ? errorPedido
      : activeStep === 1
      ? errorComercio2
      : activeStep === 2
      ? errorEntrega2
      : activeStep === 3
      ? errorPago2
      : false;

  const disableFinalStep = errorPago2;

  const defaultOptionsDone = {
    loop: false,
    autoplay: true,
    animationData: DoneLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptionsDelivery = {
    loop: true,
    autoplay: true,
    animationData: DeliveryLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div style={{ textAlign: "start", margin: "1em" }}>
            <Heading style={{ margin: "0" }} size="xl" as="h1">
              DeliverEat!
            </Heading>
          </div>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={12} sm={12} md={10} lg={10} xl={8}>
          <SwipeableViews
            axis="x"
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents={false}
            disabled
          >
            {FormLoQueSea.map((PasoForm, index) => {
              return PasoForm();

              /*Grow in={true} timeout={700}>
                                {PasoForm()}
                              </Grow>*/
            })}
          </SwipeableViews>
          <MobileStepper
            className={classes.mobileStepper}
            classes={{ progress: classes.mobileStepperProgress }}
            steps={maxSteps}
            activeStep={activeStep}
            style={{ overflow: "hidden" }}
            position="bottom"
            variant="progress"
            nextButton={
              activeStep === 3 ? (
                <Button
                  size="small"
                  onClick={onClickFinalizar}
                  classes={{ root: classes.button }}
                  //  disabled={activeStep === maxSteps - 1}
                  disabled={disableFinalStep}
                >
                  Finalizar
                  <KeyboardArrowRight />
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={handleNext}
                  classes={{ root: classes.button }}
                  //disabled={activeStep === maxSteps - 1}
                  disabled={disableNextStep}
                >
                  Siguiente
                  <KeyboardArrowRight />
                </Button>
              )
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Volver
              </Button>
            }
          />
        </Grid>
      </Grid>
      <Dialog
        open={openDialogConfirmar}
        //TransitionComponent={Transition}
        onClose={handleClose}
        disableBackdropClick={cargando}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle>
          <div style={{ textAlign: "start" }}>
            <Heading style={{ margin: "0" }} as="h6" size="md">
              {cargando ? "" : "¿Deseas confirmar tu pedido?"}
            </Heading>
          </div>
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText>
            {cargando ? (
              <Lottie
                options={defaultOptionsLoading}
                height={150}
                width={150}
              />
            ) : (
              <Lottie
                options={defaultOptionsDelivery}
                height={150}
                width={150}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          <Button
            disabled={cargando}
            onClick={handleClose}
            color="primary"
            classes={{ root: classes.button }}
          >
            Cancelar
          </Button>
          <Button
            disabled={cargando}
            onClick={onClickConfirmarPedido}
            color="primary"
            classes={{ root: classes.button }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogExito}
        TransitionComponent={Transition}
        onClose={handleClose}
        disableBackdropClick
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle>
          <div style={{ textAlign: "start" }}>
            <Heading style={{ margin: "0" }} as="h6" size="md">
              ¡Tu pedido se hizo correctamente!
            </Heading>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Lottie options={defaultOptionsDone} height={150} width={150} />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          <Button
            disabled={cargando}
            onClick={reloadPage}
            color="primary"
            classes={{ root: classes.button }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogMaps}
        //TransitionComponent={Transition}
        onClose={handleCloseMaps}
        disableBackdropClick
        classes={{ paper: classes.dialogMaps }}
      >
        <DialogContent>
          <GoogleMaps
            //datosDomicilioMaps={datosDomicilioMaps}
            setDatosDomicilioMaps={setDatosDomicilioMaps}
            isDialogOpen={true}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleCloseMaps} color="primary" variant="contained">
            Volver
          </Button>
          <Button
            disabled={datosDomicilioMaps.length === 0}
            onClick={handleContinuarMaps}
            color="primary"
            variant="contained"
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {mensajeErrorSnack}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default MyForm;
