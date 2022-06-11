import qs from "qs"
import React, { useContext, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { fetchProductsAPI } from "../api/products"
import { InfiniteScroll } from "../components/infinite-scroll/infinite-scroll"
import { Loading } from "../components/loading"
import { ProductCard } from "../components/product-card/product-card"
import { Card } from "../components/ui/card/card"
import { DropDown } from "../components/ui/dropdown/dropdown"
import { Label } from "../components/ui/typography/label"
import { TitleOverLine } from "../components/ui/typography/title-over-line"
import { SSRContext } from "../contexts/ssr-context"
import { BASE_MEDIA_URL } from "../utils/constants"

export const HomePage = () => {

	/**
	 * Initial data from SSR context
	 */
	const [data, setData] = useState(useContext(SSRContext) || window?.__INITIAL_DATA__);

	/**
	 * Loading status
	 */
	const [loading, setLoading] = useState(false);

	/**
	 * get/set query params using react-router-dom's useSearchParams hook
	 */
	let [searchParams, setSearchParams] = useSearchParams();

	/**
	 * search params as object for easier manipulation
	 */
	const searchParamsDict = Object.fromEntries([...searchParams]);

	/**
	 * refrence for checking initial render
	 */
	const isInitialRender = React.useRef(true);


	/**
	 * fetch products on mount in case of client side rendering
	 */
	useEffect(() => {
		if (data === undefined) {
			loadWithParams(searchParamsDict)
		}
	}, []);


	/**
	 * fetch products on search params change
	 * except for initial render
	 */
	useEffect(() => {
		if (isInitialRender.current === false) {
			loadWithParams(searchParamsDict);
		} else {
			isInitialRender.current = false;
		}
	}, [searchParams])

	/**
	 * Fetching products from API
	 * @param {page: 1, ordering: 'newest', category: 'category-1' } params 
	 * @returns Promise 
	 */
	const loadWithParams = (params) => {

		if (loading) return;

		setLoading(true);
		return fetchProductsAPI({...params}).then(data => {
			setData(data);
			setLoading(false);
		}).catch(err => {
			console.log("error", err);
			setLoading(false);
		})

	}

	/**
	 * patch query params with new values
	 * also updates search params to load new data
	 */
	const handlePatchFilter = (filter, value) => {
		const newFilters = {
			...searchParamsDict,
			[filter]: value,
			page: 1
		}
		setSearchParams(newFilters);
	}


	/**
	 * handling infinite scroll next page load
	 * fetching new data from API and appending to existing data
	 */
	const handleNextPage = () => {

		const newPageNumber = data?.result?.page_number + 1 || 2;
	
		return fetchProductsAPI({...searchParamsDict, page: newPageNumber}).then(data => {

			/** append fetched data */
			setData(prevData => ({
				...data,
				result: {
					...data.result,
					products: [
						...prevData.result.products,
						...data.result.products
					]
				}
			}))

			/** prevent reloading by query params change */
			isInitialRender.current = true;

			/** update query params */
			setSearchParams({
				...searchParamsDict,
				page: newPageNumber
			})
			return data;
		}).catch(err => {
			console.log("error", err);
		})

	}

	/**
	 * Rendering the UI
	 */
	return (
		<div className="bg-gray-50 min-h-screen py-10">
			
			<div className="max-w-7xl mx-auto px-4">
				
				{/** Page Title `h1` tag  */}
				<TitleOverLine>استیکرهای فیلم، سریال و انیمیشن</TitleOverLine>
				
				{/** Filters */}
				<Card className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8"}>

					{/** Ordering Filter */}
					<div>
						<Label className="mb-4">ترتیب نمایش</Label>
						<DropDown 
							placeholder={"ترتیب نمایش"}
							options={[
								{label: "پرفروش ترین", value: "most-sold"},
								{label: "جدیدترین", value: "newest"},
								{label: "قدیمی ترین", value: "oldest"},
							]}
							onChange={ordering => handlePatchFilter("ordering", ordering)}
							defaultValue={searchParamsDict.ordering || "most-sold"}
						/>
					</div>

					{/** Category Filter */}
					<div>
						<Label className="mb-4">دسته بندی</Label>
						<DropDown 
							placeholder={"دسته بندی"}
							options={[
								{label: "همه دسته‌ها", value: ""},
								...(data?.result?.categories || [])?.map(category => ({
									label: category.name,
									value: category.id.toString()
								}))
							]}
							onChange={category => handlePatchFilter("category", category)}
							defaultValue={searchParamsDict.category || ""}
						/>
					</div>

					{/** Limit Filter */}
					<div>
						<Label className="mb-4">تعداد در هر صفحه</Label>
						<DropDown 
							placeholder={"تعداد در هر صفحه"}
							options={[
								{label: "10", value: "10"},
								{label: "20", value: "20"},
								{label: "50", value: "50"},
							]}
							onChange={limit => handlePatchFilter("limit", limit)}
							defaultValue={searchParamsDict.limit || "20"}
						/>
					</div>
				</Card>

				{/** Showing the Products */}
				<Loading active={loading}>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{data?.result?.products?.map(product => 
							<ProductCard 
								key={product.id} 
								title={product?.name} 
								price={product?.product_variants?.[0]?.price} 
								image={`${BASE_MEDIA_URL}${product?.images?.[0].url}`} 
								/>
						)}
					</div>
				</Loading>

				{/** Infinite scroll observer */}
				{data &&
					<InfiniteScroll onNext={handleNextPage} hasMore={data?.result?.has_next} />
					}

				{/** `Hidden next page link` helps crawlers to find all pages in website   */}
				<div className={`my-6 text-center hidden`}>
					<Link to={`/?${qs.stringify({...searchParamsDict, page: data?.result?.page_number + 1})}`}>
						صفحه بعد
					</Link>
				</div>
			</div>
		</div>
	)
}