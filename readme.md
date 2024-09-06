## Products API Endpoints

| HTTP Method | Endpoint                              | Description                                                                    |
|-------------|---------------------------------------|--------------------------------------------------------------------------------|
| POST        | `/products/`                          | Create a new product.                                                          |
| GET         | `/products/`                          | Get all products, including manufacturer details.                              |
| GET         | `/products/:id`                       | Get a single product by ID.                                                    |
| PUT         | `/products/:id`                       | Update a product by ID.                                                        |
| DELETE      | `/products/:id`                       | Delete a product by ID.                                                        |
| GET         | `/products/total-value`               | Get total value of all products in stock.                                      |
| GET         | `/products/low-stock`                 | Get all products with less than 10 in stock.                                   |
| GET         | `/products/total-value-by-manufacturer` | Get total value of products in stock by manufacturer.                        |
| GET         | `/products/critical-stock`            | Get products with less than 5 in stock and include manufacturer details.       |

## Manufacturers API Endpoints

| HTTP Method | Endpoint                             | Description                                                   |
|-------------|--------------------------------------|---------------------------------------------------------------|
| POST        | `/manufacturers/`                    | Create a new manufacturer.                                    |
| GET         | `/manufacturers/`                    | Get all manufacturers.                                        |
| GET         | `/manufacturers/:id`                 | Get a single manufacturer by ID.                              |
| PUT         | `/manufacturers/:id`                 | Update a manufacturer by ID.                                  |
| DELETE      | `/manufacturers/:id`                 | Delete a manufacturer by ID.                                  |
