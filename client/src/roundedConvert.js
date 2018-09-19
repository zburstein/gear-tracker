import convert from 'convert-units';

export function roundedConvert(weight_in_grams, display_metric){
	return Math.round(convert(weight_in_grams).from("g").to(display_metric) * 100) / 100;
}