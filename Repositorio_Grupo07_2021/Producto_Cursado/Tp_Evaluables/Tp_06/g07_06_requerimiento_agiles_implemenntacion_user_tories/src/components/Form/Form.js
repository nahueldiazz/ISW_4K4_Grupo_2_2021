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
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import "./Form.scss";
import MuiAlert from "@material-ui/lab/Alert";
import { getOnlyNumbers } from "../../utils";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { es } from "date-fns/esm/locale";
import moment from "moment";
import SwipeableViews from "react-swipeable-views";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { Heading } from "@chakra-ui/react";

moment.locale("es");

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "3em",
      boxShadow: "0 0 3em rgb(0 0 0 / 15%)",
      borderRadius: "2em",
      [theme.breakpoints.down(700)]: {
        margin: "8vw",
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
  const maxCapacity = 1;
  // ------

  // COMERCIO
  const [calleComercio, setCalleComercio] = useState("");
  const [numeroComercio, setNumeroComercio] = useState("");
  const [ciudadComercio, setCiudadComercio] = useState("");
  const [referenciaComercio, setReferenciaComercio] = useState("");
  const [errorComercio, setErrorComercio] = useState(true);
  // --------

  // ENTREGA
  const [calleEntrega, setCalleEntrega] = useState("");
  const [numeroEntrega, setNumeroEntrega] = useState("");
  const [ciudadEntrega, setCiudadEntrega] = useState("");
  const [referenciaEntrega, setReferenciaEntrega] = useState("");
  const [metodoEntrega, setMetodoEntrega] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState(new Date());
  const [errorEntrega, setErrorEntrega] = useState(true);
  // -------

  // PAGO
  const [metodoPago, setMetodoPago] = useState("");
  const [nroTarjeta, setNroTarjeta] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [apellidoTitular, setApellidoTitular] = useState("");
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState("");
  const [cvcTarjeta, setCVCTarjeta] = useState("");
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [errorPago, setErrorPago] = useState(true);
  // ----

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
    console.log(fileInput);

    let adjuntosAntes = Array.from(adjuntos);
    let archivos = [];
    archivos.push(adjuntosAntes);

    let files = Array.from(e.target.files);
    console.log(files);
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
      if (value.length === 0) {
        setErrorPedido(true);
      } else {
        setErrorPedido(false);
      }
      setPedido(value);
    }
  };
  const onChangeCalleComercio = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      setCalleComercio(value);
    }
  };
  const onChangeNumeroComercio = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 4) {
      setNumeroComercio(value);
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
      setCalleEntrega(value);
    }
  };
  const onChangeNumeroEntrega = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 4) {
      setNumeroEntrega(value);
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
  const onChangeMontoEfectivo = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 8) {
      setMontoEfectivo(value);
    }
  };
  const onChangeNroTarjeta = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 300) {
      setNroTarjeta(value);
    }
  };
  const onChangeNombreTitular = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      setNombreTitular(value);
    }
  };
  const onChangeApellidoTitular = (event) => {
    let value = event.target.value;
    if (value.length <= 300) {
      setApellidoTitular(value);
    }
  };
  const onChangeFechaVencimientoTarjeta = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 300) {
      setFechaVencimientoTarjeta(value);
    }
  };
  const onChangeCVCTarjeta = (event) => {
    let value = getOnlyNumbers(event.target.value);
    if (value.length <= 3) {
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
                <Heading style={{ margin: "0" }}>¡Pedí lo que sea!</Heading>
              </div>
            </Grid>
            <Grid item xs={12} lg={11}>
              <FormControl required fullWidth error={errorPedido}>
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
                  error={errorPedido}
                />
                {errorPedido && (
                  <FormHelperText className={classes.input}>
                    {`Error`}
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
                Cargar imagen
              </Button>
            </Grid>
            <Grid item xs={12} lg={11} style={{ textAlign: "start" }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                {adjuntos.map((adjunto) => {
                  return (
                    <Grid item xs={12} style={{ textAlign: "start" }}>
                      <div className="file">
                        <Typography variant="body1" align="left">
                          {adjunto.name}
                        </Typography>
                        <div
                          id="deleteIcon"
                          onClick={() => deleteFile(adjunto)}
                        >
                          <ClearRoundedIcon id="deleteFile" />
                        </div>
                      </div>
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
            </Grid>

            {/*nombreImagen && <Grid item xs={12}></Grid>*/}
          </Grid>
        </CardContent>
      </Card>
    );
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
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <div style={{ textAlign: "start" }}>
                  <Heading style={{ margin: "0" }}>¿Dónde lo buscamos?</Heading>
                </div>
              </Grid>
              <Grid item xs={7} sm={8}>
                <TextField
                  id="standard-basic"
                  label="Calle"
                  variant="outlined"
                  fullWidth
                  value={calleComercio}
                  onChange={onChangeCalleComercio}
                  onKeyDown={disableEnterKey}
                />
              </Grid>
              <Grid item xs={5} sm={4}>
                <TextField
                  id="standard-basic"
                  label="Numero"
                  variant="outlined"
                  fullWidth
                  value={numeroComercio}
                  onChange={onChangeNumeroComercio}
                />
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
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <div style={{ textAlign: "start" }}>
                  <Heading style={{ margin: "0" }}>
                    ¿Dónde te lo llevamos?
                  </Heading>
                </div>
              </Grid>
              <Grid item xs={7} sm={8}>
                <TextField
                  id="standard-basic"
                  label="Calle"
                  variant="outlined"
                  value={calleEntrega}
                  onChange={onChangeCalleEntrega}
                  fullWidth
                  onKeyDown={disableEnterKey}
                />
              </Grid>
              <Grid item xs={5} sm={4}>
                <TextField
                  id="standard-basic"
                  label="Numero"
                  variant="outlined"
                  value={numeroEntrega}
                  onChange={onChangeNumeroEntrega}
                  fullWidth
                  onKeyDown={disableEnterKey}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Ciudad"
                    variant="outlined"
                    value={ciudadEntrega}
                    onChange={onChangeCiudadEntrega}
                    fullWidth
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
                            onChange={setFechaEntrega}
                            label="Fecha y hora de recepción"
                            format="dd/MM/yyyy HH:mm"
                          />
                        </MuiPickersUtilsProvider>
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
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <div style={{ textAlign: "start" }}>
                  <Heading style={{ margin: "0" }}>¿Cómo deseas pagar?</Heading>
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
                  <TextField
                    id="standard-basic"
                    label="Monto a pagar"
                    variant="outlined"
                    value={montoEfectivo}
                    onChange={onChangeMontoEfectivo}
                    fullWidth
                    onKeyDown={disableEnterKey}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}

              {metodoPago === "tarjeta" && (
                <>
                  <Grid item xs={7} sm={8}>
                    <TextField
                      id="standard-basic"
                      label="Numero de tarjeta"
                      variant="outlined"
                      value={nroTarjeta}
                      onChange={onChangeNroTarjeta}
                      fullWidth
                      onKeyDown={disableEnterKey}
                    />
                  </Grid>
                  <Grid item xs={5} sm={4}>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      label="CVC"
                      value={cvcTarjeta}
                      onChange={onChangeCVCTarjeta}
                      fullWidth
                      onKeyDown={disableEnterKey}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Nombre titular"
                      variant="outlined"
                      value={nombreTitular}
                      onChange={onChangeNombreTitular}
                      fullWidth
                      onKeyDown={disableEnterKey}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Apellido titular"
                      variant="outlined"
                      value={apellidoTitular}
                      onChange={onChangeApellidoTitular}
                      fullWidth
                      onKeyDown={disableEnterKey}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Fecha de vencimiento"
                      placeholder="MM/AA"
                      variant="outlined"
                      value={fechaVencimientoTarjeta}
                      onChange={onChangeFechaVencimientoTarjeta}
                      fullWidth
                      onKeyDown={disableEnterKey}
                    />
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
    }, 2000);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const errorComercio2 =
    calleComercio.length === 0 ||
    numeroComercio.length === 0 ||
    ciudadComercio.length === 0
      ? true
      : false;

  const errorEntrega2 =
    calleEntrega.length === 0 ||
    numeroEntrega.length === 0 ||
    ciudadEntrega.length === 0
      ? true
      : false;

  const disableNextStep =
    activeStep === 0
      ? errorPedido
      : activeStep === 1
      ? errorComercio2
      : activeStep === 2
      ? errorEntrega
      : activeStep === 3
      ? errorPago
      : false;

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div style={{ textAlign: "start" }}>
            <Heading style={{ margin: "0" }} size="3xl" as="h1">
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
        <Grid item xs={12} sm={10} md={8} lg={7}>
          <SwipeableViews
            axis="x"
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents={false}
          >
            {FormLoQueSea.map((PasoForm, index) => {
              return PasoForm();
            })}
          </SwipeableViews>
          <MobileStepper
            className={classes.mobileStepper}
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
                  //disabled={activeStep === maxSteps - 1}
                >
                  Finalizar
                  <KeyboardArrowRight />
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={handleNext}
                  //disabled={activeStep === maxSteps - 1}
                  //disabled={disableNextStep}
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
      >
        <DialogTitle>{"¿Deseas confirmar tu pedido?"}</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          {cargando ? <CircularProgress /> : null}
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargando} onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            disabled={cargando}
            onClick={onClickConfirmarPedido}
            color="primary"
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
      >
        <DialogTitle>{"¡Tu pedido se hizo correctamente!"}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargando} onClick={reloadPage} color="primary">
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
