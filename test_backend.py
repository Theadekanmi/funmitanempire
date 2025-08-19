#!/usr/bin/env python3

import requests
import json

# Test backend endpoints
BASE_URL = os.getenv('BACKEND_URL', 'http://127.0.0.1:8000') + '/api/v1'

def test_endpoint(method, endpoint, data=None, headers=None):
    """Test a specific endpoint"""
    url = f"{BASE_URL}{endpoint}"
    print(f"\n🔍 Testing {method} {url}")
    
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            response = requests.post(url, json=data, headers=headers)
        elif method == 'DELETE':
            response = requests.delete(url, json=data, headers=headers)
        
        print(f"Status: {response.status_code}")
        if response.headers.get('content-type', '').startswith('application/json'):
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Response: {response.text[:200]}...")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed - backend server not running!")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🚀 Testing Backend API Endpoints")
    
    # Test basic endpoints
    test_endpoint('GET', '/products/')
    test_endpoint('GET', '/orders/my_orders/')
    test_endpoint('GET', '/cart/my_cart/')
    test_endpoint('GET', '/wishlist/my_wishlist/')
    
    # Test with sample data
    test_endpoint('POST', '/wishlist/add_to_wishlist/', {'product_id': 1})
    test_endpoint('POST', '/cart/add_item/', {'product_id': 1, 'quantity': 1})
