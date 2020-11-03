import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState, useRef } from "react";
import { getImages } from "./dataAction";

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
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				// alignItems: "center",
				justifyContent: "center",
			}}
		>
			{images &&
				images.map((post, index) => {
					return (
						<div
							key={index}
							style={{
								margin: "1rem",
								// border: "solid 1px #eee",
								position: "relative",
								width: "25%",
								height: "25%",
				boxShadow:'unset 8px 8px 8px 8px #F1F1F1'

							}}
						>
							<p
								style={{
									position: "absolute",
									backgroundColor: "#7A2445",
									color: "white",
									fontSize: "12px",
									padding: "5px",
									right: "5px",
									top: "-5px",
								}}
							>
								MUSIC
							</p>
							<img
								src={post.download_url}
								style={{
									width: "100%",
									objectFit:'cover',
									height:'13rem'
								}}
							/>
							<div
								style={{
									padding: 0,
									paddingLeft: "10px",
									paddingRight: "10px",
								}}
							>
								<p style={{ fontSize: "15px",fontWeight:'bold' }}>Barcadi NH7 Weekender 2020</p>
								<p style={{ fontSize: "13px", color: "#666465" }}>
									Devember 5 -6 | 7 PM
								</p>
								<p style={{ fontSize: "13px", color: "#666465" }}>
									Live On Insider
								</p>
								<div
									style={{
										display: "flex",
										alignItems: "flex-start",
										justifyContent: "space-between",
									}}
								>
									<p style={{ fontSize: "13px",fontWeight:'500' }}>$199 onwards</p>
									<p style={{ fontSize: "20px", fontWeight: "bold" }}>
										{index > 0 && index}{" "}
										<i
											class="fa fa-heart-o"
											style={{ fontSize: "20px", fontWeight: "bold" }}
										></i>
									</p>
								</div>
							</div>
						</div>
					);
				})}

			{/* <!-- Add Ref to Load More div --> */}
			<div className="loading" ref={loader}>
				<h2>Loading More</h2>
			</div>
		</div>
	);
};

export default InfiniteScroll;
