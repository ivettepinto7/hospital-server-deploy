import React, { useState, useEffect, useContext, useRef } from 'react'
import MenuContext from '../../contexts/MenuContext/MenuContext';
import { useForm, Controller } from 'react-hook-form';

//Components imports
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';

import "../cssFiles/FormDemo.css";

export default function EditDrugExistence({code}) {
    const { emergentEditDrugState } = useContext(MenuContext);
    const menuContext = useContext(MenuContext);

    const toast = useRef(null);

    
    const [display, setDisplay] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const defaultValues = {
        drug_lab : '',
        name : '',
        active: '',
        active_percentage: null,
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);
        setShowMessage(true);

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" 
    autoFocus onClick={() => setShowMessage(false)} /></div>;

    useEffect(() => {
        setDisplay(emergentEditDrugState); 
    }, [emergentEditDrugState]);

    const dialogFuncMap = {
        display: setDisplay,
    };

    const onHide = (name) => {
        menuContext.settingEmergentEditDrugState();
        dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
        return (
            <div>
                <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    onClick={() => onHide(name)}
                    className="p-button-text"
                />
                <Button
                    label="Crear"
                    type='submit'
                    onClick={handleSubmit(onSubmit)}
                    icon="pi pi-check" />
            </div>
        );
    };

    return (
        <div className="flex flex-col">
            <Toast ref={toast} />
            <Dialog
                breakpoints={{'960px': '75vw', '640px': '100vw'}}
                header="Editar medicamento"
                visible={display}
                style={{ width: '50vw' }}
                footer={renderFooter('display')}
                onHide={() => onHide('display')}
            >

            <div className="form-demo w-full">
                    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top"  
                    footer={dialogFooter}  showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="flex justify-content-center flex-column pt-6 px-3">
                            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                <b>{code}</b> editado con éxito.
                            </p>
                        </div>
                    </Dialog>

                    <div className="m-1 w-full flex justify-content-center">

                        <div className="card w-full">
                            
                            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 p-fluid w-full">


                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Nombre</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>


                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="drug_lab" control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="drug_lab" className={classNames({ 'p-error': errors.name })}>Laboratorio</label>
                                    </span>
                                    {getFormErrorMessage('drug_lab')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="active" control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="active" className={classNames({ 'p-error': errors.name })}>Activo</label>
                                    </span>
                                    {getFormErrorMessage('active')}
                                </div>


                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="frequency" control={control}  render={({ field, fieldState }) => (
                                            <InputNumber  mode="decimal"
                                            minFractionDigits={2} id={field.name} {...field} 
                                            min="0" onChange={(e) => field.onChange(e.value)}/>
                                        )} />
                                        <label htmlFor="frequency" >Porcentaje de activo</label>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </Dialog>
        </div>
    )



}