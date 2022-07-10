import Select from "react-select";

export const FormikSelect =({
    options,
    field,
    form,
  }:any) => {
    return (
      <Select
        name={field.name}
        onBlur={field.onBlur}
        onChange={({ value }:any) => form.setFieldValue(field.name, value)}
        options={options}
        value={(() => {
          if (!options) return '';
          for (let optionsLength = options.length, i = 0; i < optionsLength; i++) {
            const option = options[i];
            if (option.options) {
              const valueCandidate = option.options.find(({ value }:any) => value === field.value);
              if (valueCandidate) return valueCandidate;
            }
            if (option.value === field.value) return option.value;
          }
          return '';
        })()}
      />
    );
  }