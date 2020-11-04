import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState, useRef } from "react";
import { getImages } from "./dataAction";
import "./App.css";
const InfiniteScroll = () => {
	const dispatch = useDispatch();
	const images = useSelector((state) => state.images);

	const [page, setPage] = useState(1);
	// add loader refrence
	const loader = useRef(null);

	useEffect(() => {
		var options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		};

		const observer = new IntersectionObserver(handleObserver, options);
		if (loader.current) {
			observer.observe(loader.current);
		}
		dispatch(getImages(1));
	}, []);

	useEffect(() => {
		dispatch(getImages(page));
	}, [dispatch, page]);

	const handleObserver = (entities) => {
		const target = entities[0];
		if (target.isIntersecting) {
			setPage((page) => page + 1);
		}
	};

	return (
		<React.Fragment>
			<div className="container">
				{images &&
					images.map((post, index) => {
						return (
							<div key={index} className="product">
								<p className="tag">MUSIC</p>
								<div className="img-container">
									<img
										src={post.download_url}
										style={{
											width: "100%",
											objectFit: "cover",
											height: "13rem",
										}}
										alt="Avatar"
										class="image"
									/>
									<div class="middle">
										<div class="text">BUY</div>
									</div>
								</div>
								<div className="product-desc">
									<p className="product-title">Barcadi NH7 Weekender 2020</p>
									<p style={{ fontSize: "13px", color: "#666465" }}>
										Devember 5 -6 | 7 PM
									</p>
									<p className="product-location">Live On Insider</p>
									<div className="price-group">
										<p className="price">$199 onwards</p>
										<p className="likes">
											{index > 0 && index}{" "}
											<i class="fa fa-heart-o" className="likes"></i>
										</p>
									</div>
								</div>
							</div>
						);
					})}
			</div>
			{/* <!-- Add Ref to Load More div --> */}
			<div ref={loader}>
				<h2 className="loading">Loading More</h2>
			</div>
		</React.Fragment>
	);
};

export default InfiniteScroll;
