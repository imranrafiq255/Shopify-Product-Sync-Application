import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchProducts,
  setFilter,
  setSearch,
  deleteProduct,
} from "../dashboardSlice";
import ProductModal from "../components/ProductModal";
import ConfirmModal from "../components/ui/Modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { selectDashboard } from "../dashboardSelector";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { products, statusFilter, search, currentPage, totalPages } =
    useAppSelector(selectDashboard);

  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        search,
        status: statusFilter,
      }),
    );
  }, [dispatch, search, statusFilter, currentPage]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products"
          className="w-96 px-4 py-2 border rounded-lg"
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        <button
          onClick={() => {
            setEditProduct(null);
            setOpenModal(true);
          }}
          className="bg-black text-white rounded-lg mx-2 px-1 lg:text-lg lg:px-4 lg:py-2 cursor-pointer"
        >
          Add product
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-4 mb-6">
        {["all", "active", "draft"].map((status) => (
          <button
            key={status}
            onClick={() => dispatch(setFilter(status))}
            className={`px-4 py-2 rounded-full capitalize ${
              statusFilter === status
                ? "bg-black text-white"
                : "bg-white border"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow">
        {products.map((product) => (
          <div
            key={product.shopifyProductId}
            className="flex justify-between items-center px-6 py-4 border-b"
          >
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-gray-500">{product.vendor}</p>
            </div>

            <div className="flex gap-4">
              <PencilIcon
                className="w-5 cursor-pointer"
                onClick={() => {
                  setEditProduct(product);
                  setOpenModal(true);
                }}
              />
              <TrashIcon
                className="w-5 text-red-500 cursor-pointer"
                onClick={() => setDeleteId(product.shopifyProductId)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            dispatch(
              fetchProducts({
                page: currentPage - 1,
                search,
                status: statusFilter,
              }),
            )
          }
          className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer hover:bg-black hover:text-white"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            dispatch(
              fetchProducts({
                page: currentPage + 1,
                search,
                status: statusFilter,
              }),
            )
          }
          className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer hover:bg-black hover:text-white"
        >
          Next
        </button>
      </div>

      {/* Add / Update Product Modal */}
      {openModal && (
        <ProductModal
          product={editProduct}
          onClose={() => setOpenModal(false)}
        />
      )}

      {/* Delete Modal */}
      {deleteId && (
        <ConfirmModal
          title="Delete Product?"
          onConfirm={async () => {
            try {
              await dispatch(deleteProduct(deleteId)).unwrap();
              setDeleteId(null); // close modal immediately
            } catch (error) {
              console.error(error);
            }
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
