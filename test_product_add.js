
async function test() {
    const product = {
        title: "Test Product " + Date.now(),
        price: 100,
        image: "http://example.com/image.png",
        description: "This is a test description",
        category: "General",
        brand: "TestBrand",
        rating: { rate: 5, count: 1 }
    };

    console.log("Adding product...");
    try {
        const res = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        const detailed = await res.json();
        console.log("Add Response Status:", res.status);
        console.log("Add Response Body:", JSON.stringify(detailed, null, 2));

        if (res.ok) {
            console.log("Fetching products...");
            const getRes = await fetch('http://localhost:3000/products');
            const products = await getRes.json();
            const found = products.find(p => p.title === product.title);

            if (found) {
                console.log("Product Found!");
                console.log("Description:", found.description);
                if (found.description === product.description) {
                    console.log("SUCCESS: Description matches.");
                } else {
                    console.log("FAILURE: Description mismatch or missing.");
                }
            } else {
                console.log("FAILURE: Product not found in list.");
            }
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
