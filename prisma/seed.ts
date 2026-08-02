import { prisma } from "@/lib/prisma"; // استورد النسخة من ملفك

async function main() {
    console.log('🌱 Starting database seeding...');

    // 1. Check & Create Initial User (Required for Posts)
    let user = await prisma.user.findFirst();

    if (!user) {
        console.log('👤 No users found. Creating a default user...');
        user = await prisma.user.create({
            data: {
                id: 'usr_default_01',
                name: 'John Doe',
                email: 'john.doe@example.com',
                emailVerified: true,
                role: 'admin',
            },
        });
        console.log(`✅ Default user created with ID: ${user.id}`);
    } else {
        console.log(`ℹ️ Existing user found: ${user.name} (${user.id})`);
    }

    // 2. Seed Products (Check first to avoid duplicates)
    const existingProductsCount = await prisma.product.count();

    if (existingProductsCount === 0) {
        console.log('📦 Seeding Products...');

        const dummyProducts = [
            {
                name: 'Wireless Noise-Canceling Headphones',
                description: 'High-quality over-ear headphones with active noise cancellation.',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
                stock: 45,
            },
            {
                name: 'Mechanical Gaming Keyboard',
                description: 'RGB backlit mechanical keyboard with tactile switches.',
                price: 89.50,
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
                stock: 20,
            },
            {
                name: 'Ergonomic Office Chair',
                description: 'Breathable mesh chair with adjustable lumbar support.',
                price: 249.00,
                image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1299',
                stock: 12,
            },
            {
                name: 'Ultra-Wide 4K Monitor',
                description: '34-inch curved monitor for productivity and gaming.',
                price: 499.99,
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
                stock: 8,
            },
            {
                name: 'Minimalist Leather Backpack',
                description: 'Durable and stylish backpack suitable for laptops up to 15 inches.',
                price: 75.00,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
                stock: 30,
            },
            {
                name: 'Wireless Ergonomic Mouse',
                description: 'Precision wireless mouse designed for comfortable long working hours.',
                price: 49.99,
                image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
                stock: 50,
            },
            {
                name: 'Smartwatch Series X',
                description: 'Fitness tracking, heart rate monitor, and AMOLED display.',
                price: 179.00,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                stock: 25,
            },
            {
                name: 'Portable Bluetooth Speaker',
                description: 'Waterproof outdoor speaker with deep bass and 12-hour battery life.',
                price: 59.99,
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
                stock: 40,
            },
            {
                name: 'USB-C Studio Microphone',
                description: 'Professional condenser microphone for streaming, podcasting, and vocal recording.',
                price: 129.50,
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
                stock: 15,
            },
            {
                name: 'Aluminum Laptop Stand',
                description: 'Adjustable desk riser compatible with all MacBook and PC models.',
                price: 34.99,
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
                stock: 60,
            },
            {
                name: 'HD Webcam 1080p',
                description: 'Auto-focus webcam with dual noise-reducing microphones for Video Calls.',
                price: 64.99,
                image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc',
                stock: 35,
            },
            {
                name: 'Fast Wireless Charging Pad',
                description: '15W QI-certified charging station for smartphones and earbuds.',
                price: 29.99,
                image: 'https://images.unsplash.com/photo-1622445268141-84e1b01c4ec2',
                stock: 75,
            },
            {
                name: 'Electric Pour-Over Kettle',
                description: 'Precision temperature control kettle for specialty drip coffee.',
                price: 99.00,
                image: 'https://images.unsplash.com/photo-1570284613262-b17c2a270a4e',
                stock: 18,
            },
            {
                name: 'Manual Coffee Grinder',
                description: 'Stainless steel burr grinder with adjustable grind settings.',
                price: 42.50,
                image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6',
                stock: 22,
            },
            {
                name: 'Smart RGB LED Desk Lamp',
                description: 'Dimmable desk lamp with wireless charger base and app integration.',
                price: 55.00,
                image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c',
                stock: 28,
            },
            {
                name: 'Minimalist Wall Clock',
                description: 'Silent non-ticking quartz movement clock with modern wooden frame.',
                price: 27.99,
                image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c',
                stock: 40,
            },
            {
                name: 'Stainless Steel Water Bottle',
                description: 'Insulated 32oz flask that keeps beverages cold for 24 hours.',
                price: 24.99,
                image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
                stock: 100,
            },
            {
                name: 'Noise-Isolating In-Ear Earbuds',
                description: 'TWS earbuds with active noise cancellation and wireless charging case.',
                price: 119.99,
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
                stock: 32,
            },
            {
                name: 'Extended Gaming Desk Mat',
                description: 'Large stitched-edge water-resistant mouse pad for desk setup.',
                price: 19.99,
                image: 'https://images.unsplash.com/photo-1616440342855-38d58a8a65f9',
                stock: 85,
            },
            {
                name: 'Dual-Monitor Mount Arm',
                description: 'Fully adjustable gas spring desk stand for screens up to 32 inches.',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5',
                stock: 14,
            },
            {
                name: 'Smart Home Security Camera',
                description: '1080p HD WiFi camera with night vision and two-way audio.',
                price: 45.00,
                image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb',
                stock: 50,
            },
            {
                name: 'Portable External SSD 1TB',
                description: 'Ultra-fast read/write speeds up to 1050MB/s in a rugged casing.',
                price: 139.99,
                image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b',
                stock: 27,
            },
            {
                name: 'Mechanical Pencil Set',
                description: 'Premium drafting pencils with refill leads and eraser caps.',
                price: 15.99,
                image: 'https://images.unsplash.com/photo-1585336261026-875a60a1c92f',
                stock: 90,
            },
            {
                name: 'Hardcover Grid Journal',
                description: 'Fountain pen friendly 120gsm paper notebook for bullet journaling.',
                price: 18.50,
                image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
                stock: 65,
            },
            {
                name: 'Aroma Oil Diffuser',
                description: 'Ultrasonic cool mist humidifier with 7 color ambient LED lights.',
                price: 32.99,
                image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
                stock: 38,
            },
            {
                name: 'Multi-Port USB-C Hub',
                description: '7-in-1 adapter with 4K HDMI, Ethernet, SD card reader, and PD charging.',
                price: 44.99,
                image: 'https://images.unsplash.com/photo-1616440343338-77b5871b65e9',
                stock: 42,
            },
            {
                name: 'Noise-Canceling Desk Divider',
                description: 'Acoustic privacy panel to reduce office distractions.',
                price: 68.00,
                image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
                stock: 10,
            },
            {
                name: 'Compact Espresso Machine',
                description: '15-bar pump espresso maker with built-in milk frother wand.',
                price: 169.50,
                image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
                stock: 16,
            },
            {
                name: 'Cable Management Tray Box',
                description: 'Sleek power strip organizer box to hide messy desk wires.',
                price: 21.99,
                image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07',
                stock: 70,
            },
            {
                name: 'Smart Key Finder Tracker',
                description: 'Bluetooth item locator compatible with iOS and Android devices.',
                price: 25.00,
                image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa',
                stock: 55,
            },
        ];

        await prisma.product.createMany({
            data: dummyProducts,
        });

        console.log(`✅ Created ${dummyProducts.length} products successfully.`);
    } else {
        console.log(`ℹ️ Products table already has ${existingProductsCount} records. Skipping...`);
    }

    // 3. Seed Posts (Check first)
    const existingPostsCount = await prisma.post.count();

    if (existingPostsCount === 0) {
        console.log('📝 Seeding Posts...');

        const dummyPosts = [
            {
                title: 'Getting Started with Next.js & Prisma',
                content: 'Learn how to build a full-stack modern application with Next.js and Prisma ORM in minutes.',
                userId: user.id,
            },
            {
                title: 'Top 5 Productivity Tools in 2026',
                content: 'Boost your workflow with these top-rated developer and designer software tools.',
                userId: user.id,
            },
            {
                title: 'Understanding Database Indexing',
                content: 'An in-depth guide on how indexes work in PostgreSQL and why they matter for performance.',
                userId: user.id,
            },
        ];

        await prisma.post.createMany({
            data: dummyPosts,
        });

        console.log(`✅ Created ${dummyPosts.length} posts successfully.`);
    } else {
        console.log(`ℹ️ Post table already has ${existingPostsCount} records. Skipping...`);
    }

    console.log('🎉 Seeding completed perfectly!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed with error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });