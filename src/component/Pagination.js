const Pagination = ({ page, handlePageChange, paginatedProducts, itemsPerPage }) => {
    return (
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={paginatedProducts.length < itemsPerPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  