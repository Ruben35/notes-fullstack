import React, { useRef, useCallback } from 'react'

interface Props {
	label?: string
	placeholder?: string
	value?: string
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
	myRef?: React.RefObject<HTMLTextAreaElement>
	rows?: number
}

const TextArea: React.FC<Props> = ({
	label = 'Label',
	placeholder = 'Input text',
	value,
	onChange,
	myRef,
	rows,
}) => {
	return (
		<label className='textField'>
			<span className='buttonText'>{label}</span>
			<textarea
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				ref={myRef}
				rows={rows}
				onInput={() => {
					if (myRef && myRef.current) {
						myRef.current.style.height = ''
						myRef.current.style.height = myRef.current.scrollHeight + 'px'
					}
				}}
			/>
		</label>
	)
}

export default TextArea
