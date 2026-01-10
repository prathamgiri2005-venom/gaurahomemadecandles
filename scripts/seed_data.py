import sys
sys.path.insert(0, '/app/backend')

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt
import uuid
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv(Path('/app/backend/.env'))

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("Seeding database...")
    
    # Create admin user
    admin_email = "admin@gauricandles.com"
    existing_admin = await db.users.find_one({'email': admin_email}, {'_id': 0})
    
    if not existing_admin:
        admin_password = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        admin_user = {
            'id': str(uuid.uuid4()),
            'name': 'Admin User',
            'email': admin_email,
            'password': admin_password,
            'role': 'admin',
            'created_at': datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_user)
        print(f"✓ Created admin user: {admin_email} / admin123")
    else:
        print(f"✓ Admin user already exists")
    
    # Sample products
    products = [
        {
            'id': str(uuid.uuid4()),
            'name': 'Lavender Dreams',
            'description': 'Immerse yourself in fields of purple lavender under a Provençal sun. This calming blend combines fresh lavender buds with a hint of chamomile and vanilla, creating a serene atmosphere perfect for meditation and relaxation.',
            'price': 899,
            'image_url': 'https://images.unsplash.com/photo-1760602180499-382146d5eb02?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': 'Floral',
            'product_type': 'Jar Candles',
            'scent_notes': {
                'top': 'Fresh Lavender, Bergamot',
                'heart': 'Chamomile, Rose Petals',
                'base': 'Vanilla, Musk'
            },
            'burn_time': '40+ hours',
            'wax_type': '100% Natural Soy Wax',
            'stock': 25,
            'is_featured': True,
            'rating': 4.8,
            'review_count': 32,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Serenity',
            'description': 'Experience the warm embrace of ancient sandalwood forests. Rich, creamy sandalwood mingles with notes of cedar and patchouli, creating a grounding scent that brings peace and mindfulness to any space.',
            'price': 999,
            'image_url': 'https://images.unsplash.com/photo-1646640983779-43cf0889c7c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': 'Woody',
            'product_type': 'Jar Candles',
            'scent_notes': {
                'top': 'Cardamom, Citrus Zest',
                'heart': 'Sandalwood, Cedar',
                'base': 'Patchouli, Amber'
            },
            'burn_time': '45+ hours',
            'wax_type': '100% Natural Soy Wax',
            'stock': 20,
            'is_featured': True,
            'rating': 4.9,
            'review_count': 28,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Cinnamon Spice',
            'description': 'Warm up your home with the comforting aroma of freshly ground cinnamon and cloves. A perfect blend of holiday spices that evokes memories of home-baked treats and cozy autumn evenings.',
            'price': 849,
            'image_url': 'https://images.unsplash.com/photo-1760602180499-382146d5eb02?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': 'Spicy',
            'product_type': 'Jar Candles',
            'scent_notes': {
                'top': 'Cinnamon Bark, Orange Peel',
                'heart': 'Clove, Nutmeg',
                'base': 'Vanilla, Tonka Bean'
            },
            'burn_time': '40+ hours',
            'wax_type': '100% Natural Soy Wax',
            'stock': 30,
            'is_featured': True,
            'rating': 4.7,
            'review_count': 45,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Ocean Breeze',
            'description': 'Transport yourself to a windswept coastline with this refreshing marine scent. Clean, crisp notes of sea salt and ozone blend with subtle hints of jasmine and driftwood for an invigorating experience.',
            'price': 879,
            'image_url': 'https://images.unsplash.com/photo-1646640983779-43cf0889c7c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': 'Fresh',
            'product_type': 'Jar Candles',
            'scent_notes': {
                'top': 'Sea Salt, Ozone',
                'heart': 'Jasmine, Lily',
                'base': 'Driftwood, Amber'
            },
            'burn_time': '42+ hours',
            'wax_type': '100% Natural Soy Wax',
            'stock': 22,
            'is_featured': False,
            'rating': 4.6,
            'review_count': 18,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose Garden',
            'description': 'Step into a blooming English rose garden with this luxurious floral blend. Delicate rose petals are enhanced with geranium and a touch of green stems, creating an elegant and romantic ambiance.',
            'price': 929,
            'image_url': 'https://images.unsplash.com/photo-1760602180499-382146d5eb02?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': 'Floral',
            'product_type': 'Jar Candles',
            'scent_notes': {
                'top': 'Rose Petals, Bergamot',
                'heart': 'Geranium, Peony',
                'base': 'Cedarwood, Musk'
            },
            'burn_time': '40+ hours',
            'wax_type': '100% Natural Soy Wax',
            'stock': 18,
            'is_featured': False,
            'rating': 4.8,
            'review_count': 25,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Eucalyptus Mint',
            'description': 'Breathe deeply and refresh your senses with this spa-like blend. Cool eucalyptus leaves meet crisp peppermint and spearmint, creating a revitalizing atmosphere that clears the mind and energizes the soul.',
            'price': 859,
            'image_url': 'https://images.unsplash.com/photo-1646640983779-43cf0889c7c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': 'Fresh',
            'product_type': 'Jar Candles',
            'scent_notes': {
                'top': 'Eucalyptus, Peppermint',
                'heart': 'Spearmint, Green Tea',
                'base': 'Pine, Moss'
            },
            'burn_time': '38+ hours',
            'wax_type': '100% Natural Soy Wax',
            'stock': 28,
            'is_featured': False,
            'rating': 4.5,
            'review_count': 22,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Tea Light Set (12 Pack)',
            'description': 'Perfect for creating ambiance anywhere. This set of 12 unscented tea lights in natural soy wax provides up to 4 hours of burn time each. Ideal for special occasions, dinner parties, or everyday moments.',
            'price': 499,
            'image_url': 'https://images.unsplash.com/photo-1760602180499-382146d5eb02?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': None,
            'product_type': 'Tea Lights',
            'scent_notes': None,
            'burn_time': '4 hours each',
            'wax_type': '100% Natural Soy Wax',
            'stock': 50,
            'is_featured': False,
            'rating': 4.7,
            'review_count': 38,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Pillar Candle - Ivory',
            'description': 'A classic ivory pillar candle that complements any décor. Hand-poured with care, this unscented pillar burns beautifully for hours, creating warm ambient lighting perfect for gatherings or quiet evenings.',
            'price': 699,
            'image_url': 'https://images.unsplash.com/photo-1646640983779-43cf0889c7c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzb3klMjBjYW5kbGUlMjBqYXIlMjBjcmVhbSUyMHNhZ2UlMjBncmVlbiUyMGFlc3RoZXRpY3xlbnwwfHx8fDE3NjgwNDI4NDh8MA&ixlib=rb-4.1.0&q=85',
            'category': None,
            'product_type': 'Pillars',
            'scent_notes': None,
            'burn_time': '50+ hours',
            'wax_type': '100% Natural Soy Wax',
            'stock': 15,
            'is_featured': False,
            'rating': 4.6,
            'review_count': 12,
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Check if products already exist
    existing_count = await db.products.count_documents({})
    if existing_count == 0:
        await db.products.insert_many(products)
        print(f"✓ Created {len(products)} sample products")
    else:
        print(f"✓ Products already exist ({existing_count} products)")
    
    print("\n✅ Database seeded successfully!")
    print(f"\nAdmin Login:")
    print(f"Email: admin@gauricandles.com")
    print(f"Password: admin123")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
