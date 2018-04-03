import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('alumni', {
	firstName:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	company:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	position:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	graduationYear:{
		type: DataTypes.STRING,
		validate:{
			is:{
				args: /^\d{4}$/,
				msg: 'Must be a valid year.',
			},
		},
		allowNull: false,
	},
	contactEmail:{
		type: DataTypes.STRING,
		validate:{
			is:{
				args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				msg: 'Please enter a valid email.',
			},
		},
		allowNull: false,
	},
	contactPhone:{
		allowNull: true,
		type: DataTypes.STRING,
		validate:{
			is:{
				args: /^\d?\+?\(?\d{3}\)?\ ?-?\d{3}\ ?-?\d{4}$/,
				msg: 'Please enter a valid phone number.',
			},
		},
	},
	major:{
		allowNull: false,
		type: DataTypes.STRING,
	},
	id: {
		type: DataTypes.STRING,
		allowNull: false,
	}
},	{
		scopes:{
			paginate,
		}
});
