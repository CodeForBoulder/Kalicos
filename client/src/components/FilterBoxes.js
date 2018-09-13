import React from 'react'
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';

const SwitchFor = ({text}) => (
	<FormControlLabel label={text} control={<Switch defaultChecked/>}>
	</FormControlLabel>
)

const FilterBoxes = () => (
	<FormGroup>
		<SwitchFor text='Donate Items'/>
		<SwitchFor text='Amazon Smile'/>
		<SwitchFor text='Guidestar'/>
		<SwitchFor text='Donate Funds'/>
		<SwitchFor text='Volunteer'/>
		<SwitchFor text='Shop or Store'/>
	</FormGroup>
)


export default FilterBoxes