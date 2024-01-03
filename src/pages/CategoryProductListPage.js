import React from 'react';
import { useParams } from 'react-router-dom'; 
import CategoryProductList from "../features/product/components/CategoryProductList";

function CategoryProductListPage() {
    const { category } = useParams();

    return ( 
        <div>
            <CategoryProductList category={category}></CategoryProductList>
        </div>
     );
}

export default CategoryProductListPage;
