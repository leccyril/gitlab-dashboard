import React from 'react';
import {parseISO, format} from 'date-fns';

interface DateProps {
	isoDate: string;
}

const FormattedDate: React.FC<DateProps> = ({isoDate}) => {
	const date = parseISO(isoDate);
	const formattedDate = format(date, 'dd/MM/yyyy HH:mm');

	return <span>{formattedDate}</span>;
};

export default FormattedDate;