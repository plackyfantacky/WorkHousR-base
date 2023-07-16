import React from 'react'

import styled from 'styled-components'
import ReactSlider from 'react-slider'
import { TEInput } from 'tw-elements-react'

const Slider = ({ params, onSliderChange }) => {
	let { min, max } = params
	const [ values, setValues ] = React.useState({ min: 0, max: 0})
	const [ value_min, setValueMin ] = React.useState(0)
	const [ value_max, setValueMax ] = React.useState(0)

	const StyledSlider = styled(ReactSlider)`
        width: 100%;
        height:2rem;
    `

	const StyledThumb = styled.div`
        height:2rem;
        line-height:2rem;
        width:2rem;
        text-align: center;
        background-color:#14532d;
        color:#FFFFFF00;
        
        border-radius: 50%;
        cursor: grab;
    `
	const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>

	const StyledTrack = styled.div`
        top: 0;
        bottom: 0;
        background: ${props => (props.index === 2 ? '#ddd' : props.index === 1 ? '#bbf7d0' : '#ddd')};
        border-radius: 999px;
    `

	const Track = (props, state) => <StyledTrack {...props} index={state.index} />

	const StyledContainer = styled.div`
        border:1px solid #14532d;
        border-radius: 999px;
        max-width: 100%;
        width: 100%;
    `

	const handleSliderChange = (value) => {
		setValues({min: value[0], max: value[1]})
		//doing something cheeky here. I'm passing the values back to the parent component via function prop
		onSliderChange(value)
	}

	React.useEffect(() => {
		setValues({ min: min, max: max })
	}, [min, max])

	React.useEffect(() => {
		let tmpMin = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(values.min)
		let tmpMax = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(values.max)
		setValueMin(tmpMin)
		setValueMax(tmpMax)
	}, [values])

	return (
		<div className="flex flex-col gap-4">
			<h5 className="text-lg font-medium leading-tight text-neutral-800">Price</h5>
			<StyledContainer>
				<StyledSlider
					defaultValue={[values.min, values.max]}
					min={min}
					max={max}
					onAfterChange={currentState => handleSliderChange(currentState)}
					renderTrack={Track}
					renderThumb={Thumb} />
			</StyledContainer>
			<div className="flex flex-col gap-4 justify-between">
				<TEInput label="Minimum" className="w-32" value={value_min} readOnly />
				<TEInput label="Maximum" className="w-32" value={value_max} readOnly />
			</div>
		</div>
	)
}

export { Slider }