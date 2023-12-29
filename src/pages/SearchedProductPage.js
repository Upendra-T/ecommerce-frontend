import React from 'react';
import { useParams } from 'react-router-dom';
import SearchedProductList from '../features/product/components/SearchedProductList';

function SearchedProductPage() {
  
  const { category, title} = useParams();

  return (
    <div>
      <SearchedProductList category={category} title={title}></SearchedProductList>
    </div>
  );
}

export default SearchedProductPage;
