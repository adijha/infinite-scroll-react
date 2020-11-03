import axios from "axios";
const getImages = async (page) => {
	try {
    console.log(`got page ${page} at api file`)
		const response = await axios.get(
			`https://picsum.photos/v2/list?page=${page}&limit=10`
		);
		console.log(response.data, "at api file");
		return response.data;
	} catch (e) {
		console.log("there is an error");
		throw e;
	}
};

export default {
	getImages,
};
