import React from "react";
import Skeleton from "react-loading-skeleton";


const ProductCard = (props) => {
    let product = props.product
    return (
        <>

            <div className="p-6 shadow flex-col">
                <div className="">
                    {props.product.images ? <img className="w-full h-60" src={product.images[0]} /> : <Skeleton  count={10} />}                </div>
                <div className="">
                    <h1 className="text-xl  font-bold  mt-4 mb-4">{props.product.title || <Skeleton />}</h1>
                    <p className="text-gray-700">{props.product.description || <Skeleton/>}</p>
                    <div className="">
                        <p className="text-gray-700 text-xl">Price - Rs.{props.product.price || <Skeleton/>} </p>
                    </div>
                </div>
                <div className="flex flex-row mt-4 items-center justify-between">
                    <button className="py-2 px-4 bg-green-500 text-white hover:bg-black">View</button>
                    <button className="py-2 px-4 bg-blue-500 text-white hover:bg-black">Add to Cart</button>
                </div>

            </div>
        </>
    )
}

export default ProductCard;
