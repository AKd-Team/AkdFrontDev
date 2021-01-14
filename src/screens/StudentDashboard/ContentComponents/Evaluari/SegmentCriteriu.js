import React, { useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Segment, GridColumn} from 'semantic-ui-react'
import * as Transition from "react-reveal";
import map from 'lodash/map';
import startCase from 'lodash/startCase';

const useStyles2 = makeStyles({
    root:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:'2%',
        display: 'flex'
    },
    radioBtns:{
        marginLeft:'40%',
        marginTop:'2%',
        marginBottom:'2%'
    },
    crit:{
        marginBottom:'2%',
        marginTop:'2%',
        fontSize:17,
        marginLeft:'2%'
    }
})
const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
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

const  StyledRadio = ({ id, handleChange, name, form}) => {
    const classes = useStyles();

    return (
        <>
            <Radio
                className={classes.root}
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                id={id}
                name={name}
                onChange={handleChange}
                value={id}
                checked={form[name] === id}
            />
        </>

    );
}

const SegmentCriteriu=({criteriu})=>{

    const classes2=useStyles2();
    const [form, setForm] = useState({
        nota: ''
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prevFormValues) => ({
            ...prevFormValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    return(

         <Transition.Fade bottom cascade>
                 <Segment raised style={{marginLeft:'20%',marginRight:'20%', marginBottom:'0.5%'}} className={classes2.root}>
                     {map(form, (val, key) => (
                         <div key={key}>
                             {`${startCase(key)}: `}
                             {`${val}`}
                         </div>
                     ))}
                     <GridColumn className={classes2.crit}> {criteriu.descriere} </GridColumn>
                    <GridColumn className={classes2.radioBtns}>
                        <FormControl >
                             <FormLabel component="legend">Nota</FormLabel>
                            <RadioGroup row>
                               <FormControlLabel label="1" control={<StyledRadio form={form} name="nota"  id="1" handleChange={handleChange}/>} />
                                <FormControlLabel label="2" control={<StyledRadio form={form} name="nota"  id="2" handleChange={handleChange}/>} />
                                <FormControlLabel label="3" control={<StyledRadio form={form} name="nota"  id="3" handleChange={handleChange}/>} />
                                <FormControlLabel label="4" control={<StyledRadio form={form} name="nota"  id="4" handleChange={handleChange}/>} />
                                <FormControlLabel label="5" control={<StyledRadio form={form} name="nota"  id="5" handleChange={handleChange}/>} />
                            </RadioGroup>
                         </FormControl>
                    </GridColumn>
                </Segment>
         </Transition.Fade>
    );
};

export default SegmentCriteriu;