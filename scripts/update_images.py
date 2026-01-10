import sys
sys.path.insert(0, '/app/backend')

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv(Path('/app/backend/.env'))

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# High-quality candle images
candle_images = [
    "https://images.unsplash.com/photo-1603839375735-41bab63f1deb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDQzNDd8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1688031135733-02dec76738e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDQzNDd8MA&ixlib=rb-4.1.0&q=85",
    "https://images.pexels.com/photos/6801172/pexels-photo-6801172.jpeg",
    "https://images.unsplash.com/photo-1607713109008-d00372938c2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxoYW5kbWFkZSUyMGFydGlzYW4lMjBjYW5kbGUlMjBuYXR1cmFsJTIwd2F4JTIwZWxlZ2FudHxlbnwwfHx8fDE3NjgwNDQzNTR8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1674812709785-9497062872d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxoYW5kbWFkZSUyMGFydGlzYW4lMjBjYW5kbGUlMjBuYXR1cmFsJTIwd2F4JTIwZWxlZ2FudHxlbnwwfHx8fDE3NjgwNDQzNTR8MA&ixlib=rb-4.1.0&q=85",
    "https://images.pexels.com/photos/6755755/pexels-photo-6755755.jpeg",
    "https://images.unsplash.com/photo-1757688525739-8d1e13daf44f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2FuZGxlJTIwd2hpdGUlMjBiYWNrZ3JvdW5kJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTc2ODA0NDM2MXww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1604478498491-d63d698dfe0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwY2FuZGxlJTIwd2hpdGUlMjBiYWNrZ3JvdW5kJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTc2ODA0NDM2MXww&ixlib=rb-4.1.0&q=85",
]

async def update_product_images():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("Updating product images...")
    
    # Get all products
    products = await db.products.find({}, {'_id': 0}).to_list(100)
    
    # Update each product with a new image
    for i, product in enumerate(products):
        image_url = candle_images[i % len(candle_images)]
        
        await db.products.update_one(
            {'id': product['id']},
            {'$set': {'image_url': image_url}}
        )
        
        print(f"✓ Updated {product['name']} with new image")
    
    print(f"\n✅ Updated {len(products)} products with high-quality images!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(update_product_images())
