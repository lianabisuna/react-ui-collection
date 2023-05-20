import axios from "@/plugins/axios";

export default {
	show(id: number) {
		axios.get(`/product/${id}`);
	},
	list(params?: object) {
		axios.get('/product', { params });
	},
	create(params: object) {
		axios.post('/product', params);
	}
}