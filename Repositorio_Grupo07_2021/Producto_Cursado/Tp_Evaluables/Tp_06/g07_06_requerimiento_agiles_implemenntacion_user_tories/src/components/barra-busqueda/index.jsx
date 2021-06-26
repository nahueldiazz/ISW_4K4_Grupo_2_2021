import React from "react";
import { InputAdornment, IconButton, Paper } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import "./styles.scss";

const BarraBusqueda = (props) => {
  return (
    <div id="searchBox">
      <InputBase
        onKeyDown={props.onKeyPress}
        autoFocus={true}
        fullWidth={true}
        //label="Buscar"
        placeholder={props.placeholder ? props.placeholder : "Buscar..."}
        //InputLabelProps={{ style: { backdropFilter: "blur(0.5px)" } }}
        value={props.texto}
        onChange={props.onBusquedaChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="limpiar busqueda"
              onClick={props.onClickButton}
              onMouseDown={() => {}}
              edge="end"
            >
              {props.busqueda ? <ClearIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
};
export default BarraBusqueda;
