import CarsPageLayout from '@/Components/FrontComponents/CarsPageLayout/CarsPageLayout'
import React from 'react'

function page() {
	return (
		<CarsPageLayout />
	)
}

export default page

export async function generateMetadata(props) {
	const {
		params: {
			slug: [slug],
		},
	} = props;

	// Capitalize category name nicely
	const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

	return {
		title: `${categoryName === "All" ? "Cars" : categoryName} | OneTapDrive`,
		description: `Explore the best offers on ${categoryName} at OneTapDrive. Choose from a wide range of cars, from luxury to economy, available for daily, weekly, or monthly rentals. Find the perfect car easily and enjoy flexible rental plans across Dubai, Abu Dhabi, Sharjah, and more.`,
		alternates: {
			canonical: `https://www.onetapdrive.com/cars/${slug}`, // if needed later
		}
	};
}
