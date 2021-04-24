import React, { useState, useRef, useEffect } from "react";
import { Snackbar, Select, FormControl } from "@material-ui/core";
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

moment.locale("es");

const useStyles = makeStyles({
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
});

function StyledRadio(props) {
  const classes = useStyles();
  console.log(props.value.value);
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

  const [pedido, setPedido] = useState("");
  const [adjuntos, setAdjuntos] = useState([]);
  const maxCapacity = 5;
  const [calleComercio, setCalleComercio] = useState("");
  const [numeroComercio, setNumeroComercio] = useState("");
  const [ciudadComercio, setCiudadComercio] = useState("");
  const [referenciaComercio, setReferenciaComercio] = useState("");
  const [calleEntrega, setCalleEntrega] = useState("");
  const [numeroEntrega, setNumeroEntrega] = useState("");
  const [ciudadEntrega, setCiudadEntrega] = useState("");
  const [referenciaEntrega, setReferenciaEntrega] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [nroTarjeta, setNroTarjeta] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [apellidoTitular, setApellidoTitular] = useState("");
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState("");
  const [cvcTarjeta, setCVCTarjeta] = useState("");
  const [metodoEntrega, setMetodoEntrega] = useState("");
  const [ciudades, setCiudades] = useState("");
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState(new Date());
  const [nombreImagen, setNombreImagen] = useState("");

  const [mensajeErrorSnack, setMensajeErrorSnack] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    let value = event.target.value;
    if (value.length <= 300) {
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
    let value = event.target.value;
    if (value.length <= 300) {
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

  return (
    <Container>
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} sm={10} md={8} lg={7} xl={7}>
            <TextField
              className="inputs"
              id="standard-basic"
              label="Lo que sea"
              value={pedido}
              onChange={onChangePedido}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={10} md={8} lg={7} xl={7}>
            <input
              ref={submitButton}
              accept="image/.jpg"
              id="file"
              multiple
              type="file"
              style={{ display: "none" }}
              label="algo"
              onChange={handleFiles}
            />
            <Button
              variant="raised"
              component="span"
              onClick={() => submitButton.current.click()}
            >
              Cargar imagen
            </Button>
          </Grid>
          <Grid item xs={12} sm={10} md={8} lg={7} xl={7}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              {adjuntos.map((adjunto) => {
                return (
                  <Grid item xs={12}>
                    <div className="file">
                      <Typography variant="body1">{adjunto.name}</Typography>
                      <div id="deleteIcon" onClick={() => deleteFile(adjunto)}>
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

          {nombreImagen && <Grid item xs={12}></Grid>}
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Calle"
              value={calleComercio}
              onChange={onChangeCalleComercio}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Numero"
              value={numeroComercio}
              onChange={onChangeNumeroComercio}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <TextField
                id="standard-select-currency"
                select
                label="Ciudad"
                value={ciudadComercio}
                onChange={onChangeCiudadComercio}
                helperText="Seleccione una ciudad"
                className="ciudades"
              >
                {ciudadesSel.map((option) => (
                  <MenuItem
                    className="ciudades"
                    key={option.value}
                    value={option.value}
                  >
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
              value={referenciaComercio}
              onChange={onChangeReferenciaComercio}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Calle"
              value={calleEntrega}
              onChange={onChangeCalleEntrega}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Numero"
              value={numeroEntrega}
              onChange={onChangeNumeroEntrega}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <TextField
                id="standard-select-currency"
                select
                label="Ciudad"
                value={ciudadEntrega}
                onChange={onChangeCiudadEntrega}
                helperText="Seleccione una ciudad"
                className="ciudades"
              >
                {ciudadesSel.map((option) => (
                  <MenuItem
                    className="ciudades"
                    key={option.value}
                    value={option.value}
                  >
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
              value={referenciaEntrega}
              onChange={onChangeReferenciaEntrega}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Forma de pago</FormLabel>
            <RadioGroup
              defaultValue={metodoPago}
              value={metodoPago}
              aria-label="gender"
              name="customized-radios"
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <FormControlLabel
                className="radio"
                value="efectivo"
                control={<StyledRadio />}
                label="Efectivo"
              />
              <FormControlLabel
                className="radio"
                value="tarjeta"
                control={<StyledRadio />}
                label="Tarjeta VISA"
              />
            </RadioGroup>

            {metodoPago === "efectivo" && (
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Monto a pagar"
                  value={montoEfectivo}
                  onChange={onChangeMontoEfectivo}
                />
              </Grid>
            )}

            {metodoPago === "tarjeta" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Numero de tarjeta"
                    value={nroTarjeta}
                    onChange={onChangeNroTarjeta}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Nombre titular"
                    value={nombreTitular}
                    onChange={onChangeNombreTitular}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Apellido titular"
                    value={apellidoTitular}
                    onChange={onChangeApellidoTitular}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Fecha de vencimiento"
                    value={fechaVencimientoTarjeta}
                    onChange={onChangeFechaVencimientoTarjeta}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="CVC"
                    value={cvcTarjeta}
                    onChange={onChangeCVCTarjeta}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Desea recibirlo...</FormLabel>
            <RadioGroup
              defaultValue={metodoEntrega}
              value={metodoEntrega}
              aria-label="gender"
              name="customized-radios"
              onChange={(e) => setMetodoEntrega(e.target.value)}
            >
              <FormControlLabel
                className="radio"
                value="LoQueSea"
                control={<StyledRadio />}
                label="Lo antes posible"
              />
              <FormControlLabel
                className="radio"
                value="FechaHora"
                control={<StyledRadio />}
                label="Ingresar fecha y hora"
              />
              {metodoEntrega === "LoQueSea" && (
                <Grid>
                  <h1>seleccino LoQueSea</h1>
                  {/* aca poner componente LoQueSea */}
                </Grid>
              )}

              {metodoEntrega === "FechaHora" && (
                <>
                  <MuiPickersUtilsProvider
                    libInstance={moment}
                    utils={DateFnsUtils}
                    locale={es}
                  >
                    <DateTimePicker
                      autoOk
                      ampm={false}
                      minDate={new Date()}
                      value={fechaEntrega}
                      onChange={setFechaEntrega}
                      label="24h clock"
                    />
                  </MuiPickersUtilsProvider>
                </>
              )}
            </RadioGroup>
          </Grid>
        </Grid>
      </form>
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
    </Container>
  );
};

export default MyForm;
