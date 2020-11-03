import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState, useRef } from "react";
import { getImages } from "./dataAction";

const divStyle = {
	color: "blue",
	height: "250px",
	textAlign: "center",
	padding: "5px 10px",
	background: "#eee",
	margin: "35px",
};

const containerStyle = {
	maxWidth: "1280px",
	margin: "0 auto",
};
const InfiniteScroll = () => {
	const dispatch = useDispatch();
	const images = useSelector((state) => state.images);
	const [postList, setPostList] = useState({
		list: [1, 2, 3, 4],
	});
	// tracking on which page we currently are
	const [page, setPage] = useState(1);
	// add loader refrence
	const loader = useRef(null);

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		};
		// initialize IntersectionObserver
		// and attaching to Load More div
		const observer = new IntersectionObserver(handleObserver, options);
		if (loader.current) {
			observer.observe(loader.current);
		}
		dispatch(getImages(1));
	}, []);

	useEffect(() => {

		dispatch(getImages(page));
	}, [page]);

	const handleObserver = (entities) => {
		const target = entities[0];
		if (target.isIntersecting) {
			setPage((page) => page + 1);
		}
	};

	return (
		<div className="container" style={containerStyle}>
			<div className="post-list">
				{images &&
					images.map((post, index) => {
						return (
							<div key={index} className="post" style={divStyle}>
								<h2> {index} </h2>
								<img src={post.download_url} style={{height:'100px'}} />
							</div>
						);
					})}
				{/* <!-- Add Ref to Load More div --> */}
				<div className="loading" ref={loader}>
					<h2>Loading More</h2>
				</div>
			</div>
		</div>
	);
};

export default InfiniteScroll;
