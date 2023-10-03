import asyncio
import aiohttp
import json
import os 

from fairprice_scraper import getFairPriceGroceriesData
from coldstorage_scraper import getColdStorageGroceriesData
from shengshiong_scraper import getShengShiongGroceriesData

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Initialize Firebase Admin SDK with your service account credentials
cred = credentials.Certificate('WAD_Project/my-vue-app/backend/webscraping/wad2-9fe8a-firebase-adminsdk-191yv-f83f483caf.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://wad2-9fe8a-default-rtdb.asia-southeast1.firebasedatabase.app"
})


supermarkets = [
    {"name": "FairPrice", "scraper_function": getFairPriceGroceriesData},
    {"name": "ColdStorage", "scraper_function": getColdStorageGroceriesData},
    {"name": "ShengShiong", "scraper_function": getShengShiongGroceriesData}
]

async def scrape_supermarket(supermarket):
    supermarket_name = supermarket["name"]
    scraper_function = supermarket["scraper_function"]
    data = scraper_function()  # Call the scraper function for this supermarket
    return {supermarket_name: data}

async def main():
    tasks = []

    for supermarket in supermarkets:
        task = asyncio.create_task(scrape_supermarket(supermarket))
        tasks.append(task)
    
    # Concurrently execute all scraper tasks
    results = await asyncio.gather(*tasks)

    # Process and combine the scraped data as needed
    supermarkets_data_dict = {}
    for result in results:
        supermarkets_data_dict.update(result)

     # Save the combined data as a JSON file
    with open('supermarkets_data.json', 'w') as json_file:
        json.dump(supermarkets_data_dict, json_file, indent=4)

    # Read the JSON file
    with open('supermarkets_data.json', 'r') as json_file:
        json_data = json.load(json_file)

    # Upload the JSON data to Firebase Realtime Database
    ref = db.reference("allSuperMarketsGroceries")  # Replace with your specific path
    ref.set(json_data)

# Run every 1 hour
if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    while True:
        loop.run_until_complete(main())  # Run your main function within the event loop
        hours_wait = 1
        print(f"Waiting for {hours_wait} hours...")
        loop.run_until_complete(asyncio.sleep(hours_wait * 3600))  # Sleep for 6 hours within the event loop