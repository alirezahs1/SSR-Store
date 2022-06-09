import React, { useState } from "react"
import { InfiniteScroll } from "../components/infinite-scroll/infinite-scroll"
import { ProductCard } from "../components/product-card/product-card"
import { Card } from "../components/ui/card/card"
import { DropDown } from "../components/ui/dropdown/dropdown"
import { Label } from "../components/ui/typography/label"
import { TitleOverLine } from "../components/ui/typography/title-over-line"

export const HomePage = () => {

	const [page, setPage] = useState(0);

	const load = (page) => {
		return new Promise(resolve => {
			setTimeout(() => {
				setPage(1);
				resolve(page);
				console.log("resolved")
			}, 5000)
		});
	}

	return (
		<div className="bg-gray-50 min-h-screen py-10">
			
			<div className="max-w-6xl mx-auto">
				
				<TitleOverLine>استیکرهای فیلم، سریال و انیمیشن</TitleOverLine>
				
				<Card className={"grid grid-cols-4 gap-10 mb-8"}>
					<div>
						<Label className="mb-4">ترتیب نمایش</Label>
						<DropDown 
							placeholder={"ترتیب نمایش"}
							options={[
								{label: "جدیدترین", value: "newest"},
								{label: "پربازدیدترین", value: "most-viewed"},
								{label: "پرفروش ترین", value: "most-sold"},
							]}
						/>
					</div>
					<div>
						<Label className="mb-4">دسته بندی</Label>
						<DropDown 
							placeholder={"دسته بندی"}
							options={[
								{label: "جدیدترین", value: "newest"},
								{label: "پربازدیدترین", value: "most-viewed"},
								{label: "پرفروش ترین", value: "most-sold"},
							]}
						/>
					</div>
				</Card>

				<div className="grid grid-cols-4 gap-6">
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
					<ProductCard title={"استیکر Stewie"} price={5278} image="https://geektori.ir/uploads/image/rootimage/17078/3c448648153cdfdde40e754bba589c82.jpg?w=400&h=400&q=90" />
				</div>

				<InfiniteScroll onNext={load} hasMore={page<1} />
			</div>
		</div>
	)
}