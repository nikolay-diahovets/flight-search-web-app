import React, { useState } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const NO_OP = () => {};

// const filtersExample = [
//   { name: "some name1", label: "some label1", value: 0, checked: false },
//   { name: "some name2", label: "some label2", value: 1, checked: false },
// ];

export const FlightFilter = ({ label, filters, onChange = NO_OP }) => {
  const [values = [], setValues] = useState(filters);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    const result = values.map((filter) => {
      if (name === filter.name) {
        return { ...filter, checked };
      }

      return filter;
    });
    const filtered = result
      .filter((item) => item.checked)
      .map(item => item.value);

    onChange(filtered)

    setValues(result);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
      >
        {label}
      </AccordionSummary>
      <AccordionDetails className="flex-column">
        {
          values.map((filter, index) => {
            const { name, label, value, checked } = filter;
            return (
              <FormControlLabel
                className="mb-0"
                key={index}
                label={label}
                control={
                  <Checkbox
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    value={value}
                    color="primary"
                  />
                }
              />
            );
          })
        }
      </AccordionDetails>
    </Accordion>
  );
};
