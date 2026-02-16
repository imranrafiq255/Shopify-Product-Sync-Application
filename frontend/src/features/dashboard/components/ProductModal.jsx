import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../app/hooks";
import { createProduct, updateProduct } from "../dashboardSlice";

const schema = Yup.object({
  title: Yup.string().required("Required"),
  body_html: Yup.string(),
  vendor: Yup.string(),
  productType: Yup.string(),
});

export default function ProductModal({ product, onClose }) {
  const dispatch = useAppDispatch();

  const initialValues = {
    title: product?.title || "",
    body_html: product?.descriptionHtml || "",
    vendor: product?.vendor || "",
    product_type: product?.productType || "",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-1/3 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">
          {product ? "Update Product" : "Add Product"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values) => {
            try {
              if (product) {
                // Update product
                const updated = await dispatch(
                  updateProduct({
                    id: product.shopifyProductId,
                    values,
                  }),
                ).unwrap();
                console.log("Updated product:", updated);
              } else {
                const created = await dispatch(createProduct(values)).unwrap();
                console.log("Created product:", created);
              }
              onClose();
            } catch (error) {
              console.error("Product save failed:", error);
              // Optional: show toast / error message
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
              <Field
                name="title"
                placeholder="Title"
                className="w-full border px-3 py-2 rounded"
              />
              <Field
                name="body_html"
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
              />
              <Field
                name="vendor"
                placeholder="Vendor"
                className="w-full border px-3 py-2 rounded"
              />
              <Field
                name="product_type"
                placeholder="Product Type"
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="border px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded cursor-pointer"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
