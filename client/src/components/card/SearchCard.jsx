import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

//   console.log(categories);
  useEffect(() => {
    getCategory();
  }, []);

  // 1 search by text
  const [text, setText] = useState("")
  const [categorySelected, setCategorySelected] = useState([])
  const [price, setPrice] = useState([0,100000])
  const [ok, setOk] = useState(false)


  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // 2 search by category
  const handleCheck = (e)=> {
    // console.log(e.target.value)
    const inCheck = e.target.value        // value was checked
    const inState = [...categorySelected] // [] empty array
    const findCheck = inState.indexOf(inCheck) // if wasn't found will return -1
    if(findCheck === -1) {
        inState.push(inCheck)
    } else {
        inState.splice(findCheck, 1)
    }
    setCategorySelected(inState)
    
    if(inState.length > 0 ) {
        actionSearchFilters({ category: inState })
    } else {
        getProduct()
    }
  }
  // 3 search by period price
  useEffect(()=>{
    actionSearchFilters({price})
  },[ok])

  const handlePrice = (value) => {
    // console.log(value);
    setPrice(value)
    setTimeout(()=>{
        setOk(!ok)
    },300)
    
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Product</h1>
      {/* 1 search by text */}
      <input
        onChange={(e) => setText(e.target.value)}
        className="border rounded-md w-full mb-4 px-2"
        type="text"
        placeholder="Search Product"
      />
      <hr />
      {/* 2 search by category */}
      <div>
        <h1 className="mt-3 mb-1">Category</h1>
        <div>
            {
                categories.map((item, index)=>
                    <div 
                        key={index}
                        className="flex gap-3">
                        <input 
                        onChange={handleCheck}
                            value={item.id}
                            type="checkbox" />
                        <label>{item.name}</label>
                    </div>
                )
            }
        </div>
      </div>
      <hr className="mt-3 mb-1"/>
      {/* 3 search by period price */}
      <div>
            <h1>Period Price</h1>
            <div>
                <div className="flex justify-between">
                    <span>Min : {price[0]}</span>
                    <span>Max : {price[1]}</span>
                </div>
                <Slider 
                    onChange={handlePrice}
                    range
                    min={0}
                    max={100000}
                    defaultValue={[10000,90000]}
                />
            </div>
      </div>
    </div>
  )
}

export default SearchCard;
