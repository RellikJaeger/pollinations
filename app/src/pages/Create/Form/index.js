import styled from '@emotion/styled';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import { useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import CustomizeParameters from './CustomizeParameters';
import SelectModel from './SelectModel';
import PrimaryInput from './PrimaryInput';
import { getInitialValues, getInputs } from './utils';

import Debug from "debug";

const debug = Debug("Create/Form/index");

const Form = ({ ipfs, Results, onSubmit, isDisabled, selectedModel, onSelectModel, hasSelect, models }) => {

  debug("rerender");

  const formik = useFormik({
      initialValues: {},
      onSubmit,
      enableReinitialize: true,
  });

  const { inputs, primary_input } = useMemo(
    () => getInputs(models, selectedModel), 
    [models, selectedModel]
  );


  useEffect(()=> {
    if (!selectedModel)
      return;
    
    const values = getInitialValues(inputs, primary_input)

    debug("initalValues", values);

    // add other fields to the form when user selects the desired model.
    formik.setValues({ 
      // all parameters for the form
      ...values,
      
      // override the primary_input value with the old one.
      [primary_input.key]: formik.values[Object.keys(formik.values)[0]]
    })
},[selectedModel, inputs, primary_input])

  useEffect(()=>{
    if (!ipfs.input) return;
    const { model_image, caching_seed, ...values} = ipfs.input;

    formik.setValues({ ...formik.values, ...values });
  },[ipfs?.input])
    



  return <StyledForm onSubmit={formik.handleSubmit} >

    { hasSelect &&
      <SelectModel 
        models={models} 
        isDisabled={isDisabled}
        selectedModel={selectedModel} 
        onSelectModel={onSelectModel}
      />
    }

      <>

        <PrimaryInput
          isDisabled={isDisabled || !selectedModel.key}
          formik={formik}
          selectedModel={selectedModel}
          primary_input={primary_input}
        />
        
        <ParametersAndResultsStyled>

        {Results}
        <CustomizeParameters
          isDisabled={isDisabled}
          inputs={inputs}
          formik={formik}
          credits={selectedModel?.credits}
          />
        </ParametersAndResultsStyled>

      </>


  </StyledForm>
}

export default Form;


const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
gap: 2em;
width: 100%;
`

const ParametersAndResultsStyled = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
`

