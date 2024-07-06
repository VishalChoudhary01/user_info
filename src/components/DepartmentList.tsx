import React, { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, Checkbox, FormControlLabel } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Typography } from '@mui/material';

const DepartmentList: React.FC = () => {
  const departments = [
    {
      department: 'customer_service',
      sub_departments: ['support', 'customer_success']
    },
    {
      department: 'design',
      sub_departments: ['graphic_design', 'product_design', 'web_design']
    }
  ];

  const [open, setOpen] = useState<string | null>(null);
  const [checked, setChecked] = useState<{ [key: string]: boolean[] }>({
    customer_service: [false, false],
    design: [false, false, false]
  });

  const handleClick = (department: string) => {
    setOpen(open === department ? null : department);
  };

  const handleParentChange = (department: string) => {
    const allChecked = checked[department].every(v => v);
    const newChecked = checked[department].map(() => !allChecked);
    setChecked({ ...checked, [department]: newChecked });
  };

  const handleChildChange = (department: string, index: number) => {
    const newChecked = [...checked[department]];
    newChecked[index] = !newChecked[index];
    setChecked({ ...checked, [department]: newChecked });
  };

  return (
    <List>
      {departments.map((dept) => (
        <div key={dept.department}>
          <ListItemButton
            onClick={() => handleClick(dept.department)}
            sx={{
              backgroundColor: open === dept.department ? '#f0f0f0' : 'transparent',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[dept.department].every(v => v)}
                  indeterminate={checked[dept.department].some(v => v) && !checked[dept.department].every(v => v)}
                  onChange={() => handleParentChange(dept.department)}
                />
              }
              label={<Typography variant="subtitle1">{dept.department}</Typography>}
            />
            <ListItemIcon>
              {open === dept.department ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={open === dept.department} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((sub, idx) => (
                <ListItemButton key={idx} sx={{ pl: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked[dept.department][idx]}
                        onChange={() => handleChildChange(dept.department, idx)}
                      />
                    }
                    label={<Typography variant="body2">{sub}</Typography>}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
