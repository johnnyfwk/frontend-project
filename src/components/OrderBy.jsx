export default function OrderBy( {orderBy, setOrderBy} ) {

    function sortAscending(event) {
        event.preventDefault();
        setOrderBy(event.target.value);
    }

    function sortDescending(event) {
        event.preventDefault();
        setOrderBy(event.target.value);
    }

    return (
        <section id="order-by">
            <h3>Order by:</h3>
            <form>
                <label htmlFor="ascending"></label>
                <button onClick={sortAscending} value="asc" disabled={orderBy === "asc"}>Ascending</button>
                <label htmlFor="descending"></label>
                <button onClick={sortDescending} value="desc" disabled={orderBy === "desc"}>Descending</button>
            </form>
        </section>
    )
}