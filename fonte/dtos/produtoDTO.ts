export type ProdutoDTO = {
	id: string;
	name: string;
	description: string;
	is_new: boolean;
	price: number;
	accept_trade: boolean;
	user_id: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	product_images: { path: string; id: string }[];
	payment_methods: { key: "pix" | "card" | "boleto" | "cash" | "deposit"; name: string }[];
	user?: { avatar: string; name: string; tel: string };
};
