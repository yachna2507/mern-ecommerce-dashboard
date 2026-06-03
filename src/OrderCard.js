





function OrderCard({order, deleteOrder, editOrder }) {
    return (
        <div className="order-box">
            <h3>{order.product_name}</h3>
            <p>Price: {order.price}</p>
            <p>Quantity: {order.quantity}</p>
            <button onClick={() => deleteOrder(order._id)}>
                Delete
            </button>

            <button onClick={() => editOrder(order)}>
                Edit
            </button>
        </div>
    );
}
export default OrderCard;