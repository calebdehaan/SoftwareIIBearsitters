import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
	state = {
		isChecked: this.props.defaultCheck,
	};

	toggleCheckboxChange = () => {
		const {checkboxChange, name} = this.props;

		this.setState(({isChecked}) => ({
			isChecked: !isChecked,
		}));
		checkboxChange(name);
	};

	render() {
		const {label, name} = this.props;
		const {isChecked} = this.state;

		return (
			<label>
				<input
					type="checkbox"
					value={name}
					checked={isChecked}
					onChange={this.toggleCheckboxChange}
					className={'mx-4'}/>
				{label}
			</label>
		);
	}
}

Checkbox.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	checkboxChange: PropTypes.func.isRequired,
	defaultCheck: PropTypes.bool,
};

export default Checkbox;
