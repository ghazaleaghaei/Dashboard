import { Link } from "react-router-dom"

function Pagination({ length, pageNum }) {
    const num = Math.ceil(length / 6)
    return (
        <div class="flex justify-center">
            {[...Array(num)].map((item, index) => (
                <Link
                    to={`${index == 0 ? "" : `?_page=${index + 1}`}`}
                    class={`px-3 py-1 rounded-md ${((pageNum == index + 1) || (index == 0 && pageNum == 0)) && "bg-sky-600 text-white"}`}
                    key={index}>
                    {index + 1}
                </Link>
            ))}
        </div>
    )
}
export default Pagination