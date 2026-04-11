import requests
import sys
import json
from datetime import datetime

class GauriCandlesAPITester:
    def __init__(self, base_url="https://candle-craft-preview.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.admin_token = None
        self.user_token = None
        self.test_product_id = None
        self.test_order_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_result(self, test_name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name} - PASSED")
        else:
            self.failed_tests.append(f"{test_name}: {details}")
            print(f"❌ {test_name} - FAILED: {details}")

    def make_request(self, method, endpoint, data=None, token=None, expected_status=200):
        """Make HTTP request with proper headers"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if token:
            headers['Authorization'] = f'Bearer {token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text}

            return success, response.status_code, response_data

        except Exception as e:
            return False, 0, {"error": str(e)}

    def test_admin_login(self):
        """Test admin login"""
        success, status, data = self.make_request(
            'POST', 'auth/login',
            {"email": "admin@gauricandles.com", "password": "admin123"}
        )
        
        if success and 'token' in data:
            self.admin_token = data['token']
            self.log_result("Admin Login", True)
            return True
        else:
            self.log_result("Admin Login", False, f"Status: {status}, Data: {data}")
            return False

    def test_user_registration(self):
        """Test user registration"""
        timestamp = datetime.now().strftime("%H%M%S")
        success, status, data = self.make_request(
            'POST', 'auth/register',
            {
                "name": f"Test User {timestamp}",
                "email": f"testuser{timestamp}@example.com",
                "password": "test123"
            }
        )
        
        if success and 'token' in data:
            self.user_token = data['token']
            self.log_result("User Registration", True)
            return True
        else:
            self.log_result("User Registration", False, f"Status: {status}, Data: {data}")
            return False

    def test_user_login(self):
        """Test user login with test credentials"""
        success, status, data = self.make_request(
            'POST', 'auth/login',
            {"email": "testuser@example.com", "password": "test123"}
        )
        
        if success and 'token' in data:
            if not self.user_token:  # Only set if we don't have one from registration
                self.user_token = data['token']
            self.log_result("User Login", True)
            return True
        else:
            self.log_result("User Login", False, f"Status: {status}, Data: {data}")
            return False

    def test_get_products(self):
        """Test getting all products"""
        success, status, data = self.make_request('GET', 'products')
        
        if success and isinstance(data, list):
            self.log_result("Get Products", True)
            if len(data) > 0:
                self.test_product_id = data[0].get('id')
                print(f"   Found {len(data)} products, using product ID: {self.test_product_id}")
            return True
        else:
            self.log_result("Get Products", False, f"Status: {status}, Data: {data}")
            return False

    def test_get_product_detail(self):
        """Test getting product details"""
        if not self.test_product_id:
            self.log_result("Get Product Detail", False, "No product ID available")
            return False
            
        success, status, data = self.make_request('GET', f'products/{self.test_product_id}')
        
        if success and 'id' in data:
            self.log_result("Get Product Detail", True)
            return True
        else:
            self.log_result("Get Product Detail", False, f"Status: {status}, Data: {data}")
            return False

    def test_create_product_admin(self):
        """Test creating product as admin"""
        if not self.admin_token:
            self.log_result("Create Product (Admin)", False, "No admin token")
            return False
            
        product_data = {
            "name": "Test Lavender Candle",
            "description": "A beautiful test lavender scented candle",
            "price": 25.99,
            "image_url": "https://example.com/test-candle.jpg",
            "category": "Floral",
            "product_type": "Jar Candles",
            "scent_notes": {
                "top": "Fresh Lavender",
                "heart": "French Lavender",
                "base": "Vanilla"
            },
            "burn_time": "40-45 hours",
            "wax_type": "100% Natural Soy Wax",
            "stock": 10,
            "is_featured": False
        }
        
        success, status, data = self.make_request(
            'POST', 'products', product_data, self.admin_token, 200
        )
        
        if success and 'id' in data:
            self.test_product_id = data['id']
            self.log_result("Create Product (Admin)", True)
            return True
        else:
            self.log_result("Create Product (Admin)", False, f"Status: {status}, Data: {data}")
            return False

    def test_cart_operations(self):
        """Test cart operations"""
        if not self.user_token or not self.test_product_id:
            self.log_result("Cart Operations", False, "Missing user token or product ID")
            return False

        # Add to cart
        success, status, data = self.make_request(
            'POST', 'cart',
            {"product_id": self.test_product_id, "quantity": 2},
            self.user_token
        )
        
        if not success:
            self.log_result("Add to Cart", False, f"Status: {status}, Data: {data}")
            return False
        
        self.log_result("Add to Cart", True)

        # Get cart
        success, status, data = self.make_request('GET', 'cart', token=self.user_token)
        
        if success and isinstance(data, list) and len(data) > 0:
            self.log_result("Get Cart", True)
        else:
            self.log_result("Get Cart", False, f"Status: {status}, Data: {data}")
            return False

        # Remove from cart
        success, status, data = self.make_request(
            'DELETE', f'cart/{self.test_product_id}', token=self.user_token
        )
        
        if success:
            self.log_result("Remove from Cart", True)
            return True
        else:
            self.log_result("Remove from Cart", False, f"Status: {status}, Data: {data}")
            return False

    def test_wishlist_operations(self):
        """Test wishlist operations"""
        if not self.user_token or not self.test_product_id:
            self.log_result("Wishlist Operations", False, "Missing user token or product ID")
            return False

        # Add to wishlist
        success, status, data = self.make_request(
            'POST', f'wishlist/{self.test_product_id}', token=self.user_token
        )
        
        if not success:
            self.log_result("Add to Wishlist", False, f"Status: {status}, Data: {data}")
            return False
        
        self.log_result("Add to Wishlist", True)

        # Get wishlist
        success, status, data = self.make_request('GET', 'wishlist', token=self.user_token)
        
        if success and isinstance(data, list):
            self.log_result("Get Wishlist", True)
        else:
            self.log_result("Get Wishlist", False, f"Status: {status}, Data: {data}")
            return False

        # Remove from wishlist
        success, status, data = self.make_request(
            'DELETE', f'wishlist/{self.test_product_id}', token=self.user_token
        )
        
        if success:
            self.log_result("Remove from Wishlist", True)
            return True
        else:
            self.log_result("Remove from Wishlist", False, f"Status: {status}, Data: {data}")
            return False

    def test_review_operations(self):
        """Test review operations"""
        if not self.user_token or not self.test_product_id:
            self.log_result("Review Operations", False, "Missing user token or product ID")
            return False

        # Create review
        success, status, data = self.make_request(
            'POST', 'reviews',
            {
                "product_id": self.test_product_id,
                "rating": 5,
                "comment": "Great test candle! Love the scent."
            },
            self.user_token
        )
        
        if not success:
            self.log_result("Create Review", False, f"Status: {status}, Data: {data}")
            return False
        
        self.log_result("Create Review", True)

        # Get reviews for product
        success, status, data = self.make_request('GET', f'reviews/{self.test_product_id}')
        
        if success and isinstance(data, list):
            self.log_result("Get Reviews", True)
            return True
        else:
            self.log_result("Get Reviews", False, f"Status: {status}, Data: {data}")
            return False

    def test_order_creation(self):
        """Test order creation"""
        if not self.user_token or not self.test_product_id:
            self.log_result("Order Creation", False, "Missing user token or product ID")
            return False

        order_data = {
            "items": [{
                "product_id": self.test_product_id,
                "product_name": "Test Lavender Candle",
                "quantity": 1,
                "price": 25.99
            }],
            "total_amount": 25.99,
            "shipping_address": {
                "name": "Test User",
                "address": "123 Test Street",
                "city": "Test City",
                "state": "Test State",
                "pincode": "123456",
                "phone": "9876543210"
            },
            "razorpay_order_id": "test_order_123"
        }
        
        success, status, data = self.make_request(
            'POST', 'orders', order_data, self.user_token
        )
        
        if success and 'id' in data:
            self.test_order_id = data['id']
            self.log_result("Create Order", True)
            return True
        else:
            self.log_result("Create Order", False, f"Status: {status}, Data: {data}")
            return False

    def test_get_orders(self):
        """Test getting user orders"""
        if not self.user_token:
            self.log_result("Get Orders", False, "No user token")
            return False
            
        success, status, data = self.make_request('GET', 'orders', token=self.user_token)
        
        if success and isinstance(data, list):
            self.log_result("Get Orders", True)
            return True
        else:
            self.log_result("Get Orders", False, f"Status: {status}, Data: {data}")
            return False

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        timestamp = datetime.now().strftime("%H%M%S")
        success, status, data = self.make_request(
            'POST', 'newsletter',
            {"email": f"newsletter{timestamp}@example.com"}
        )
        
        if success:
            self.log_result("Newsletter Subscription", True)
            return True
        else:
            self.log_result("Newsletter Subscription", False, f"Status: {status}, Data: {data}")
            return False

    def test_admin_stats(self):
        """Test admin stats endpoint"""
        if not self.admin_token:
            self.log_result("Admin Stats", False, "No admin token")
            return False
            
        success, status, data = self.make_request('GET', 'admin/stats', token=self.admin_token)
        
        if success and 'total_products' in data:
            self.log_result("Admin Stats", True)
            print(f"   Stats: {data.get('total_products')} products, {data.get('total_orders')} orders, {data.get('total_users')} users")
            return True
        else:
            self.log_result("Admin Stats", False, f"Status: {status}, Data: {data}")
            return False

    def test_protected_routes_without_auth(self):
        """Test that protected routes require authentication"""
        protected_endpoints = [
            ('GET', 'cart'),
            ('GET', 'orders'),
            ('GET', 'wishlist'),
            ('GET', 'admin/stats')
        ]
        
        all_protected = True
        for method, endpoint in protected_endpoints:
            success, status, data = self.make_request(method, endpoint, expected_status=401)
            if status != 401:
                self.log_result(f"Protected Route {endpoint}", False, f"Expected 401, got {status}")
                all_protected = False
            else:
                print(f"✅ {endpoint} properly protected (401)")
        
        if all_protected:
            self.log_result("Protected Routes Authentication", True)
        
        return all_protected

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Gauri Candles API Tests")
        print("=" * 50)
        
        # Test authentication
        print("\n📝 Testing Authentication...")
        self.test_admin_login()
        self.test_user_registration()
        self.test_user_login()
        
        # Test protected routes without auth
        print("\n🔒 Testing Protected Routes...")
        self.test_protected_routes_without_auth()
        
        # Test products
        print("\n🕯️ Testing Products...")
        self.test_get_products()
        self.test_get_product_detail()
        if self.admin_token:
            self.test_create_product_admin()
        
        # Test cart operations
        print("\n🛒 Testing Cart Operations...")
        self.test_cart_operations()
        
        # Test wishlist operations
        print("\n❤️ Testing Wishlist Operations...")
        self.test_wishlist_operations()
        
        # Test reviews
        print("\n⭐ Testing Reviews...")
        self.test_review_operations()
        
        # Test orders
        print("\n📦 Testing Orders...")
        self.test_order_creation()
        self.test_get_orders()
        
        # Test newsletter
        print("\n📧 Testing Newsletter...")
        self.test_newsletter_subscription()
        
        # Test admin features
        print("\n👑 Testing Admin Features...")
        self.test_admin_stats()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 TEST SUMMARY")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {len(self.failed_tests)}")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for failure in self.failed_tests:
                print(f"  - {failure}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"\n✨ Success Rate: {success_rate:.1f}%")
        
        return len(self.failed_tests) == 0

def main():
    tester = GauriCandlesAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())