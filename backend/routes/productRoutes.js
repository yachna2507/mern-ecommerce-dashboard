app.post("/orders", async (req, res) =>
{ 
    console.log("Received:", req.body);
    try {
        const newOrder = new Order({
            customerName: req.body.customerName,
            product_name: req.body.product_name,
            price: req.body.price,
            quantity: req.body.quantity,
            user: req.user.id
        });

        const savedOrder = await newOrder.save();
        console.log("Saved to DB with ID:" , savedOrder._id);

        res.status(201).json(savedOrder);
    } catch (err) {
        console.log("Error saving:", err);
        res.send(400).json({ error:, err.message });
    }
});
//-- Read---
app.get('/orders', async(req, res) =>
{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page -1) * limit;
    const orders = await Order.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    const total = await Order.countDocuments();
    res.json({
        orders,
        totalPages: Math.ceil(total/limit),
        currentpage: page,
    });
    });
    //Update ------

app.put('/orders/:id', async (req, res) =>
{
    try {
        const updateOrder = 
        await Order.findByIdAndUpdate(req.params.id, req.body);
        res.send("order updated");

    } catch (err) {
 console.log(err);
        res.send("err");
    }
    
});

//-- delete-- 

app.delete('/orders/:id', async (req, res) =>
{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.send("Order deleted");
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


     
         
