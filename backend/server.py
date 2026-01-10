from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import razorpay
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24 * 30  # 30 days

# Razorpay Client
razorpay_key_id = os.environ.get('RAZORPAY_KEY_ID', '')
razorpay_key_secret = os.environ.get('RAZORPAY_KEY_SECRET', '')
razorpay_client = razorpay.Client(auth=(razorpay_key_id, razorpay_key_secret)) if razorpay_key_id else None

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# Enums
class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"

class ScentCategory(str, Enum):
    FLORAL = "Floral"
    WOODY = "Woody"
    SPICY = "Spicy"
    FRESH = "Fresh"

class ProductType(str, Enum):
    JAR_CANDLE = "Jar Candles"
    PILLAR = "Pillars"
    TEA_LIGHT = "Tea Lights"
    ACCESSORY = "Accessories"

class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

# Models
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    role: UserRole = UserRole.USER
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ScentNotes(BaseModel):
    top: str
    heart: str
    base: str

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    image_url: str
    category: Optional[ScentCategory] = None
    product_type: ProductType
    scent_notes: Optional[ScentNotes] = None
    burn_time: Optional[str] = None
    wax_type: str = "100% Natural Soy Wax"
    stock: int = 10
    is_featured: bool = False

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    image_url: str
    category: Optional[ScentCategory] = None
    product_type: ProductType
    scent_notes: Optional[ScentNotes] = None
    burn_time: Optional[str] = None
    wax_type: str
    stock: int
    is_featured: bool
    rating: float = 0.0
    review_count: int = 0
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class CartItem(BaseModel):
    product_id: str
    quantity: int

class CartItemResponse(BaseModel):
    product: Product
    quantity: int

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    price: float

class OrderCreate(BaseModel):
    items: List[OrderItem]
    total_amount: float
    shipping_address: dict
    razorpay_order_id: str
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[OrderItem]
    total_amount: float
    shipping_address: dict
    status: OrderStatus = OrderStatus.PENDING
    razorpay_order_id: str
    razorpay_payment_id: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ReviewCreate(BaseModel):
    product_id: str
    rating: int = Field(ge=1, le=5)
    comment: str

class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_id: str
    user_id: str
    user_name: str
    rating: int
    comment: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class NewsletterSubscribe(BaseModel):
    email: EmailStr

class RazorpayOrderCreate(BaseModel):
    amount: float

# Helper Functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str, role: str) -> str:
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({'id': payload['user_id']}, {'_id': 0, 'password': 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_admin_user(user: dict = Depends(get_current_user)) -> dict:
    if user.get('role') != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# Auth Routes
@api_router.post("/auth/register")
async def register(user_data: UserRegister):
    existing = await db.users.find_one({'email': user_data.email}, {'_id': 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(
        name=user_data.name,
        email=user_data.email,
        role=UserRole.USER
    )
    user_dict = user.model_dump()
    user_dict['password'] = hash_password(user_data.password)
    
    await db.users.insert_one(user_dict)
    
    token = create_token(user.id, user.role)
    return {'token': token, 'user': user}

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({'email': credentials.email}, {'_id': 0})
    if not user or not verify_password(credentials.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user['id'], user['role'])
    user.pop('password')
    return {'token': token, 'user': user}

@api_router.get("/auth/me", response_model=User)
async def get_me(user: dict = Depends(get_current_user)):
    return user

# Product Routes
@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    product_type: Optional[str] = None,
    featured: Optional[bool] = None
):
    query = {}
    if category:
        query['category'] = category
    if product_type:
        query['product_type'] = product_type
    if featured is not None:
        query['is_featured'] = featured
    
    products = await db.products.find(query, {'_id': 0}).to_list(1000)
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({'id': product_id}, {'_id': 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate, admin: dict = Depends(get_admin_user)):
    product = Product(**product_data.model_dump())
    await db.products.insert_one(product.model_dump())
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductCreate, admin: dict = Depends(get_admin_user)):
    result = await db.products.update_one(
        {'id': product_id},
        {'$set': product_data.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product = await db.products.find_one({'id': product_id}, {'_id': 0})
    return product

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin: dict = Depends(get_admin_user)):
    result = await db.products.delete_one({'id': product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {'message': 'Product deleted'}

# Cart Routes
@api_router.get("/cart", response_model=List[CartItemResponse])
async def get_cart(user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({'user_id': user['id']}, {'_id': 0})
    if not cart or not cart.get('items'):
        return []
    
    result = []
    for item in cart['items']:
        product = await db.products.find_one({'id': item['product_id']}, {'_id': 0})
        if product:
            result.append({
                'product': product,
                'quantity': item['quantity']
            })
    return result

@api_router.post("/cart")
async def add_to_cart(item: CartItem, user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({'user_id': user['id']}, {'_id': 0})
    
    if not cart:
        cart = {
            'id': str(uuid.uuid4()),
            'user_id': user['id'],
            'items': []
        }
    
    # Check if product exists
    product = await db.products.find_one({'id': item.product_id}, {'_id': 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update or add item
    items = cart.get('items', [])
    found = False
    for cart_item in items:
        if cart_item['product_id'] == item.product_id:
            cart_item['quantity'] = item.quantity
            found = True
            break
    
    if not found:
        items.append({'product_id': item.product_id, 'quantity': item.quantity})
    
    cart['items'] = items
    await db.carts.update_one(
        {'user_id': user['id']},
        {'$set': cart},
        upsert=True
    )
    
    return {'message': 'Cart updated'}

@api_router.delete("/cart/{product_id}")
async def remove_from_cart(product_id: str, user: dict = Depends(get_current_user)):
    await db.carts.update_one(
        {'user_id': user['id']},
        {'$pull': {'items': {'product_id': product_id}}}
    )
    return {'message': 'Item removed'}

@api_router.delete("/cart")
async def clear_cart(user: dict = Depends(get_current_user)):
    await db.carts.update_one(
        {'user_id': user['id']},
        {'$set': {'items': []}}
    )
    return {'message': 'Cart cleared'}

# Razorpay Routes
@api_router.post("/razorpay/create-order")
async def create_razorpay_order(order_data: RazorpayOrderCreate, user: dict = Depends(get_current_user)):
    if not razorpay_client:
        raise HTTPException(status_code=500, detail="Razorpay not configured")
    
    try:
        amount_in_paise = int(order_data.amount * 100)
        razorpay_order = razorpay_client.order.create({
            'amount': amount_in_paise,
            'currency': 'INR',
            'payment_capture': 1
        })
        return {
            'order_id': razorpay_order['id'],
            'amount': razorpay_order['amount'],
            'currency': razorpay_order['currency'],
            'key': razorpay_key_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Order Routes
@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate, user: dict = Depends(get_current_user)):
    order = Order(
        user_id=user['id'],
        **order_data.model_dump()
    )
    await db.orders.insert_one(order.model_dump())
    
    # Clear cart
    await db.carts.update_one(
        {'user_id': user['id']},
        {'$set': {'items': []}}
    )
    
    return order

@api_router.get("/orders", response_model=List[Order])
async def get_orders(user: dict = Depends(get_current_user)):
    orders = await db.orders.find({'user_id': user['id']}, {'_id': 0}).sort('created_at', -1).to_list(1000)
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, user: dict = Depends(get_current_user)):
    order = await db.orders.find_one({'id': order_id, 'user_id': user['id']}, {'_id': 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# Admin Order Routes
@api_router.get("/admin/orders", response_model=List[Order])
async def get_all_orders(admin: dict = Depends(get_admin_user)):
    orders = await db.orders.find({}, {'_id': 0}).sort('created_at', -1).to_list(1000)
    return orders

@api_router.patch("/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, status: OrderStatus, admin: dict = Depends(get_admin_user)):
    result = await db.orders.update_one(
        {'id': order_id},
        {'$set': {'status': status, 'updated_at': datetime.now(timezone.utc).isoformat()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {'message': 'Order status updated'}

# Review Routes
@api_router.post("/reviews", response_model=Review)
async def create_review(review_data: ReviewCreate, user: dict = Depends(get_current_user)):
    # Check if product exists
    product = await db.products.find_one({'id': review_data.product_id}, {'_id': 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if user already reviewed
    existing = await db.reviews.find_one({
        'product_id': review_data.product_id,
        'user_id': user['id']
    }, {'_id': 0})
    
    if existing:
        raise HTTPException(status_code=400, detail="You have already reviewed this product")
    
    review = Review(
        **review_data.model_dump(),
        user_id=user['id'],
        user_name=user['name']
    )
    await db.reviews.insert_one(review.model_dump())
    
    # Update product rating
    reviews = await db.reviews.find({'product_id': review_data.product_id}, {'_id': 0}).to_list(1000)
    avg_rating = sum(r['rating'] for r in reviews) / len(reviews)
    await db.products.update_one(
        {'id': review_data.product_id},
        {'$set': {'rating': round(avg_rating, 1), 'review_count': len(reviews)}}
    )
    
    return review

@api_router.get("/reviews/{product_id}", response_model=List[Review])
async def get_reviews(product_id: str):
    reviews = await db.reviews.find({'product_id': product_id}, {'_id': 0}).sort('created_at', -1).to_list(1000)
    return reviews

# Wishlist Routes
@api_router.get("/wishlist")
async def get_wishlist(user: dict = Depends(get_current_user)):
    wishlist = await db.wishlists.find_one({'user_id': user['id']}, {'_id': 0})
    if not wishlist or not wishlist.get('product_ids'):
        return []
    
    products = await db.products.find(
        {'id': {'$in': wishlist['product_ids']}},
        {'_id': 0}
    ).to_list(1000)
    return products

@api_router.post("/wishlist/{product_id}")
async def add_to_wishlist(product_id: str, user: dict = Depends(get_current_user)):
    product = await db.products.find_one({'id': product_id}, {'_id': 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    await db.wishlists.update_one(
        {'user_id': user['id']},
        {'$addToSet': {'product_ids': product_id}},
        upsert=True
    )
    return {'message': 'Added to wishlist'}

@api_router.delete("/wishlist/{product_id}")
async def remove_from_wishlist(product_id: str, user: dict = Depends(get_current_user)):
    await db.wishlists.update_one(
        {'user_id': user['id']},
        {'$pull': {'product_ids': product_id}}
    )
    return {'message': 'Removed from wishlist'}

# Newsletter Route
@api_router.post("/newsletter")
async def subscribe_newsletter(data: NewsletterSubscribe):
    existing = await db.newsletters.find_one({'email': data.email}, {'_id': 0})
    if existing:
        return {'message': 'Already subscribed'}
    
    await db.newsletters.insert_one({
        'id': str(uuid.uuid4()),
        'email': data.email,
        'subscribed_at': datetime.now(timezone.utc).isoformat()
    })
    return {'message': 'Successfully subscribed'}

# Admin Stats
@api_router.get("/admin/stats")
async def get_admin_stats(admin: dict = Depends(get_admin_user)):
    total_products = await db.products.count_documents({})
    total_orders = await db.orders.count_documents({})
    total_users = await db.users.count_documents({})
    
    # Calculate total revenue
    orders = await db.orders.find({'status': {'$ne': OrderStatus.CANCELLED}}, {'_id': 0}).to_list(10000)
    total_revenue = sum(order['total_amount'] for order in orders)
    
    # Recent orders
    recent_orders = await db.orders.find({}, {'_id': 0}).sort('created_at', -1).limit(5).to_list(5)
    
    return {
        'total_products': total_products,
        'total_orders': total_orders,
        'total_users': total_users,
        'total_revenue': total_revenue,
        'recent_orders': recent_orders
    }

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()