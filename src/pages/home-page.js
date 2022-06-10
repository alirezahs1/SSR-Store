import React, { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { fetchProducts } from "../api/products"
import { InfiniteScroll } from "../components/infinite-scroll/infinite-scroll"
import { ProductCard } from "../components/product-card/product-card"
import { Card } from "../components/ui/card/card"
import { DropDown } from "../components/ui/dropdown/dropdown"
import { Label } from "../components/ui/typography/label"
import { TitleOverLine } from "../components/ui/typography/title-over-line"
import { SSRContext } from "../contexts/ssr-context"

export const HomePage = () => {

	const ssrData = useContext(SSRContext);

	const [data, setData] = useState(ssrData);
	
	let [searchParams, setSearchParams] = useSearchParams();
	const searchParamsDict = Object.fromEntries([...searchParams])


	useEffect(() => {
		load(searchParams.toString());
	}, [searchParams]);

	useEffect(() => {
		console.log("ssr check")
		if (!ssrData) {
			console.log("load client")
			load(searchParams.toString());
		}
	}, [ssrData])

	const load = (params) => {
		fetchProducts({...params}).then(data => {
			setData(data);
			console.log("fetched", data);
		})
	}

	return (
		<div className="bg-gray-50 min-h-screen py-10">
			
			<div className="max-w-7xl mx-auto px-4">
				
				<TitleOverLine>استیکرهای فیلم، سریال و انیمیشن1234</TitleOverLine>
				
				<Card className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8"}>
					<div>
						<Label className="mb-4">ترتیب نمایش</Label>
						<DropDown 
							placeholder={"ترتیب نمایش"}
							options={[
								{label: "پرفروش ترین", value: "most-sold"},
								{label: "جدیدترین", value: "newest"},
							]}
							onChange={ordering => {
								setSearchParams({
									...searchParamsDict,
									ordering
								})
							}}
							defaultValue={searchParamsDict.ordering || "most-sold"}
						/>
					</div>
					<div>
						<Label className="mb-4">دسته بندی</Label>
						<DropDown 
							placeholder={"دسته بندی"}
							options={[
								{label: "همه دسته‌ها", value: ""},
								{label: "دسته اول", value: "category-1"},
								{label: "دسته دوم", value: "category-2"},
								{label: "دسته سوم", value: "category-3"},
								{label: "دسته چهارم", value: "category-4"},
							]}
							onChange={category => {
								setSearchParams({
									...searchParamsDict,
									category
								})
							}}
							defaultValue={searchParamsDict.category || ""}
						/>
					</div>
				</Card>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{data?.result?.products?.map(product => 
						<ProductCard key={product.id} title={product?.name} price={5278} image="https://geektori.ir/uploads/image/rootimage/17076/980351c8e2e95968cd6ce0440f77b004.jpg?w=600&h=600&q=90" />
					)}
				</div>

				{data &&
					<InfiniteScroll onNext={() => setSearchParams({...searchParams, page: data?.page_number + 1 || 2})} hasMore={data?.result?.has_next} />
					}
			</div>
		</div>
	)
}