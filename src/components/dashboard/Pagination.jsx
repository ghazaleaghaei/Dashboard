import { Link } from "react-router-dom"

function Pagination({ length }) {
    const num = Math.ceil(length / 6)
    return (
        <div class="flex justify-center">
            {[...Array(num)].map((item, index) => (
                <Link
                    to={`?_page=${index + 1}`}
                    class="px-3 py-4"
                    key={index}>
                    {index + 1}
                </Link>
            ))}
        </div>
    )
}
export default Pagination