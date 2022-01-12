import React from "react";

const Image = ({ src, alt, className }) => {
	return (
		<img
			src={src}
			alt="team"
			onError={({ currentTarget }) => {
				currentTarget.onerror = null;
				currentTarget.src = alt;
			}}
			className={className}
		/>
	);
};

export default Image;
