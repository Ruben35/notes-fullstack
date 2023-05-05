import React from 'react'

interface Props {
	label?: string
	placeholder?: string
	value?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	type: string
	myRef?: React.RefObject<HTMLInputElement>
}

const Textfield: React.FC<Props> = ({
	label = 'Label',
	placeholder = 'Input text',
	value,
	type,
	onChange,
	myRef,
}) => {
	return (
		<label className='textField'>
			<span className='buttonText'>{label}</span>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				ref={myRef}
			/>
		</label>
	)
}

export default Textfield
