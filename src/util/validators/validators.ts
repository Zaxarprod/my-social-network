
type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) =>{
	if(!value) return "Field is null";
	return undefined;
}

export const maxLength = (max: number): ValidatorType =>
	(value) => {
	if(value && value.length > max) return `Max length is ${max}`;
	return undefined;
}