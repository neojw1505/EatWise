from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from datetime import datetime
import shutil

import time

chromedriver_path = shutil.which('chromedriver')
# Create a ChromeDriver service with the specified executable path
service = Service(chromedriver_path)
driver = webdriver.Chrome(service=service)

FairPrice_categories = ['dairy-chilled-eggs', 'fruits-vegetables', 'meat-seafood', 'rice-noodles-cooking-ingredients', 'frozen', 'food-cupboard-6', 'drinks']
# FairPrice_categories = ['dairy-chilled-eggs']

def getFairPriceGroceriesData():
    unique_product_identifiers = set() # for storing unique products
    supermarket_name = "FairPrice"
    FairPrice_data = []  # List to store scraped data

    for category in FairPrice_categories:
        url = f"https://www.fairprice.com.sg/category/{category}"
        driver.get(url)

        for _ in range(10):  # Scroll 5 times, you can adjust this number
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
            time.sleep(5)

        content = driver.page_source
        soup = BeautifulSoup(content, 'html.parser')
        products = soup.find_all('div', class_='product-container')

        for product in products:
            # Extract product img src
            product_img = product.find('div', {'data-testid': 'recommended-product-image'}).find('img')['src']
            # Extract product title
            product_title = product.find('div', {'data-testid': 'recommended-product-image'}).find('img')['alt']
            # Extract product links
            base_url = 'https://www.fairprice.com.sg/'
            product_link = base_url + product.a.get('href')
            # Extract product price
            product_price = product.find('span', {'weight': 'black'}).span.text
            # Extract promotion
            promo_span = product.find('span', {'data-testid': 'promo-label'})
            if promo_span:
                strong_element = promo_span.find('strong')
                strong_text = strong_element.text.strip() if strong_element else ""
                # Check if there are nested spans
                nested_spans = promo_span.find_all('span')
                if nested_spans:
                    promo_text = "".join(span.text.strip() for span in nested_spans)
                else:
                    # Extract the promotion text, assuming it's within a div element
                    promo_text_div = promo_span.find('div')
                    promo_text = promo_text_div.text.strip() if promo_text_div else ""

                product_promo = f"{strong_text} {promo_text}" if strong_text else promo_text
            else:
                product_promo = "No promotion available"

            # Extract stock avail
            out_of_stock = False if product.find('button', {'data-testid': 'SvgAddToCart'}) else True
            # Include last scraped time
            last_updated = datetime.now().strftime('%d %B %Y %I:%M %p')

            # check for duplicates
            product_identifier = product_link
            if product_identifier not in unique_product_identifiers:
                unique_product_identifiers.add(product_identifier)

                if product_img and not product_img.startswith('data:image/gif;base64'):
                    product_data = {
                        "supermarket_name": supermarket_name,
                        "product_title": product_title,
                        "product_img": product_img,
                        "product_link": product_link,
                        "product_price": product_price,
                        "product_promo": product_promo,
                        "out_of_stock": out_of_stock,
                        "last_updated": last_updated
                    }
                    FairPrice_data.append(product_data)

    driver.quit()

    # Number of products 
    print(f"Count: {len(FairPrice_data)}")
    return FairPrice_data

