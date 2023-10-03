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

ShengShiong_categories = ['dairy-chilled-eggs', 'breakfast-spreads', 'meat-poultry-seafood', 'vegetables', 'fruits', 'rice-noodles-pasta', 'beverages']
# ShengShiong_categories = ['dairy-chilled-eggs']

def getShengShiongGroceriesData():
    unique_product_identifiers = set() # for storing unique products
    supermarket_name = "ShengShiong"
    ShengShiong_data = []  # List to store scraped data

    for category in ShengShiong_categories:
        url = f"https://shengsiong.com.sg/{category}"
        driver.get(url)

        for _ in range(10):  # Scroll 5 times, you can adjust this number
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
            time.sleep(5)

        content = driver.page_source
        soup = BeautifulSoup(content, 'html.parser')

        products = soup.find_all('a', class_='product-preview')
        for product in products:
            product_img_element = product.find('img', class_='product-img')
            product_img = product_img_element.get('src') if product_img_element else 'No image available'
            product_title = product.find('div', class_='product-name text-clamp-3').text.strip()
            product_size = product.find('div', class_='product-packSize').text.strip()
            product_price = product.find('div', class_='product-price').text.strip()
            
            # Extract the product link
            product_link = 'https://shengsiong.com.sg' + product['href']
            # Extract the product promo
            if product.find('div',class_="product-tag"):
                product_promo = product.find('div',class_="product-tag").text
            else:
                product_promo = "No promotion available"
            
            # Extract stock avail
            out_of_stock = True if product.find('button',class_='disabled') else False

            # Include last scraped time
            last_updated = datetime.now().strftime('%d %B %Y %I:%M %p')

            # check for duplicates
            product_identifier = product_link
            if product_identifier not in unique_product_identifiers:
                unique_product_identifiers.add(product_identifier)
                product_data = {
                    "supermarket_name": supermarket_name,
                    "product_title": product_title,
                    "product_size": product_size,
                    "product_img": product_img,
                    "product_link": product_link,
                    "product_price": product_price,
                    "product_promo": product_promo,
                    "out_of_stock": out_of_stock,
                    "last_updated": last_updated
                }
                ShengShiong_data.append(product_data)
    
    driver.quit()

    # Number of products 
    print(f"Count: {len(ShengShiong_data)}")
    return ShengShiong_data
