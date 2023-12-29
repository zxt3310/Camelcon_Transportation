export function city_format(province, city) {
	let res = ""
	switch (province) {
		case "北京市":
		case "上海市":
		case "重庆市":
		case "天津市":
			res = province
			break;
		default:
			res = city
			break;
	}
	return res
}