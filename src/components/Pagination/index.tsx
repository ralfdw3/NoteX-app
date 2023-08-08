import "./Pagination.css";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  handlePageNumber: (value: number) => void;
}

const Pagination = ({
  pageNumber,
  totalPages,
  handlePageNumber,
}: PaginationProps) => {
  return (
    <section className="list-pagination">
      <div
        onClick={() => {
          if (pageNumber > 0) {
            handlePageNumber(pageNumber - 1);
          }
        }}
      >
        <span className="page-changer">
          <span className="arrow">{"<"}</span>{" "}
        </span>
      </div>
      <span>
        Página {pageNumber + 1} de {totalPages}
      </span>
      <div
        onClick={() => {
          if (pageNumber + 1 < totalPages) {
            handlePageNumber(pageNumber + 1);
          }
        }}
      >
        <span className="page-changer">
          {" "}
          <span className="arrow">{">"}</span>{" "}
        </span>
      </div>
    </section>
  );
};
export default Pagination;
