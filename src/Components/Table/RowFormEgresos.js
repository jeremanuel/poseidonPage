import React, { useState, useEffect } from 'react';

//Components
//External
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { ButtonGroup, Button } from '@material-ui/core';

import Operation from '../Operations/Date';

//Internal

import EffectTransparency from '../Animations/EffectTransparency'
import PopUpMessage from '../Forms/PopUpMessage'


//--------------------------------------------------------------

export default function RowFormEgresos(props) {

    const { names, row, handleAdding, selected, addRow, modifyRow, title, ...rest } = props;

    const [newRow, setNewRow] =
    useState({
        total: '',
        descripcion: '',
        deuda: 0,
        fecha_creacion: Date.now()
    });

    const [fetching, setFetching] = useState(false)
    const [errorCalculate, setErrorCalculate] = useState(false)


    const handleDescripcion = (event) => {

        event.persist()
        
        setNewRow((prevState) => ({
            ...prevState,
            ['descripcion']: event.target.value
        }))

    };

    const handleTotal = (event) => {

        event.persist()
        
        setNewRow((prevState) => ({
            ...prevState,
            ['total']: event.target.value
        }))

    };

    const getPopUpMessage = (titleMessage, bodyMessage, modeMessage, responseTrue, responseFalse) => {
        return <EffectTransparency nameTable={title} toggleRenderComponent={togglePicking} >
                    <PopUpMessage 
                        title={titleMessage}
                        message={bodyMessage}
                        mode={modeMessage} 
                        children={ ({response}) => response ? responseTrue() : responseFalse(false)}
                    />
                </EffectTransparency>
    }

    const getBodyMessage = () => {

        let BodyMessage = `Egreso Total: ${newRow.total}
                           \n Razon: ${newRow.descripcion} 
                           \n Dia: ${newRow.fecha_creacion}
                           `;
        return BodyMessage; 
    }

    const togglePicking = (nameTable, doneSelect) => {
        setFetching(false)
    }

    const handleAddData = () => {

        addRow(newRow)
    }

    return (
        <>
        { fetching && getPopUpMessage("Deseas Continuar?", getBodyMessage(), "confirm", handleAddData, setFetching) }
            <TableRow>
                <TableCell>
                    <ButtonGroup color="secondary">
                        <Button onClick={event => { if (selected.length) modifyRow(selected[0]._id, newRow); else setFetching(true)}}>
                            <Tooltip title="Accept" arrow>
                                <CheckIcon />
                            </Tooltip>
                        </Button>
                        <Button onClick={event => { handleAdding(event) }}>
                            <Tooltip title="Cancel" arrow>
                                <ClearIcon />
                            </Tooltip>
                        </Button>
                    </ButtonGroup>
                </TableCell>

                <TableCell align="left" >
                    <TextField id="total" label="total" value={newRow.total} onChange={ event => handleTotal(event) } />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="descripcion" label="descripcion" value={newRow.descripcion} onChange={ event => handleDescripcion(event) } />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="deuda" label="deuda" name="deuda" value="Por defecto" disabled />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="fecha_creacion" label="fecha_creacion" name="fecha_creacion" value="Hoy" disabled />
                </TableCell>

            </TableRow>
        </>
    )
}