from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from datetime import datetime
import time

chromedriver_path = 'C:\Windows\System32\chromedriver.exe'
# Create a ChromeDriver service with the specified executable path
service = Service(chromedriver_path)
driver = webdriver.Chrome(service=service)

ColdStorage_categories = ['meat-seafood', 'fruits-vegetables', 'dairy-chilled-frozen', 'bakery-cereal-spreads', 'food-pantry', 'snacks-drinks']
# ColdStorage_categories = ['meat-seafood']

def getColdStorageGroceriesData():
    unique_product_identifiers = set() # for storing unique products
    supermarket_name = "ColdStorage"
    ColdStorage_data = []  # List to store scraped data

    for category in ColdStorage_categories:
        url = f"https://coldstorage.com.sg/{category}"
        driver.get(url)
        for _ in range(10):  # Scroll 15 times, you can adjust this number
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
            time.sleep(5)

        content = driver.page_source

        soup = BeautifulSoup(content, 'html.parser')

        products = soup.find_all('div', class_='product_box')
        for product in products:
            product_img = product.find('div', class_="product_images").img.get('src')
            product_title = product.find('div', class_="product_name").text.strip()
            # Extract product brand
            product_brand = product.find('div', class_='category-name')
            if product_brand:
                product_brand = product.find('div', class_='category-name').find('b').text 
            else:
                product_brand = ''
            # Extract product size
            product_size = product.find('div', class_='product_desc')
            if product_size:
                product_size = product.find('div', class_='product_desc').span.text
            else:
                product_size = "No Size"
            # Extract product link
            base_url = "https://coldstorage.com.sg/"
            product_link = base_url + product.a.get('href')
            # Extract product price
            product_price = product.find('div', class_="price_now").text
            # Extract promotion
            product_promo = product.find('div',class_='price_promo')
            if product_promo:
                product_promo = product.find('div',class_='price_promo').text
            else:
                product_promo = "No promotion available"
            # Extract stock avail
            out_of_stock = True if product.find('div',class_='btn-out-of-stock') else False
            # Include last scraped time
            last_updated = datetime.now().strftime('%d %B %Y %I:%M %p')

            # check for duplicates
            product_identifier = product_link
            if product_identifier not in unique_product_identifiers:
                unique_product_identifiers.add(product_identifier)
                product_data = {
                    "supermarket_name": supermarket_name,
                    "product_title": product_title,
                    "product_brand": product_brand,
                    "product_size": product_size,
                    "product_img": product_img,
                    "product_link": product_link,
                    "product_price": product_price,
                    "product_promo": product_promo,
                    "out_of_stock": out_of_stock,
                    "last_updated": last_updated
                }
                ColdStorage_data.append(product_data)
    driver.quit()
    
    # Number of products 
    print(f"Count: {len(ColdStorage_data)}")
    return ColdStorage_data

