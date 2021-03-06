import React, { useState } from 'react';
import { Input, Button } from '../atoms';
import { FormControl } from '@material-ui/core';
import { createCommand } from '../../utils';

function Form(props) {
  const [form, setForm] = useState({
    name: '',
    code: '',
    uuid: null,
  });

  useState(() => {
    const { nameToSet, codeToSet, uuidToSet } = props;
    console.log(props);

    if (nameToSet && codeToSet && uuidToSet) {
      setForm({
        name: nameToSet,
        code: codeToSet,
        uuid: uuidToSet,
      });
    }

    return () => {
      props.location.state = null;
    };
  }, []);

  const validations = () => {
    let error = '';
    let haveError = false;
    if (form.name.length > 20) {
      error = 'Name too long';
      haveError = true;
    }
    if (form.name.trim().length <= 0) {
      error = 'Name field cannot be empty';
      haveError = true;
    }

    return {
      error,
      haveError,
    };
  };

  const handleSubmit = () => {
    const validation = validations();
    if (!validation.haveError) {
      createCommand(form);
      setForm({
        name: '',
        code: '',
        uuid: '',
      });
    } else {
      alert(validation.error);
    }
  };

  return (
    <>
      <FormControl>
        <Input
          label="Name"
          variant="outlined"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          multiline
          rows={8}
          width="500px"
          label="Code"
          variant="outlined"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Enviar
        </Button>
      </FormControl>
    </>
  );
}

export default Form;
