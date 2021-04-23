import React, { useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
        justifyContent: "center"
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
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

    const submitButton = useRef()

    const [metodoPago, setMetodoPago] = useState("")
    const [metodoEntrega, setMetodoEntrega] = useState("")
    const [ciudades, setCiudades] = useState('');
    const [nombreImagen, setNombreImagen] = useState('');
    const ciudadesSel = [
        {
            value: 'Córdoba',
            label: 'Córdoba',
        },
        {
            value: 'Carlos Paz',
            label: 'Carlos Paz',
        },
        {
            value: 'Jesús Maria',
            label: 'Jesus Maria',
        },
        {
            value: 'Cosquín',
            label: 'Cosquín',
        },
    ];




    const handleCapture = (e) => {



        var fileInput = document.getElementById('file');
        var filePath = fileInput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            alert('No es un tipo de imagen .jpeg/.jpg/.png/.gif .');
            fileInput.value = '';
            return false;
        } else {
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])

            reader.onload = () => {
                let preview = document.getElementById("preview")
                preview.src = reader.result
            }

            setNombreImagen(filePath)
        }
    }


    const handleChange = (event) => {
        setCiudades(event.target.value);
    };
    return (
        <Container>
            <form noValidate autoComplete="off">
                <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item xs={12}>
                        <TextField className='inputs' id="standard-basic" label="Lo que sea" />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            ref={submitButton}
                            accept="image/*"
                            id="file"
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            label='algo'
                            onChange={handleCapture}
                        />
                        <Button variant="raised" component="span" onClick={() => submitButton.current.click()} >
                            Cargar imagen
                              </Button>

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>

                            <TextField
                                id="nameFile"
                                label="Imagen"
                                disabled
                                value={nombreImagen}
                            ></TextField>
                            {nombreImagen && (

                                <img alt='algo' id="preview" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                            )}
                        </div>

                    </Grid>



                    {nombreImagen &&
                        <Grid item xs={12}>

                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Direccion comercio" />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Direccion a entregar" />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Ciudad"
                            value={ciudades}
                            onChange={handleChange}
                            helperText="Seleccione una ciudad"
                            className='ciudades'
                        >
                            {ciudadesSel.map((option) => (
                                <MenuItem className='ciudades' key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel component="legend">Forma de pago</FormLabel>
                        <RadioGroup defaultValue={metodoPago} value={metodoPago} aria-label="gender" name="customized-radios" onChange={(e) => setMetodoPago(e.target.value)}>
                            <FormControlLabel className='radio' value="efectivo" control={<StyledRadio />} label="Efectivo" />
                            <FormControlLabel className='radio' value="tarjeta" control={<StyledRadio />} label="Tarjeta" />
                        </RadioGroup>

                        {metodoPago === "efectivo" &&
                            <Grid>
                                <h1>seleccino efectivo</h1>
                                {/* aca poner componente efectivo */}
                            </Grid>}

                        {metodoPago === "tarjeta" &&
                            <Grid>
                                <h1>seleccino tarjeta</h1>
                                {/* aca poner componente tarjeta */}

                            </Grid>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel component="legend">Desea recibirlo...</FormLabel>
                        <RadioGroup defaultValue={metodoEntrega} value={metodoEntrega} aria-label="gender" name="customized-radios" onChange={(e) => setMetodoEntrega(e.target.value)}>
                            <FormControlLabel className='radio' value="LoQueSea" control={<StyledRadio />} label="Lo antes posible" />
                            <FormControlLabel className='radio' value="FechaHora" control={<StyledRadio />} label="Ingresar fecha y hora" />
                            {metodoEntrega === "LoQueSea" &&
                                <Grid>
                                    <h1>seleccino LoQueSea</h1>
                                    {/* aca poner componente LoQueSea */}
                                </Grid>}

                            {metodoEntrega === "FechaHora" &&
                                <Grid>
                                    <h1>seleccino FechaHora</h1>
                                    {/* aca poner componente FechaHora */}

                                </Grid>

                            }
                        </RadioGroup>

                    </Grid>
                </Grid>

            </form >
        </Container>
    );
};

export default MyForm;
