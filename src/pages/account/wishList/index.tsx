import { Pagination } from 'components/Pagination'
import { WishItem } from 'components/WishItem'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StateStore } from 'store'
import { fetchWishlistAction, wishlistAction } from 'store/actions/wishlistAction'
import { convertQueryURLToObject } from 'utils'

export interface WishType {
  userId: number,
  id: number,
  title: string,
  body: string
}

const Wishlist: React.FC = () => {
  let queryURLObject = convertQueryURLToObject<{ page: string }>()

  let dispatch = useDispatch()
  useEffect(() => {
    
    try {
      dispatch(fetchWishlistAction())
    } catch (err) { }
  }, [queryURLObject.page])



  let wishlist = useSelector((store: StateStore) => store.wishlist)
  

  

  let [currentPage, setCurrentPage] = useState(parseInt(queryURLObject?.page || '1'))
  let [itemsPerPage] = useState(9)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = wishlist.list.slice(indexOfFirstItem, indexOfLastItem)
  
  const totalItems = wishlist.list.length

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <WishItem wishlist={currentItems}/>
      {/* Pagination 1 */}
      < Pagination currentPage={currentPage} totalPage={pageNumbers.length} paginate={paginate} />
    </>
  )
}

export default Wishlist
