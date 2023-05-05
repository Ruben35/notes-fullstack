import React from 'react'

interface Props {
	children?: string
	onClick: () => any
}

const Button: React.FC<Props> = ({ children = 'Button', onClick }) => {
	return <button onClick={onClick}>{children}</button>
}

export default Button
